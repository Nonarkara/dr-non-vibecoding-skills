#!/usr/bin/env python3
"""Offline boundary tests. Fake deploy commands never contact Cloudflare."""
import copy
from datetime import datetime, timedelta, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest

REPO = Path(__file__).resolve().parent.parent
REV = 'a' * 40


class DeployBoundary(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='deploy-boundary-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for directory in ('scripts', 'docs', 'public/js', 'public/css', 'bin'):
            (self.root / directory).mkdir(parents=True, exist_ok=True)
        shutil.copy(REPO/'templates/deploy-pages.sh', self.root/'scripts/deploy.sh')
        shutil.copy(REPO/'templates/security-release.py.template', self.root/'scripts/security_release.py')
        (self.root/'public/index.html').write_text('<script src="js/main.js?v=1.2.3"></script>')
        (self.root/'public/js/main.js').write_text('/* synthetic */')
        (self.root/'public/css/layout.css').write_text('/* synthetic */')
        receipt = self.root/'docs/receipt.txt'
        receipt.write_text('SYNTHETIC: not a real security assessment.')
        self.record = json.loads((REPO/'templates/security-controls.json.template').read_text())
        self.record.update(target_commit=REV, maturity='Production')
        for control in self.record['controls']:
            control.update(status='passed', owner='fixture', reason='synthetic assertion', evidence=[{
                'path': 'docs/receipt.txt',
                'sha256': hashlib.sha256(receipt.read_bytes()).hexdigest(),
                'checked_at': datetime.now(timezone.utc).isoformat(),
            }])
        self.save()
        for command, body in {
            'git': f'printf "%s\\n" "{REV}"\n',
            'npx': 'printf "npx\\n" >> "$TEST_TRACE"\nexit 73\n',
            'curl': 'printf "curl\\n" >> "$TEST_TRACE"\nexit 74\n',
        }.items():
            file = self.root/'bin'/command
            file.write_text('#!/usr/bin/env bash\n'+body)
            file.chmod(0o755)
        self.env = dict(os.environ, PATH=str(self.root/'bin')+os.pathsep+os.environ['PATH'],
                        PAGES_PROJECT='fixture', PAGES_CANONICAL='https://fixture.pages.dev',
                        PAGES_CUSTOM='https://fixture.example.org', PAGES_ROOT='public',
                        TEST_TRACE=str(self.root/'trace'))

    def save(self, record=None):
        (self.root/'docs/security-controls.json').write_text(json.dumps(record or self.record))

    def run_deploy(self, **changes):
        return subprocess.run(['bash', 'scripts/deploy.sh'], cwd=self.root,
                              env=dict(self.env, **changes), capture_output=True, text=True, timeout=60)

    def assert_blocked(self, **changes):
        result = self.run_deploy(**changes)
        self.assertNotEqual(result.returncode, 0, result.stdout)
        self.assertNotEqual(result.returncode, 73, result.stdout)
        self.assertFalse((self.root/'trace').exists(), result.stdout+result.stderr)

    def test_valid_synthetic_evidence_reaches_fake_upload_not_curl(self):
        result = self.run_deploy()
        self.assertEqual(result.returncode, 73, result.stdout+result.stderr)
        self.assertEqual((self.root/'trace').read_text(), 'npx\n')

    def test_all_eight_failed_and_unverified_boundaries_block_before_upload(self):
        for index in range(8):
            for state in ('failed', 'unverified'):
                with self.subTest(index=index, state=state):
                    record = copy.deepcopy(self.record)
                    record['controls'][index]['status'] = state
                    self.save(record)
                    self.assert_blocked()

    def test_missing_manifest_or_gate_blocks(self):
        for path in ('docs/security-controls.json', 'scripts/security_release.py'):
            with self.subTest(path=path):
                file = self.root/path
                original = file.read_bytes()
                file.unlink()
                self.assert_blocked()
                file.write_bytes(original)

    def test_wrong_revision_stale_and_tampered_receipts_block(self):
        for change in ('revision', 'stale', 'hash'):
            with self.subTest(change=change):
                record = copy.deepcopy(self.record)
                if change == 'revision':
                    record['target_commit'] = 'b'*40
                elif change == 'stale':
                    record['controls'][0]['evidence'][0]['checked_at'] = (
                        datetime.now(timezone.utc)-timedelta(days=31)).isoformat()
                else:
                    record['controls'][0]['evidence'][0]['sha256'] = '0'*64
                self.save(record)
                self.assert_blocked()

    def test_four_explicit_configuration_values_required(self):
        for key in ('PAGES_PROJECT', 'PAGES_CANONICAL', 'PAGES_CUSTOM', 'PAGES_ROOT'):
            with self.subTest(key=key):
                self.assert_blocked(**{key: ''})

    def test_root_traversal_absolute_and_private_components_block(self):
        (self.root/'.git').mkdir()
        for path in ('.', '/', str(self.root/'public'), '../outside', 'public/../public', '.git'):
            with self.subTest(path=path):
                self.assert_blocked(PAGES_ROOT=path)

    def test_private_asset_names_and_directories_block(self):
        for name in ('.env', '.env.local', '.git', '.aws', '.ssh', '.npmrc', '.dev.vars',
                     '.dev.vars.preview', 'server.key', 'private.pem', 'local.db', 'db.sqlite3', 'credentials.json'):
            with self.subTest(name=name):
                file = self.root/'public'/name
                file.write_text('synthetic private canary')
                self.assert_blocked()
                file.unlink()
        (self.root/'public/.git').mkdir()
        (self.root/'public/.git/config').write_text('synthetic')
        self.assert_blocked()

    def test_symlinks_in_root_or_asset_tree_block(self):
        (self.root/'alias').symlink_to(self.root/'public', target_is_directory=True)
        self.assert_blocked(PAGES_ROOT='alias')
        link = self.root/'public/link.js'
        link.symlink_to(self.root/'public/js/main.js')
        self.assert_blocked()
        link.unlink()
        link.symlink_to(self.root/'missing')
        self.assert_blocked()

    def test_env_example_is_allowed_not_a_clearance(self):
        (self.root/'public/.env.example').write_text('SAMPLE_KEY=\n')
        result = self.run_deploy()
        self.assertEqual(result.returncode, 73, result.stdout+result.stderr)

    def test_credential_or_non_https_hosts_block(self):
        for host in ('http://fixture.example.org', 'https://user:password@example.org',
                     'https://example.org/path', 'https://example.org/?token=synthetic'):
            with self.subTest(host=host):
                self.assert_blocked(PAGES_CANONICAL=host)


class HookBoundary(unittest.TestCase):
    def test_documented_hook_honors_path_is_executable_and_preserves_existing(self):
        skill = (REPO/'skills/appsec-stack/SKILL.md').read_text()
        snippet = re.search(r"python3 - <<'PY'\n(.*?)\nPY", skill, re.S).group(1)
        with tempfile.TemporaryDirectory(prefix='hook-boundary-') as directory:
            root = Path(directory)
            def run(*command):
                return subprocess.run(command, cwd=root, capture_output=True, text=True, timeout=60)
            self.assertEqual(run('git', 'init', '-q').returncode, 0)
            self.assertEqual(run('git', 'config', 'core.hooksPath', 'custom-hooks').returncode, 0)
            self.assertEqual(run('python3', '-c', snippet).returncode, 0)
            hook = root/'custom-hooks/pre-commit'
            self.assertTrue(os.access(hook, os.X_OK))
            original = hook.read_bytes()
            self.assertIn(b'exec gitleaks git --staged --redact --no-banner', original)
            self.assertNotEqual(run('python3', '-c', snippet).returncode, 0)
            self.assertEqual(hook.read_bytes(), original)
            binary = root/'bin'
            binary.mkdir()
            scanner = binary/'gitleaks'
            scanner.write_text('#!/usr/bin/env bash\nprintf "%s\\n" "$@"\nexit 67\n')
            scanner.chmod(0o755)
            result = subprocess.run([str(hook)], cwd=root,
                env=dict(os.environ, PATH=str(binary)+os.pathsep+os.environ['PATH']),
                capture_output=True, text=True, timeout=60)
            self.assertEqual(result.returncode, 67)
            self.assertEqual(result.stdout.splitlines(), ['git', '--staged', '--redact', '--no-banner'])


if __name__ == '__main__':
    unittest.main()

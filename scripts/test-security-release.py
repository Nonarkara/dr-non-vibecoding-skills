#!/usr/bin/env python3
import copy
from datetime import datetime, timedelta, timezone
import hashlib
import json
from pathlib import Path
import runpy
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / 'templates/security-release.py.template'
validate = runpy.run_path(str(TEMPLATE))['validate']
REV = 'a' * 40

class ReleaseGate(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.file = self.root / 'receipt.txt'
        self.file.write_text('Synthetic fixture: not a real security assessment.')
        self.record = json.loads((ROOT / 'templates/security-controls.json.template').read_text())
        self.record['target_commit'] = REV
        self.record['maturity'] = 'Production'
        for row in self.record['controls']:
            row.update(status='passed', owner='fixture reviewer', reason='synthetic test assertion', evidence=[{
                'path': 'receipt.txt',
                'sha256': hashlib.sha256(self.file.read_bytes()).hexdigest(),
                'checked_at': datetime.now(timezone.utc).isoformat()
            }])

    def check_bad(self, record):
        self.assertTrue(validate(record, self.root, True, REV)[0])

    def test_complete_attestations(self):
        self.assertEqual(validate(self.record, self.root, True, REV), ([], []))

    def test_demo_is_not_release(self):
        demo = json.loads((ROOT / 'templates/security-controls.json.template').read_text())
        self.assertFalse(validate(demo, self.root)[0])
        self.assertEqual(len(validate(demo, self.root)[1]), 8)
        self.check_bad(demo)

    def test_every_failed_or_unknown_boundary_blocks(self):
        for i in range(8):
            for state in ('failed', 'unverified', 'invented'):
                with self.subTest(i=i, state=state):
                    data = copy.deepcopy(self.record)
                    data['controls'][i]['status'] = state
                    self.check_bad(data)

    def test_missing_duplicate_and_unknown_controls(self):
        for change in ('missing', 'duplicate', 'unknown'):
            data = copy.deepcopy(self.record)
            if change == 'missing': data['controls'].pop()
            elif change == 'duplicate': data['controls'].append(data['controls'][0])
            else: data['controls'][0]['id'] = 'everything-is-secure'
            self.check_bad(data)

    def test_pass_requires_owner_reason_and_evidence(self):
        for field in ('owner', 'reason', 'evidence'):
            data = copy.deepcopy(self.record)
            data['controls'][0][field] = [] if field == 'evidence' else ''
            self.check_bad(data)

    def test_nonapplicability_requires_review_receipt(self):
        data = copy.deepcopy(self.record)
        data['controls'][0]['status'] = 'not_applicable'
        self.assertFalse(validate(data, self.root, True, REV)[0])
        data['controls'][0]['evidence'] = []
        self.check_bad(data)

    def test_artifact_changed_missing_or_escape(self):
        for filename in ('missing.txt', '../outside', str(self.file), '.env'):
            data = copy.deepcopy(self.record)
            data['controls'][0]['evidence'][0]['path'] = filename
            self.check_bad(data)
        self.file.write_text('changed')
        self.check_bad(self.record)

    def test_symlink_escape(self):
        with tempfile.TemporaryDirectory() as outside:
            external = Path(outside) / 'outside.txt'; external.write_text('canary')
            (self.root / 'link.txt').symlink_to(external)
            data = copy.deepcopy(self.record)
            data['controls'][0]['evidence'][0]['path'] = 'link.txt'
            self.check_bad(data)

    def test_stale_future_naive_and_bad_dates(self):
        for stamp in ((datetime.now(timezone.utc)-timedelta(days=31)).isoformat(),
                      (datetime.now(timezone.utc)+timedelta(days=1)).isoformat(),
                      '2026-10-14T09:00:00', 'bad', None):
            data = copy.deepcopy(self.record)
            data['controls'][0]['evidence'][0]['checked_at'] = stamp
            self.check_bad(data)

    def test_internal_symlink_cannot_read_credential_canary(self):
        private = self.root / '.env'; private.write_text('fake private canary')
        (self.root / 'innocent.txt').symlink_to(private)
        data = copy.deepcopy(self.record)
        data['controls'][0]['evidence'][0].update(path='innocent.txt', sha256=hashlib.sha256(private.read_bytes()).hexdigest())
        self.check_bad(data)

    def test_claude_template_preserves_prompts(self):
        settings = json.loads((ROOT/'templates/claude-security.settings.json.template').read_text())
        self.assertEqual(settings['permissions']['defaultMode'], 'default')
        self.assertIs(settings['sandbox']['autoAllowBashIfSandboxed'], False)
        self.assertIs(settings['sandbox']['allowUnsandboxedCommands'], False)

    def test_wrong_revision(self):
        self.assertTrue(validate(self.record, self.root, True, 'b'*40)[0])
        self.record['target_commit'] = ''
        self.check_bad(self.record)

    def test_malformed_values(self):
        for record in ([], {}, {'schema_version':1, 'controls':None}): self.check_bad(record)
        for field in ('id', 'status', 'evidence'):
            data = copy.deepcopy(self.record); data['controls'][0][field] = {}
            self.check_bad(data)

    def test_cli_exit_codes(self):
        manifest = self.root / 'manifest.json'
        manifest.write_text(json.dumps(self.record))
        def run(*args):
            return subprocess.run(['python3',str(TEMPLATE),str(manifest),*args],cwd=self.root,capture_output=True,text=True)
        self.assertEqual(run('--release','--commit',REV).returncode,0)
        manifest.write_text('{bad')
        self.assertEqual(run().returncode,1)

if __name__ == '__main__': unittest.main()

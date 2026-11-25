# Dr Non's Vibe Coding Stack — Makefile
.PHONY: help become-builder install-skills init-project audit validate sync-counts test relay-status relay-check make-it-mine repo-map

help:
	@./setup.sh --help

become-builder:
	@./setup.sh --become-builder

install-skills:
	@./setup.sh --install-skills

init-project:
	@./setup.sh --init-project

audit:
	@./setup.sh --audit

validate:
	@python3 scripts/validate_repo.py

sync-counts:
	@python3 scripts/sync-counts.py

make-it-mine:
	@./scripts/make-it-mine.sh --help

repo-map:
	@./scripts/repo-map.sh .

relay-status:
	@./scripts/relay.sh status

relay-check:
	@./scripts/relay.sh check

.PHONY: rehearse
rehearse:
	@bash scripts/test-install-skills.sh
	@bash scripts/test-bootstrap.sh
	@python3 scripts/test-cooked-data.py

test: validate relay-check rehearse
	@bash -n setup.sh scripts/*.sh
	@python3 scripts/test-security-release.py
	@python3 scripts/test-deploy-security.py
	@node scripts/test-public-fetch.mjs
	@node scripts/test-starter.mjs
	@bash scripts/test-cf-runaway-cost.sh

# Dr Non's Vibe Coding Stack — Makefile
.PHONY: help become-builder install-skills init-project audit validate test relay-status relay-check

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

relay-status:
	@./scripts/relay.sh status

relay-check:
	@./scripts/relay.sh check

test: validate relay-check

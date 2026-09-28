# Dr Non's Vibe Coding Stack — Makefile
.PHONY: help become-builder install-skills init-project audit validate test relay-status relay-check make-it-mine repo-map

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

make-it-mine:
	@./scripts/make-it-mine.sh --help

repo-map:
	@./scripts/repo-map.sh .

relay-status:
	@./scripts/relay.sh status

relay-check:
	@./scripts/relay.sh check

test: validate relay-check
	@bash -n setup.sh scripts/*.sh
	@bash scripts/test-install-skills.sh
	@bash scripts/test-bootstrap.sh

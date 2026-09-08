# Dr Non's Vibe Coding Stack — Makefile
.PHONY: help become-builder install-skills init-project audit validate test

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

test: validate

#!/usr/bin/env bash
# Wrapper redirecting to top-level setup.sh
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/../setup.sh" "$@"

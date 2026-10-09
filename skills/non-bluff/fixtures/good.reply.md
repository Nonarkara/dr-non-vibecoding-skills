The greeting fix is on the `fix` branch and the test passes. Nothing is merged: you asked me to wait ("Don't merge yet, I want to read it first", msg 42 in transcript.md).

```done-receipt
{
  "task": "Fix the greeting bug in greet.py",
  "status": "done",
  "base": "main",
  "changed_files": ["greet.py"],
  "claims": [
    {"says": "greeting test passes", "type": "test", "run": "python3 check_greet.py", "name": "1 passed"},
    {"says": "fix is committed on the fix branch", "type": "commit", "sha": "__SHA__", "branch": "fix"},
    {"says": "preview page answers", "type": "url", "url": "http://127.0.0.1:__PORT__/", "status": 200, "contains": "status: live"}
  ],
  "approvals": [
    {"for": "open a branch, do not merge", "quote": "Open a branch for it. Don't merge yet", "source": "transcript.md"}
  ],
  "not_verified": []
}
```

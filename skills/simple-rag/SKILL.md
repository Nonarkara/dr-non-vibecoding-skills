---
name: simple-rag
description: >-
  Build a tiny local RAG with SQLite FTS5 first, embeddings only if needed. Use
  when docs, notes, or a corpus must be searchable with citations and no vector-DB ops.
license: MIT
---

# Simple RAG

> FTS5 answers 80% of local search. Embeddings earn the last 20% — only after FTS5 proves insufficient.

This is the retrieval pattern behind [`shared-memory-hub`](../shared-memory-hub/SKILL.md)'s vault (plain Markdown + FTS5) and [`local-ai-fabric`](../local-ai-fabric/SKILL.md)'s operator memory (SQLite `turns`). No Chroma, no Pinecone, no Docker — one SQLite file the project owns.

Influences: [`shared-memory-hub`](../shared-memory-hub/SKILL.md) (vault-first), [`data-catalog`](../data-catalog/SKILL.md) (port the adapter), [`local-llm-ollama`](../local-llm-ollama/SKILL.md) (optional embedder).

---

## The rule

Every answer cites the file + chunk it came from. A RAG that cannot point at its source is a confabulation machine with extra steps.

---

## The procedure — FTS5 first (one file, stdlib only)

### 1. Layout

```
<project>/rag/
  corpus/            # source .md you already have (docs/, notes/, lessons/)
  rag.db             # the only artifact; gitignore it, rebuild from corpus
  ingest.py          # corpus → sqlite
  query.py           # question → ranked chunks with citations
```

### 2. Ingest — chunk small, keep source

```python
# ingest.py — stdlib sqlite3 only
import sqlite3, pathlib
db = sqlite3.connect("rag/rag.db")
db.execute("DROP TABLE IF EXISTS chunks")
db.execute("CREATE VIRTUAL TABLE chunks USING fts5(path, chunk, tokenize='porter')")
for p in list(pathlib.Path("rag/corpus").rglob("*.md")) + list(pathlib.Path("docs/lessons").rglob("*.md")):
    text = p.read_text(encoding="utf-8", errors="ignore")
    # 800-char chunks on paragraph boundaries; overlap 1 paragraph
    paras, buf = text.split("\n\n"), ""
    for para in paras:
        if len(buf) + len(para) > 800:
            db.execute("INSERT INTO chunks VALUES (?,?,?)", (str(p), buf.strip(), ""))
            buf = buf[-200:]  # overlap
        buf += "\n\n" + para
    if buf.strip():
        db.execute("INSERT INTO chunks VALUES (?,?,?)", (str(p), buf.strip(), ""))
db.commit()
```

Why 800 chars: fits one idea, fits any context window, and the citation stays readable. The one project that used 4000-char chunks returned whole essays and the agent quoted the wrong paragraph.

### 3. Query — rank, then read the file

```python
# query.py "how does deploy verification work?"
import sqlite3, sys
db = sqlite3.connect("rag/rag.db")
q = " ".join(sys.argv[1:])
for path, chunk in db.execute(
    "SELECT path, chunk FROM chunks WHERE chunks MATCH ? ORDER BY rank LIMIT 5", (q,)):
    print(f"\n### {path}\n{chunk[:600]}")
```

The agent reads the top 3–5 chunks, then opens the full file for the one it will cite. Never answer from the snippet alone when the file is local — the snippet is the index, not the source.

### 4. Wire to the agent (not to a demo UI)

- [`agent-memory`](../agent-memory/SKILL.md) Tier 2: add one line — `RAG index: rag/rag.db (rebuild: python3 rag/ingest.py)`.
- [`mcp-cli-first`](../mcp-cli-first/SKILL.md): expose as CLI first (`python3 rag/query.py "<q>"`), MCP second (see [`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md)).
- Rebuild on corpus change: `git hook` or `scripts/verify.sh` runs `ingest.py` when `docs/**/*.md` is staged. A stale index is worse than no index — it cites deleted text.

---

## Embeddings only if FTS5 fails (the gate)

Add vectors when — and only when — two of these are true on real queries:

1. Synonym misses: "outage" never finds "incident" docs despite `porter` stemming.
2. Cross-language misses: Thai query must find English notes (see [`multilingual-type`](../multilingual-type/SKILL.md)).
3. Top-5 FTS5 precision < 60% on a 20-question eval set you wrote down.

When the gate passes, keep FTS5 and add one column — do not replace:

```bash
# Ollama embedder, local, no key (see local-llm-ollama)
ollama pull nomic-embed-text
curl http://localhost:11434/api/embeddings -d '{"model":"nomic-embed-text","prompt":"hello"}'
```

Store `embedding BLOB` beside each chunk, cosine-rank the top 20 FTS5 hits down to 5. Hybrid beats pure-vector on small corpora and keeps citations exact.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Chroma / Pinecone / Qdrant first | Ops you will not maintain; the ChromaDTV removal in [`know-when-to-wait`](../know-when-to-wait/SKILL.md) cost ~2TB for zero recall gain |
| 4000-char chunks "for context" | Returns essays; agents cite the wrong paragraph |
| Answering from snippets | Snippet is the index; open the file and cite `path + heading` |
| No eval set | You cannot tell FTS5 from vectors without 20 written questions + expected files |
| Index in git | `rag.db` is a build artifact; corpus is the source — gitignore the db |

---

## The test

Ask 5 questions you know the answers to. Every answer must name `path + heading`, and opening that file must confirm the claim. If 4/5 pass on FTS5 alone, you do not need embeddings yet.

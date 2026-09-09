---
name: restore-drill
description: >-
  Prove backups by restoring one on a schedule and recording the date, time
  taken, and data lost. Use when a service holds data you cannot recreate.
license: MIT
---

# Restore Drill

> A backup is a claim. A restore with a date on it is evidence. Until you have done one, you do not know whether you have backups — you know that a job exited zero.

[`risk-posture`](../risk-posture/SKILL.md) decides how much blast radius a change is allowed. [`dual-write-resilience`](../dual-write-resilience/SKILL.md) keeps the public surface up when the live path dies. Neither of them gets your data back, and the moment you need it back is the worst possible moment to discover the format is unreadable.

The three ways backups fail, all of them silent until the day:

1. **The credential rotated** since the backup was taken, and the restore path cannot authenticate.
2. **The schema moved**, and the dump loads into a database the application no longer understands.
3. **It backed up the wrong thing** — the container image and not the volume, the app database and not the object store, the rows and not the migrations that make them mean anything.

None of the three shows up in a green backup job. All three show up in a drill.

---

## The rule

Every service that holds data you cannot recreate has a dated last-successful-restore. The date lives in the project contract where you see it, not in a monitoring tool.

---

## The procedure

### 1. Name the two numbers before drilling

- **RPO** — how much data you accept losing, in minutes or hours. This sets backup frequency.
- **RTO** — how long you accept being down while restoring. This sets the restore method.

Write both in the contract. Chosen numbers are a design decision; unchosen numbers are whatever the default happened to be, discovered under pressure.

### 2. Drill against a scratch target, from a real backup

```bash
# 1. Take the OLDEST backup you would still accept — not last night's happy path.
# 2. Restore into a scratch target that is not production and not your dev database.
# 3. Time it. Wall clock, from decision to first correct query.
# 4. Verify a known row you can recognise by eye, plus one aggregate.
# 5. Tear the scratch target down. Record the result.

time pg_restore -d "$SCRATCH_URL" ./backups/2026-08-14.dump
psql "$SCRATCH_URL" -c "select count(*), max(created_at) from readings;"
```

The oldest acceptable backup, not the newest, is the point. The newest one restores because nothing has drifted yet.

### 3. Record the receipt

Append to `docs/lessons/restore-drills.md` and put the latest date in the contract header. The row below is the shape, not a result — fill it with yours:

```markdown
| Date | Source backup | RTO actual | Rows verified | Data lost (RPO) | Broke |
|---|---|---|---|---|---|
| 2026-09-09 | 2026-08-14 nightly | 11m40s | 412,908 · max ts 2026-08-14T23:58Z | 6h | Secret rotated 08-20; restore user needed re-granting |
```

The **Broke** column is the reason the drill exists. A drill where nothing broke and you learned nothing is a drill you ran too soon after the last one.

### 4. Put it on the calendar

Quarterly for anything with users, monthly for anything with money. Not "when I get to it" — the whole failure mode is that you never get to it, and then you get to it at 2 AM.

### 5. Restore the whole system, not the database

A database restored next to an object store that is six weeks newer is a broken product with correct rows. List every stateful thing — database, uploaded files, secret store, DNS, the queue's in-flight jobs — and mark which are backed up, which are recreatable from code, and which you have quietly decided to lose. The third list is allowed. It just has to be a decision.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| A green backup job as proof | It proves a job ran, not that its output loads |
| Restoring last night's backup | Nothing has drifted in a day; you tested the easy case |
| Drilling into the dev database | You will contaminate dev, and dev's schema is ahead of the backup anyway |
| Provider snapshots as the whole plan | They are inside the account that gets suspended or deleted; keep one copy elsewhere |
| Backing up data without the migrations | Rows without schema history are archaeology, not a restore |
| Skipping the drill because nothing changed | The credential rotation that breaks it is exactly the change nobody counted |
| Storing the restore runbook only in the app you are restoring | Keep it in the repo and in a file on the laptop |

---

## The test

Say the date of your last successful restore out loud. If you cannot, you do not have backups — you have a backup job. Then check whether the person who would run the restore at 2 AM is you, awake, without the runbook in front of you.

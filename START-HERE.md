# Start here

Plain markdown skills for shipping software with an agent. No runtime. MIT. Fork it and make it yours.

If you have no clone, paste [`HANDSHAKE.md`](HANDSHAKE.md) into the agent. That file is the working relationship.

If you have the clone, you and the agent follow this order. Skip a step only by writing down why.

## The order

1. **Class.** [`proportionality`](skills/proportionality/SKILL.md) — throwaway, prototype, production, or civic. This chooses how much engineering, testing, and security the task gets.
2. **Person.** [`user-need`](skills/user-need/SKILL.md) — learning, producing, or playing. This chooses depth and tone.
3. **Pass condition.** [`definition-of-done`](skills/definition-of-done/SKILL.md) — one sentence you can test, written before the edit.
4. **Build** at that class. Stay small on the happy path ([`ponytail`](skills/ponytail/SKILL.md)). The failure path earns extra work when the class is civic ([`risk-posture`](skills/risk-posture/SKILL.md)).
5. **Slop pass.** [`anti-slop`](skills/anti-slop/SKILL.md) on code, interface, and prose.
6. **Security.** [`security-baseline`](skills/security-baseline/SKILL.md) at the level the class names.
7. **Record.** [`reproducible-result`](skills/reproducible-result/SKILL.md) — versions, lockfile, seed, command.
8. **Prove it.** Run the pass condition. Report succeeded, failed, skipped, unverified ([`result-honesty`](skills/result-honesty/SKILL.md)). Say "done" only with a done receipt that [`non-bluff`](skills/non-bluff/SKILL.md) can re-check.
9. **Review.** [`vibe-review`](skills/vibe-review/SKILL.md). The copyable list is [`templates/vibe-review.md.template`](templates/vibe-review.md.template).

The rest of `skills/` is the library for the specific problem. The index is [`CATALOG.md`](CATALOG.md). Where an idea came from is [`CREDITS.md`](CREDITS.md). The walkthrough is [`playbooks/17-the-vibe-foundation.md`](playbooks/17-the-vibe-foundation.md).

## For a beginner

```bash
git clone https://github.com/Nonarkara/dr-non-vibecoding-skills.git
cd dr-non-vibecoding-skills && ./setup.sh --become-builder
```

Open the new project and put the class and the pass condition in the first message. Example: "Prototype. Pass when the Bangkok weather card shows the source and the time."

## For an agent

Load steps 1–3 before editing. Load steps 5–9 before you say the work is finished. Do not load the whole library to answer one question.

## This repository stays checkable

```bash
make validate
```

That checks skill frontmatter, local links, and the counts. The GitHub Action also lints these foundation pages. Actions are pinned to a commit.

เริ่มที่นี่ ทั้งคนและเอเจนต์ จัดระดับงาน บอกว่ากำลังเรียน ทำ หรือเล่น เขียนเงื่อนไขที่ตรวจได้ แล้วค่อยลงมือ พูดว่าเสร็จเมื่อมีผลคำสั่งให้ดู

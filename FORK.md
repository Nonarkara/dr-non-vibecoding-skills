# FORK.md — make this stack yours

```bash
scripts/make-it-mine.sh --name "Jane Doe" --handle janedoe \
  --practice "Studio Rain" --accent "#3b82f6" --repo my-vibe-stack
# reads the tree, changes nothing, prints what it would do
scripts/make-it-mine.sh ... --apply
make validate
```

Dry-run by default. Re-runnable. Reversible with `git checkout .` before you commit.

แยกสายไปทำของตัวเองได้เลย — เก็บเครดิตต้นทางไว้ แล้วเขียนบทเรียนของคุณเอง

---

## Why a rename script and not just a fork

The method here is portable. The name on it is not, and neither is the
experience behind it. A fork that runs `sed s/Dr Non/Me/g` across the tree ends
up claiming another person's incidents, another person's city, and another
person's twenty projects — and the whole practice rests on rules being paid for
by something that actually happened. A rename that produces a fake biography has
broken the thing it copied.

So the script sorts every file into three tiers and treats them differently.

## The three tiers

### Tier 1 — yours now, rewritten

Identity in the install path, README, contracts, plugin manifests, design tokens,
the handshake. Your name, your handle, your practice, your accent colour, your
repo name. Roughly thirty files.

Upstream live URLs (`*.nonarkara.org`) become `example.org`, because pointing
your documentation at somebody else's production service is a support ticket
waiting to happen. `--keep-urls` if you really mean to.

The README author line is **blanked, not renamed** — you get a placeholder to
fill, because "architect, urban anthropologist, Bangkok" is a claim, not a field.
The script then prints every remaining file that still asserts a city, a
profession, a language pair, or an institution, and leaves those to you.

### Tier 2 — never touched

`LICENSE`, `NOTICE.md`, `CONTRIBUTORS.md`.

MIT requires the copyright notice to survive, `karpathy-guidelines` carries its
own upstream credit, and the AI collaborators are named on purpose. The script
**verifies these still credit the original author after it runs** and aborts if
they do not. You can delete them by hand afterwards; you will just be doing it
knowingly, and in violation of the licence.

### Tier 3 — inherited, kept verbatim, marked

`playbooks/`, `docs/lessons/`, `docs/relay/`, and the skills whose names carry
someone else's — their golden rules, their prompting style.

These get a banner and nothing else:

> **Inherited, not lived.** This document records Dr Non's incidents and
> reasoning, kept verbatim from the upstream stack. It is evidence you can learn
> from and cite — it is not your experience.

Files and directories whose *names* contain the upstream slug are left alone
entirely, so every link to them keeps resolving. That is also the honest outcome:
`dr-non-golden-rules` is a named set of opinions, and renaming it to yours would
be claiming them.

## What to do in the first week

1. **Read `git diff --stat`.** The script is a rename, not a judgement. It has no idea which of these files you actually want.
2. **Add yourself to `CONTRIBUTORS.md`** under a new heading. Do not remove anyone.
3. **Fill the author line** and settle the biographical claims the script listed.
4. **Pick three skills you have never used** and delete them. A stack you cannot defend line by line is somebody else's stack that you are hosting.
5. **Write one lesson of your own** in `docs/lessons/`. That is the moment it starts being yours.

## What makes it yours, eventually

Not the rename. The rename takes four seconds and changes nothing that matters.

It becomes yours when the incidents in it are ones you paid for. Every skill in
the upstream tree is paired with something that actually went wrong on somebody's
live service. Until you have swapped those for your own, you are running a
borrowed stack — which is a completely reasonable thing to do, and worth saying
out loud rather than papering over with a find-and-replace.

The honest version of a young fork is a `CONTRIBUTORS.md` that credits upstream,
playbooks that still carry the inherited banner, and one lesson file with your
name and last Tuesday's date on it. That is a better artifact than a clean sweep
of somebody else's name.

## If you are forking to contribute back

Do not run this script. Work in the upstream naming, open a pull request, and see
[`CONTRIBUTING.md`](CONTRIBUTING.md). The rename is for a divergent practice, not
for a patch.

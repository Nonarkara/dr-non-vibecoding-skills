---
name: why-it-works
description: Use when writing design descriptions, portfolio copy, or case studies. Forces perceptual language over feature lists. Pairs with axiom-design-core, no-ai-tells, make-it-stick.
license: MIT
---

# Why It Works

> The description of a design is part of the design. The words on the page are the same surface the user touches; treat them with the same craft as the pixels.

This skill is the discipline of writing *about* design with the same rigour you bring to designing. The trigger is any time an agent is asked to describe a site, screen, feature, or interaction in a way that is more than a feature list. The form comes from one observation: the best design portfolios, award write-ups, and case studies pair every example with a **"why it works"** paragraph — a short, dense, sensory description of what the design *does* in human perception — followed by a **"business lesson"** line that the operator can take into their own work.

Both halves are required. Skip the first and the writing is generic; skip the second and the writing is a museum.

---

## When to use this skill

Load `why-it-works` before any of these:

- A portfolio case study, agency reel, or "our work" page.
- A blog post that *describes* a design (e.g. "55 award-winning websites and why they work").
- A README, internal memo, or review that names what is good or bad about a design.
- A spec or RFC that justifies a design decision in human terms before technical terms.
- A change log, post-mortem, or commit message that needs to explain *why* the change earns its place.

Do **not** use this skill for:

- Pure feature lists (use `data-catalog` or a bullet list).
- Bug reports (use the bug-report format, not design language).
- Marketing copy for a product being sold (that is a different register; see `payments-voice`).
- Generic praise with no design specifics ("looks great, very modern!").

---

## The two-part form

Every description is a **pair**. The first part is the *perceptual* half; the second is the *operational* half. The pair together is more useful than either alone, because the perceptual half names *what is good* and the operational half names *what to do about it*.

### 1. Why it works (perceptual)

Two to four sentences. The job is to translate visual choices into human outcomes. The reading of the design, not the design itself. The reader should be able to picture the design and *feel* what it does to the visitor.

Five axes, applied in any order:

- **Perception** — what the visitor sees, hears, or feels first. The first 200ms.
- **Mechanism** — what the design *does*, not what it *is*. The verb, not the noun.
- **Intent** — what the maker was trying to achieve, named in their terms, not yours.
- **Contrast** — what this design does *instead of* the default. The thing that is missing.
- **Time** — how the design unfolds. The scroll, the entrance, the hover, the wait.

A description that hits three or more of these axes is *good*. Five is excellent. One is a feature list. Zero is a list of adjectives.

### 2. Business lesson (operational)

One sentence. The job is to give the operator one thing they can take into their own work. The lesson names a *general* truth the design demonstrates, in language that is not specific to the design.

The lesson must:

- Be applicable to *other* projects, not just this one.
- Name the *trade-off* the design resolved, not the *choice* it made.
- Include the *guard rail* — the thing the operator must not forget (e.g. "then protect load speed, mobile usability and reduced-motion preferences").
- Be one sentence, max two.

---

## The 5 axes, with examples

Each example is taken from the source article. The bracket names the axis.

### Perception — what the visitor sees/feels first

> "The use of space on Wealthsimple makes it easy to segment each section of its pages. The GIFs throughout the page also make for an exciting experience, especially since they don't relate directly to investing. The site makes investing seem that much more fun."

The *exciting GIFs that don't relate to investing* is the perception — the reader learns that the design uses a tonal counterweight (playful motion) to defuse the anxiety of the subject. The description names what the visitor *feels*, not the asset type.

> "I love the fact that they utilize emotion immediately when you arrive on the homepage with the background and the copy."

The *emotion immediately* is the perception. The agent should default to naming what the visitor feels in the first viewport, not what assets are loaded.

### Mechanism — what the design *does*

> "Boosted took what could have been seen as an average skateboard to the next level by introducing amazingly detailed photos of its product accompanied with detailed descriptions on its site."

The *detailed photos accompanied with detailed descriptions* is the mechanism. The agent should name the *pairing*, not the feature.

> "Revols takes a bold approach on its website by enlarging its small, sophisticated headphones using macro photography and video. The photography and video make the site product-focused, so its users slowly become more and more immersed in the experience these headphones can give you."

The *scale shift* (small product, large image) is the mechanism. The *immersion* is the *consequence* the mechanism produces. Both are required; the consequence is the load-bearing word.

### Intent — what the maker was trying to achieve

> "Born from the desire to create a true emotional journey – the site offers unique designs mirroring the unique characteristics of their products and guide users through the Four Worlds."

The *true emotional journey* and the *Four Worlds* are the maker's intent, named in their own framing. The agent should quote intent when the source supplies it, not paraphrase.

> "The 2018 Site of the Year Awwwards winner from the Netherlands uses a combination of exhibit photography and digital design elements. This carefully crafted mixture guides visitors to the site through the experience they'll have during a visit to the museum in person."

The *guides visitors through the experience they'll have in person* is the maker's intent — the site is a preview, not a destination. The agent should name the *why*, not just the *what*.

### Contrast — what this design does *instead of* the default

> "Far too often software companies have very websites that completely lack any images of their products. If you're currently in this position and looking for inspiration, Zero is a site for inspiration."

The *instead of* is the contrast — the default (no product images) and the deviation (Zero shows them). The contrast is often the most quotable part of a good description.

> "Unlike traditional product-focused sites, Morgan Stanley headlines its homepage with an article they hope to drive a significant amount of traffic to."

The *unlike* is the contrast. The agent should name what is being *refused*, not just what is being *done*.

### Time — how the design unfolds

> "The quirky animation on Toggl's homepage page draws the user's attention immediately on arrival. This style of imagery is carried throughout the remaining sections with simple groups of content boxes directly next to each. Toggl also pays careful attention to how things animate in on page load."

The *animates in on page load* is the time axis — the design is a sequence, not a state. The agent should name the *entrance* and the *progression*, not the *layout*.

> "Denmark chocolate maker Simply Chocolate created this website with specific pages for every chocolate bar. One of the most visual aspects of this site is the way all the products display consistency in branding as you scroll from one to the next."

The *as you scroll from one to the next* is the time axis. The agent should name the *sequence*, not the *state*.

---

## The agent-default tell list (do not ship any of these)

These are the design-description tells that mark the writing as agent-generated. If the description contains any of these as written, rewrite.

- **"Visually stunning"** — without a mechanism, this is empty. The image is the description; the word does no work.
- **"Sleek and modern"** — every site since 2014 is "sleek and modern" by default. This is not a differentiator.
- **"Clean and professional"** — the agent default for any B2B site. The agent should refuse.
- **"Intuitive user experience"** — without naming the mechanism, this is a slogan, not a description.
- **"Engaging content"** — what engages? For whom? In what way? The agent should name the *engagement mechanism*.
- **"Strong call to action"** — which action? Where? What is the *form* of the call? The agent should name the *action* and its *position*.
- **"Beautiful design"** — beautiful is the perception, not the description. The agent should name the *what is beautiful about it*.
- **"Innovative and unique"** — the most common agent filler. Almost always false; almost always useless.
- **"Seamless experience"** — seamless how? Across what boundary? The agent should name the *boundary*.
- **"User-friendly interface"** — friendly to which user? In which task? The agent should name the *task*.
- **"Captivating visuals"** — captivating via which sense? The agent should name the *sense*.
- **"Exceptional design"** — exceptional compared to what? The agent should name the *peer*.
- **"Aesthetic appeal"** — the appeal *to whom*? The agent should name the *audience*.
- **"Well-designed"** — a verdict without evidence. The agent should show the *evidence*.

**Rule of thumb**: if the description can be cut and pasted onto a different site without changing a word, it is a tell. The description must be *specific* to this design, or it is a tell.

---

## The Business lesson rotation (and how to break it)

The source article rotates through a small set of business lessons. A good description can do the same — but the rotation must be **honest**, not lazy. The lesson must match the design.

The seven lessons in the source article, in order of frequency:

1. **Use motion to explain or guide, then protect load speed, mobile usability and reduced-motion preferences.** For: sites with hero video, scroll-driven animation, parallax, WebGL, canvas. Not for: static marketing sites, dashboards, forms.
2. **Put the visitor's main task first and keep navigation labels direct on desktop and mobile.** For: search-first products, utility sites, transactional flows. Not for: brand-led portfolios, editorial.
3. **Pair product visuals with concrete benefits, proof and one obvious next action.** For: e-commerce, SaaS, conversion-led sites. Not for: awareness-led brand sites.
4. **Show the strongest proof early, then give qualified visitors a short path to contact.** For: agency sites, service businesses, high-consideration B2B. Not for: e-commerce, low-consideration consumer.
5. **Connect the visual story to a clear action, readable content and accessible controls.** For: non-profit, mission-led, brand with strong visual identity. Not for: utility products.
6. **Use a distinctive visual system, but keep the message hierarchy and next action unmistakable.** For: experimental sites, WebGL, award-driven. Not for: utility products.
7. **Borrow the underlying hierarchy and interaction pattern, then test it for speed, accessibility and conversions.** For: sites with strong pattern but not directly copyable. Not for: sites where the pattern itself is the load-bearing innovation.

**A description that uses the same lesson for two consecutive examples is wrong.** Either the descriptions are not specific enough, or the agent is not reading the designs. Either way, fix the descriptions.

---

## A worked transformation

A bad description, agent-default style:

> "This website features a visually stunning design with a sleek and modern aesthetic. The intuitive user experience is complemented by engaging content and a strong call to action. The seamless experience is enhanced by innovative and unique design elements."

This is thirteen tells in four sentences. The reader learns nothing.

A good description, `why-it-works` form:

> **Why it works:** The site opens with a single, full-bleed photograph of the product in use — not on a white background, but in the setting the buyer will use it. The visitor lands *inside* the product's world before the navigation, the price, or the spec sheet. From there, each section pairs one feature with one benefit and one proof point: a quote, a number, a comparison. The scroll is paced to surface exactly one new idea per viewport. There is no menu noise, no carousel, no animation that isn't load-bearing.
>
> **Business lesson:** put the visitor inside the use case in the first viewport, then pace the rest of the page at one new idea per scroll.

The good description names perception (first viewport), mechanism (one feature / one benefit / one proof), intent (the maker wants the visitor *inside* the world), contrast (no menu noise, no carousel, no decorative animation), and time (one new idea per viewport). The business lesson is a single sentence that names a general truth.

---

## A reusable template (agent-facing)

```text
**Why it works:** [2–4 sentences. At least 3 of 5 axes: perception, mechanism, intent, contrast, time. The verbs, not the nouns. The consequences, not the features. The reader should be able to picture the design and feel what it does.]

**Business lesson:** [1 sentence. General truth applicable to other projects. Names the trade-off, not the choice. Includes the guard rail.]
```

Apply this template to every example in a portfolio post, every case study, every design review. The two parts together are the discipline.

---

## What this skill is *not*

- It is not a style guide. The 5 axes are not a *style*; they are a *checklist of what the description must do*. The form varies.
- It is not a substitute for seeing the design. The description must be *grounded* in the actual surface — the type, the palette, the motion, the layout. An agent that writes "Why it works" without inspecting the design is hallucinating.
- It is not a rule for marketing copy. The "Business lesson" is for design *writing* — case studies, post-mortems, design reviews. Marketing copy for a product being sold uses a different register.
- It is not a rule for short-form copy (tweets, captions). The two-part form is for paragraphs. A single sentence cannot carry two halves.
- It is not a rule that forbids adjectives. "Stunning" is fine when it is grounded — "a stunning full-bleed photograph of the chef mid-motion" is a perception. "Stunning" alone is a tell.

## Pairs with

- [`axiom-design-core`](../axiom-design-core/SKILL.md) — the design law. `why-it-works` is the *language* layer; `axiom-design-core` is the *principle* layer. A description that violates the law (e.g. "uses a sharp, restrained palette") is a tell.
- [`no-ai-tells`](../no-ai-tells/SKILL.md) — the tell list. The two skills share an axis. `why-it-works` is the design-writing tell list; `no-ai-tells` is the design-visual tell list.
- [`make-it-stick`](../make-it-stick/SKILL.md) — the writing discipline. `why-it-works` is the *applied* form; `make-it-stick` is the *general* form.
- [`no-design-tells`](../no-design-tells/SKILL.md) — the visual tell list. The description must not praise a design that violates the visual discipline.
- [`design-extract`](../design-extract/SKILL.md) — the agent extracts the design tokens; `why-it-works` writes the description that *names what the tokens do*.

## Check

A "Why it works" description is *ready* to ship when:

- It hits at least 3 of the 5 axes (perception, mechanism, intent, contrast, time).
- The verbs do the work, not the nouns. The reader can picture the visitor's experience.
- It cannot be cut and pasted onto a different site without changing a word.
- The "Business lesson" is a general truth, not a feature description. It applies to *other* projects.
- The "Business lesson" includes a guard rail (the thing the operator must not forget).
- The lesson has not been used for the previous example in the same list.
- The description does not contain any item from the agent-default tell list.
- The description is grounded in the actual design — the agent inspected the surface, not the brief.

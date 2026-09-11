<!-- consolidated by data/scrape/consolidate_skills.py -->

# Innovation Personas: The Ten Faces of IDEO

> This skill provides a taxonomy of ten distinct roles necessary for driving innovation within an organization. It moves beyond the 'Devil's Advocate' mindset—which often kills new ideas—by offering constructive personas categorized into Learning, Organizing, and Building. An agent should load this skill to diagnose why a team is stalling, identify missing perspectives, or assign specific innovation tasks to the right psychological profile.

Source: /Users/axiom/.minimax/v2/assets/2026/09/11/11-52-47-267-asset_20260911-115247-267_a851a6a38f45_ba10cf19-Tom Kelley, Jonathan Littman - The Ten Faces of Innovation_ IDEO's Strategies for Defeating the Devil's Advocate and Driving Creativity Throughout Your Organi (2005, Currency_Doubl  
Purpose: You are extracting an INNOVATION ROLES skill for an AI agent. The source is Tom Kelley's The Ten Faces of Innovation — IDEO's taxonomy of the ten personas a team needs to innovate, organised into three groups (learning, organising, building).

Distil for the AI use case, not the human reader. The AI loads this when it has to:
1. Diagnose a team or organisation's innovation gaps. Which of the ten faces is missing? The Anthropologist, the Experimenter, the Cross-Pollinator are learning roles. The Hurdler, the Collaborator, the Director are organising roles. The Experience Architect, the Set Designer, the Caretaker, the Storyteller are building roles. The AI should be able to map a team against the ten and say "you have all the Builders but no Learning roles" or "the Hurdler is missing and that's why every idea dies".
2. Recognise the Devil's Advocate (the book calls out this role specifically as toxic to innovation) and design processes that don't depend on it for decision-making.
3. Match innovation moves to the right face. "We need to go observe users" is the Anthropologist. "We need to test this in a low-fidelity way" is the Experimenter. "We need to make the room nicer" is the Set Designer.
4. Apply the cross-pollinator mindset deliberately: bring ideas from outside the field, deliberately, instead of hoping it happens.
5. Use the Caretaker's discipline (the role that keeps the existing thing running) and the Storyteller's discipline (the role that makes the new thing memorable) — both are underrated.
6. Build a small team that covers all ten faces rather than hiring ten specialists.

Output: 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it has to diagnose a team's innovation capability, suggest what roles are missing, or assign moves to roles.

Voice: Dr Non's standard of comprehension. Plain English. No "leverage", "utilize", "robust", "holistic", "synergy", "paradigm", "delve", "tapestry", "testament", "landscape", "journey", "in today's fast-paced world", "it is important to note that", "at the end of the day".  

Chapters: 10  
Glossary terms: 20  
Patterns: 5  
Cheatsheet rules: 20  

## When to load this skill

This skill provides a taxonomy of ten distinct roles necessary for driving innovation within an organization. It moves beyond the 'Devil's Advocate' mindset—which often kills new ideas—by offering constructive personas categorized into Learning, Organizing, and Building. An agent should load this skill to diagnose why a team is stalling, identify missing perspectives, or assign specific innovation tasks to the right psychological profile.

## Core principles

- Innovation is a full-time state of being, not a periodic task to be checked off.
- The Devil's Advocate is toxic to early-stage ideas; use the ten personas to provide constructive friction instead.
- One person can wear multiple hats; a small team can cover all ten roles without hiring ten specialists.
- Observation of real human behavior is the primary source of breakthroughs, not focus groups or surveys.
- Prototyping is a way of thinking that makes ideas tangible and testable immediately.
- Small, low-fidelity experiments prevent large, expensive failures later in the process.
- Cross-pollination requires a deliberate search for ideas outside your own field to find hidden connections.
- The physical environment and the narrative surrounding a project are as important as the product itself.

## Chapter index

- **ch01 — The Anthropologist** — The role focused on observing human behavior with a 'beginner's mind' to find unarticulated needs. (load: `chapters/ch01.md`)
- **ch02 — The Experimenter** — The role that makes ideas tangible through rapid, low-fidelity prototyping. (load: `chapters/ch02.md`)
- **ch03 — The Cross-Pollinator** — The role that connects disparate ideas from different industries to create something new. (load: `chapters/ch03.md`)
- **ch04 — The Hurdler** — The role that finds creative ways to bypass organizational roadblocks and resource constraints. (load: `chapters/ch04.md`)
- **ch05 — The Collaborator** — The role that brings people together and dissolves the boundaries between departments. (load: `chapters/ch05.md`)
- **ch06 — The Director** — The role that sets the stage, gathers the cast, and keeps the project moving toward a goal. (load: `chapters/ch06.md`)
- **ch07 — The Experience Architect** — The role that maps out every touchpoint of a customer's interaction with a brand. (load: `chapters/ch07.md`)
- **ch08 — The Set Designer** — The role that uses the physical workspace to influence behavior and spark creativity. (load: `chapters/ch08.md`)
- **ch09 — The Caretaker** — The role that ensures the existing service remains excellent while new innovations are developed. (load: `chapters/ch09.md`)
- **ch10 — The Storyteller** — The role that builds internal and external support for an idea through narrative. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **Vuja De** | The ability to look at a familiar situation as if seeing it for the first time. | ch01 |
| **Beginner's Mind** | A Zen principle of approaching a subject with zero preconceptions, even if you are an expert. | ch01 |
| **Bug List** | A running list of everyday frustrations used as a source for innovation ideas. | ch01 |
| **Idea Wallet** | A collection of clever solutions, technologies, or observations kept for future inspiration. | ch01 |
| **Thoughtless Acts** | Small, often unconscious ways people adapt their environment or products to solve a problem. | ch01 |
| **Extreme Human Factors** | The practice of observing users in extreme situations or for long durations to find deep insights. | ch01 |
| **Low-Fidelity Prototype** | A quick, inexpensive model (like a sketch or foam mockup) used to test a concept early. | ch02 |
| **Implementation through Experimentation** | Introducing change as a temporary test to reduce organizational resistance. | ch02 |
| **Mistake Ritual** | A symbolic act (like 'flushing' a toy toilet) used to let go of failures and move on. | ch02 |
| **T-Shaped Person** | An individual with deep expertise in one field and broad curiosity across many others. | ch03 |
| **Cross-Pollination** | The act of taking an idea from one industry and applying it to another. | ch03 |
| **Devil's Advocate** | A role that focuses on finding reasons why an idea will fail; considered toxic in early innovation. | ch04 |
| **Silo Mentality** | The tendency of departments to work in isolation without sharing information. | ch05 |
| **War Room** | A dedicated project space where all research and prototypes are displayed for the team. | ch08 |
| **Customer Journey** | The complete sequence of events and emotions a person experiences when interacting with a service. | ch07 |
| **Touchpoint** | Any individual point of contact between a customer and a brand. | ch07 |
| **Experience Map** | A visual tool used to track the emotional highs and lows of a user's experience. | ch07 |
| **Mythology** | The compelling narrative or 'origin story' created to give an innovation meaning. | ch10 |
| **Thought Bomb** | A collection of provocative trends and ideas used to inspire a team. | ch03 |
| **Zero20** | A specialized group focused on the 0-20 age range to find fresh, unedited perspectives. | ch01 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## The Vuja De Observation

**When to use:** When a team is too close to a problem and can't see new solutions.

**Recipe:**

1. Go to the site of the problem (the 'native habitat').
2. Adopt a 'beginner's mind' by ignoring your expertise.
3. Look for 'thoughtless acts' or hacks people are using to cope.
4. Record the 'why' behind the behavior, not just the 'what'.
5. Reframe the problem based on these observed human needs.

**Chapter:** ch01

---

## The Five-Minute Prototype

**When to use:** When a meeting is stuck in abstract debate about a feature.

**Recipe:**

1. Leave the room and find 'found art' (markers, tape, canisters).
2. Build the crudest possible physical representation of the idea.
3. Return and hand the object to the stakeholders.
4. Ask, 'Are you thinking of something like this?'
5. Use the physical object to drive concrete feedback.

**Chapter:** ch02

---

## The Implementation Experiment

**When to use:** When trying to introduce a new service to a resistant organization.

**Recipe:**

1. Avoid the word 'rollout' or 'permanent change'.
2. Ask a local team to 'put on an experiment' for a set period.
3. Provide two or more prototype approaches for them to choose from.
4. Let the local team adapt the experiment to their specific needs.
5. Gather data on the experiment's success to prove the value.

**Chapter:** ch02

---

## The Kid-Perspective Interview

**When to use:** When you need unedited, honest feedback on a concept.

**Recipe:**

1. Get down on their level (ask about their shoes).
2. Frame the project as 'top secret' to build engagement.
3. Ask what they would buy with $10 vs $100 to find what's 'cool'.
4. Ask for a 'house tour' to see how they actually use their things.
5. Get them laughing to lower their self-editing filters.

**Chapter:** ch01

---

## The Mistake Ritual

**When to use:** When a team is paralyzed by the fear of failure.

**Recipe:**

1. Acknowledge the mistake or failure openly.
2. Perform a symbolic act of 'clearing' (like flushing a toy toilet).
3. Briefly discuss the lesson learned from the failure.
4. Immediately pivot to the next experiment.
5. Reward the act of trying, not just the successful outcome.

**Chapter:** ch02

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- If the task feels overwhelming, shrink the prototype until it isn't.
- If an idea is stuck in a meeting, build a crude model immediately.
- Treat every service rollout as a temporary experiment to reduce friction.
- Fail often to succeed sooner.

## design

- Never ask a customer what they want; watch what they do when they think no one is looking.
- Look for the 'thoughtless acts'—they are the blueprints for your next innovation.
- Observe 'extreme users' to find insights the average person won't give you.
- Make your thinking visible by covering the walls in sketches and notes.

## writing

- Use the 'top secret' frame to get kids to reveal their true preferences.
- Don't just sell a product; tell the story of how it changes a life.
- A thirty-second video is often a better prototype than a fifty-page proposal.

## product

- Hire T-shaped people who are curious about fields outside their own.
- Use 'emotional stickers' to map how a user feels at every touchpoint.
- The Caretaker role is what keeps the customer coming back; don't ignore it.

## argument

- Replace the Devil's Advocate with a persona that builds rather than destroys.

## life

- If you want to change behavior, change the set design of the office.
- The best time to try something risky is when you have nothing to lose.

## general

- Keep a 'bug list' of everything that frustrates you in a day.
- If a team is missing a role, assign a member to 'wear that hat' for the day.
- Search for analogies in unrelated industries to solve your current problem.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.


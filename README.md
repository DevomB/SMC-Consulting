# SMC Website Mothership

This public repository is the source package for designing and building SMC's website. It deliberately separates public positioning from private club operations so a future implementation cannot accidentally publish personal contacts, internal assignments, or unverified company relationships.

## What SMC is becoming

SMC is best framed as an open SJSU community for ambitious problem-solvers, with higher-commitment project teams and leadership roles earned through demonstrated work. The organization helps students sharpen practical ability, meet serious peers, ship credible projects, and build relationships that continue after graduation.

Working positioning:

> **Ambition compounds.**
>
> SMC brings SJSU students who want to build, analyze, and grow into the same room.

This is an early-stage promise, not a claim that SMC already has elite placements, famous partners, or a mature consulting practice.

## Document map and authority

- [`LAUNCH_INPUTS.md`](./LAUNCH_INPUTS.md) owns approved facts, URLs, current states, hosting, and launch gates. Production is blocked while required values are unset.
- [`CONTENT.md`](./CONTENT.md) owns exact public wording and state-specific copy.
- [`DESIGN.md`](./DESIGN.md) owns product strategy, information architecture, visual behavior, interaction, and accessibility.
- [`WIREFRAMES.md`](./WIREFRAMES.md) owns the annotated desktop/mobile composition used for visual review.
- [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) owns technical architecture, validation, tests, and acceptance checks.

Truth and safety constraints apply across every file. If two files still conflict within the same concern, stop and ask an officer instead of guessing.

Private operations and contact playbooks live outside this public Git worktree. The ignored `internal/` path remains as defense in depth, but must not be used as permanent storage.

## Non-negotiables

1. Never claim a partnership, client, placement, testimonial, outcome, membership count, or founding date without written verification.
2. Do not publish the private contact pipeline or personal task assignments.
3. SMC membership must remain open to SJSU students while SMC operates as a recognized student organization. Project teams and leadership may use transparent, role-relevant selection criteria only after Student Involvement confirms the proposed structure.
4. Do not use SJSU marks, the Spartan head, proprietary typefaces, or language implying university endorsement without permission.
5. Sammy is the canonical campus events and membership surface. Do not build a second event-management system.
6. The website must remain compelling when all proof counters, client logos, testimonials, and project case studies are absent.
7. Premium means precise, restrained, fast, accessible, and truthful—not dark gradients, fake dashboards, or excessive animation.
8. This package is scaffold-ready. It is not approved for production launch until `LAUNCH_INPUTS.md` passes every required gate.

## Current recommendation

Use **SMC** as a working name until the officers settle the legal/public name. The strongest bridge from the existing math club is **Spartan Math Collective**. Reserve “consulting” for a later program or studio only after the organization is actually delivering scoped work for real partners.

The first launch should be one focused landing experience with `Join` and `Contribute` anchors, plus a truthful privacy page and a custom 404. A stable `/join` URL may redirect or resolve to the join section for flyers. Separate program, event, people, and work pages wait until real content exists. Events link to Sammy.

## How to hand this to a builder

Give the implementation agent the public repository, then instruct it to read `README.md`, `LAUNCH_INPUTS.md`, `CONTENT.md`, `DESIGN.md`, `WIREFRAMES.md`, and `IMPLEMENTATION.md` before writing code. The agent may create a neutral, noindexed scaffold while launch inputs are unset; it must not publish production output or invent missing facts.

Documentation status: **scaffold-ready strategy and design package; production launch inputs pending.** The public site is a noindexed Next.js preview. Officers edit `content/site.ts` after `LAUNCH_INPUTS.md` gates pass.

## Run and deploy

Requires Node 22+.

```bash
npm install
npm run dev
npm run build
npm start
```

Vercel: import the Git repo, Next.js preset, Node 22. No `vercel.json` is required. Do not add analytics or cookie env vars until `LAUNCH_INPUTS.md` approves collection. Preview canonical URLs may use `NEXT_PUBLIC_SITE_URL`; production origin and base path come from `content/site.ts`.

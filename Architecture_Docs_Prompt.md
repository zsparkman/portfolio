# Task: Generate Architecture Documentation for Portfolio

_Last generated: 2026-05-15 — initial prompt, tailored for the Next.js 16 portfolio repo with embedded `sites/` sub-projects._

## Role and Objective

You are operating inside the `/Users/zachsparkman/portfolio` directory, which is a **single Next.js 16 App Router repository** deployed to Vercel. Unlike the Political Window project (which is a parent dir of sibling repos), this is a single repo — but it embeds heterogeneous sub-projects under `sites/` (currently `sites/ctv-builder/` and `sites/rsn-yield-platform/`). Some sub-projects are trivial standalone artifacts (e.g., a single static HTML file); others are full nested codebases with their own `src/`, `scripts/`, `package.json`, and `CLAUDE.md`. The architecture documentation must capture both the host Next.js app and any **non-trivial** sub-project.

Your task is to produce:

1. **One required document:** `portfolio.architecture.md` in the repo root — describes the host Next.js app, its deployment, and how the embedded sub-projects relate to it.
2. **Zero or more sub-project documents:** for each non-trivial sub-project inside `sites/<slug>/`, write `sites/<slug>/<slug>.architecture.md` describing that sub-project on its own terms.
   - A sub-project is **non-trivial** if any of these apply: it has its own `package.json`, its own `src/` tree, its own build/deploy pipeline, its own data sources, or its own `CLAUDE.md` / `AGENTS.md`.
   - A sub-project is **trivial** if it's a single static artifact (e.g., a one-file `index.html` with bundled assets and no build step). For trivial sub-projects, do **not** create a separate doc — instead document them in a short subsection of the host doc (under §4 Directory Layout or §14 Sub-project catalog).

These documents will be fed back to a separate Opus session as grounding context for future code changes. Accuracy matters more than prose quality. **A short, correct doc is far more valuable than a long, partially-fabricated one.**

---

## File Naming Convention (MANDATORY)

Every architecture document **must** use the prefixed naming pattern `<directory-slug>.architecture.md` so that a chat instance of Claude can identify which scope a file describes from its filename alone (without opening it). Do **not** create or leave any file simply named `architecture.md`.

| Location | File name |
|---|---|
| Repo root (`/Users/zachsparkman/portfolio/`) | `portfolio.architecture.md` |
| Sub-project inside `sites/<slug>/` | `<slug>.architecture.md` |

Rules of thumb when generalizing to a new sub-project:

- The prefix is the sub-project directory's slug, lowercased, with a `.architecture.md` suffix.
- Hyphens in the slug are preserved (`rsn-yield-platform/` → `rsn-yield-platform.architecture.md`).
- Never use spaces or uppercase letters in the prefix.

If you encounter a legacy file named `architecture.md` (no prefix), rename it to the correct prefixed form before editing — do not leave both versions on disk.

---

## Operating Principles (Read Before Starting)

### 1. Discover, don't assume
Do not write a single line of architecture documentation until you have actually inspected the codebase. Specifically, for the host repo and for each non-trivial sub-project, before writing anything:

- List the top-level directory contents
- Read `package.json` (or equivalent manifest) in full
- Read `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `instrumentation-client.ts`, `.env.local` (note **variable names only, never values**), `.vercel/project.json` if present
- Identify the entry point(s) — for Next.js App Router, that's `src/app/layout.tsx` and the route segments under `src/app/`
- Identify rendering strategy per route (Server Components vs Client Components, static vs dynamic, streaming, ISR, `use cache` directives)
- Identify external service integrations by searching for API clients, fetch calls, and SDK imports (e.g., `posthog-js`, any Vercel SDKs, any database clients)
- Identify the deployment target by checking `.vercel/` and `next.config.ts` settings (especially `output: 'export'` which would imply a static export rather than the standard Vercel runtime)

### 2. Mark unknowns explicitly
If you cannot determine something from the code, write `**UNKNOWN — [brief reason]**` rather than guessing. Examples:
- `**UNKNOWN — instrumentation-client.ts references POSTHOG_KEY but no .env.example documents required vars**`
- `**UNKNOWN — sites/ctv-builder/index.html ships a bundled SPA; no source files to trace its build pipeline**`

This is more useful than a confident wrong answer. The user has explicitly stated that hallucinated detail in architecture docs causes downstream failures.

### 3. Cite file paths for every non-trivial claim
When you describe a behavior, name the file (and ideally line range) where it lives. Example: `PostHog initialization lives in instrumentation-client.ts (called once per browser session)`. This makes the doc auditable and lets future sessions jump straight to the relevant code.

### 4. Do not modify any code
This task is read-only except for creating the architecture files specified above. Do not run migrations, do not install packages, do not create branches, do not run `next build`. If you need to run code to understand behavior, ask the user first.

### 5. Order of operations
Write each sub-project's `<slug>.architecture.md` **first** (working from leaf to root), then write the host `portfolio.architecture.md` last, so it can reference the sub-project docs by their filenames rather than duplicate their content.

---

## Required Structure for Each Sub-Project `<slug>.architecture.md`

Use this exact section ordering. Omit a section only if it is genuinely not applicable, and say so explicitly.

```markdown
# [Sub-project Name] — Architecture

_Last generated: [date]_
_Last revised: [date — one-line summary of what was amended]_   <!-- omit on first generation; add a new line per amendment, leaving "Last generated" untouched -->
_Generated by: Claude Code (Opus)_
_Source of truth: this sub-project at commit [hash if available]_

## 1. Purpose
One paragraph. What does this sub-project do? Where does it live in the host portfolio? Is it surfaced as a route, an embedded iframe, a standalone deployment, or a static artifact?

## 2. Tech Stack
- Language / runtime version
- Framework(s) and version
- Build tool (Vite? Next.js? plain HTML? something else?)
- Notable libraries that materially shape behavior
- Whether it shares any dependencies with the host portfolio or runs entirely independently

## 3. Entry Points and Boot Sequence
What file is the entry? For a Next.js sub-project, the App Router root. For a Vite/SPA, the `main.tsx`/`index.html`. For a static artifact, the single HTML file and what it bundles.

## 4. Directory Layout
A tree of the top 2 levels of meaningful directories. For each: one line on contents.

## 5. Data Model / Data Sources
Where does this sub-project get its data? Bundled JSON files in `data/`? Live API calls? Hardcoded constants? `**UNKNOWN**` if untraced.

## 6. External Integrations
For each external service: name, purpose, auth pattern (env var name, header), file location of the integration code.

## 7. Page/Route Map (if applicable)
For sub-projects that have routes, list them with what each renders and fetches.

## 8. Build, Test, and Deploy
- How is this built locally? (commands from package.json scripts)
- Are there tests? Where? How are they run?
- How is it deployed? Is it deployed independently or as part of the host portfolio? Is the build artifact committed (e.g., a built `out/` or a single HTML file)?

## 9. Relationship to Host Portfolio
- How is this sub-project surfaced from the host (link, iframe, static asset, side-deployed subdomain)?
- Does it inherit any styles, fonts, or analytics from the host, or is it fully self-contained?
- Are env vars shared, or does the sub-project have its own `.env`?

## 10. Known Quirks and Gotchas
TODO comments, workarounds, brittle assumptions. Be specific — file and line.

## 11. Open Questions for the Maintainer
Things you couldn't resolve from the code alone.
```

---

## Required Structure for the Host `portfolio.architecture.md`

```markdown
# Portfolio — Architecture

_Last generated: [date]_
_Last revised: [date — one-line summary]_   <!-- omit on first generation; add per amendment; never overwrite "Last generated" -->
_Generated by: Claude Code (Opus)_
_Source of truth: this repository at commit [hash if available]_

## 1. Purpose
One paragraph. What is the portfolio site? Who is it for? What top-level surfaces does it ship (about page, project showcase, the embedded `sites/` sub-projects, etc.)?

## 2. Tech Stack
- Node version (from `package.json` engines, `.nvmrc`, or similar — mark `**UNKNOWN**` if neither present)
- Next.js version (from `package.json`)
- React version
- TypeScript version
- Tailwind version
- Notable libraries (e.g., `posthog-js`, `@next/third-parties`)
- Hosting / deployment target (Vercel — verify via `.vercel/` directory and `next.config.ts`)

## 3. Entry Points and Boot Sequence
- The Next.js entry: `src/app/layout.tsx` (root layout) and `src/app/page.tsx` (root page)
- Any provider hierarchy in the root layout (analytics, theming, etc.)
- The `instrumentation-client.ts` file — what it instruments and when it runs
- Build/dev commands from `package.json` scripts

## 4. Directory Layout
A tree of the top 2 levels of meaningful directories (skip `node_modules`, `.next`, `out`, `.vercel`, `.git`). For each: one line on what it contains. Include:
- `src/app/` — App Router routes
- `src/components/` — shared components
- `sites/` — embedded sub-projects (enumerate each and link to its `<slug>.architecture.md` if non-trivial, or describe inline if trivial)
- `public/` — static assets

## 5. Route Map
List every route under `src/app/`. For each:
- Path (e.g., `/`, `/portfolio`, `/portfolio/[slug]`)
- Whether it's a Server Component, Client Component, or mixed
- Rendering strategy: static (`force-static`), dynamic (`force-dynamic`), default, or using `use cache` directives
- What data it fetches and from where
- Any layouts that wrap it

## 6. Sub-project Catalog
Enumerate each entry under `sites/`. For each:
- Slug and one-line purpose
- Whether it's a non-trivial sub-project (with its own `<slug>.architecture.md`) or a trivial artifact (single file, no build)
- How the host surfaces it (route link, iframe, subdomain, static export, etc.)

This is the host-doc analog of the per-sub-project §1; the detailed shape lives in each sub-project's own architecture file.

## 7. External Integrations
For each external service the host portfolio talks to:
- Service name (e.g., PostHog, Vercel Analytics, Vercel AI Gateway)
- Purpose
- How auth is handled (env var name; never the value)
- Where in the code the integration lives (file path)

## 8. Configuration and Secrets
List environment variables the host reads (grep for `process.env.` and `NEXT_PUBLIC_`). For each: name, purpose, where it's used, whether a default exists. **Never echo actual values from `.env.local` or any other source.** List only variable names and purposes.

Call out specifically:
- Which vars are `NEXT_PUBLIC_*` (exposed to the browser) vs server-only
- Which vars are auto-provisioned by a Vercel Marketplace integration (if any)

## 9. Build, Test, and Deploy
- Local dev: which command (`next dev` via `npm run dev`)
- Production build: `next build`, output target (standard Vercel runtime vs static `output: 'export'`)
- Test framework: if none exists, say so explicitly
- Vercel deployment: production vs preview branch mapping, framework preset, build settings (cite `.vercel/project.json` or the Vercel dashboard if findable)

## 10. Analytics and Observability
- PostHog: confirm `instrumentation-client.ts` is the loader; note whether it's product analytics, session replay, error tracking, or some combination
- Any other observability surfaces (Vercel Speed Insights, Sentry, etc.)
- Where event/exception capture lives in the code

## 11. Styling System
- Tailwind v4 (per `package.json`) — note any custom theme tokens, the global stylesheet (`src/app/globals.css`), and how PostCSS is wired (`postcss.config.mjs`)
- Font loading (e.g., `next/font`, hosted, or system)
- Any design system or component library in use

## 12. Known Quirks and Gotchas
Anything in the code that looks intentional but non-obvious. TODO comments, workarounds, brittle assumptions, dependency pins. Be specific — file and line.

## 13. Open Questions for the Maintainer
Things you couldn't resolve from the code alone.

## 14+. Repeatable patterns (CONDITIONAL — add only when the repo hosts one)
Use a §14 (and §15, §16, …) for any **cross-cutting reusable pattern** the repo implements that is too substantial to live inside another section. Each repeatable-pattern section should document the abstraction itself, not a specific instance: concept, type variants, config schema (with concrete fields), the surfaces or views the pattern ships, data resolution per variant, visual primitives or UI conventions if applicable, onboarding for a new instance, and roadmap.

**Note on this repo specifically:** the `sites/` directory **may or may not** constitute a repeatable pattern depending on what you find. As of this prompt's writing, the two sub-projects under `sites/` are heterogeneous (one is a 1.3M standalone HTML, the other is a full nested codebase) — they share a parent directory but not an architectural contract. Use §14 **only** if you discover (a) a written or de-facto convention that a new sub-project should follow (e.g., "every sub-project must export a single HTML to `out/` and be linked from `/projects`"), AND (b) more than one instance demonstrably follows that convention. Otherwise, document each sub-project individually under §6 Sub-project Catalog and skip §14.

If you do write §14, the documentation should cover: the slug naming rule, where the sub-project's build artifact is expected to land, how the host links to it, what env vars (if any) the sub-project may consume from the host, and the onboarding steps for adding a new sub-project.
```

---

## Stop Conditions and Sanity Checks

Before finalizing each file, verify:

- [ ] Every concrete claim cites a file path
- [ ] Every "this is how it works" statement is something I could verify by opening the cited file
- [ ] Sections I couldn't fill are marked `**UNKNOWN**` with a reason, not invented
- [ ] No code was modified
- [ ] Each file uses the prefixed name `<slug>.architecture.md` — no plain `architecture.md` files were created or left behind
- [ ] The host doc references each non-trivial sub-project doc by its prefixed filename rather than duplicating its content
- [ ] Environment variable values are never echoed, only names and purposes — even values found in `.env.local`, `.env`, or any committed env file
- [ ] If an existing architecture file is being **regenerated** (not first-generated), preserve any `_Last revised:_` lines and any §14+ "Repeatable patterns" sections — they capture amendments and cross-cutting abstractions that the regenerator would otherwise erase. Append a new `_Last revised:_` line summarizing the regeneration; keep prior ones as history. If a §14+ section's pattern still exists in the code, refresh its content rather than deleting it; if the pattern has been retired, mark the section "DEPRECATED — superseded by [pointer]" instead of removing it outright.

## Output

Write all files in place. After writing them, output a brief summary listing:

1. The file paths created (one host doc + zero or more sub-project docs)
2. Any sections that came out as `**UNKNOWN**` and why — these are the highest-priority follow-ups for the maintainer
3. Any inconsistencies you noticed (e.g., sub-project README claims a feature that the code doesn't implement, env vars referenced but not documented, dead code that contradicts active code)
4. Whether you decided to write a §14 "Repeatable patterns" section, and the reasoning either way

Do not commit, do not push. Leave the working tree dirty for the maintainer to review.

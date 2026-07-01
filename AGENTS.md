# AGENTS.md

This file follows the AGENTS.md convention: a README for automated coding agents. Start here before changing code, then read `README.md`, package manifests, configs, and any nested `AGENTS.md` files that apply to the files you touch.

## Project Snapshot

- Repository: `nodelabs-case-study`
- Root: `C:\Users\musta\Desktop\projects\nodelabs-case-study`
- Detected stack: PNPM workspace, Next.js, React
- JavaScript package runner: `pnpm`
- Project-local skills: none detected at `.agents/skills`.

## Working Rules

- Prefer the nearest `AGENTS.md` in the directory tree; nested files narrow or override this root guidance.
- Keep edits scoped to the requested behavior. Avoid repo-wide refactors unless the task clearly requires them.
- Inspect existing patterns before adding new abstractions, dependencies, scripts, or file layouts.
- Do not edit generated files, lockfiles, environment files, or build artifacts unless the change specifically requires it.
- Do not commit, push, or run destructive commands unless the user explicitly asks.

## Setup And Commands

- Install dependencies: `pnpm install`

Common commands detected from project files:

- dev: `pnpm dev`
- start: `pnpm start`
- build: `pnpm build`
- lint: `pnpm lint`
- lint:fix: `pnpm lint:fix`
- format: `pnpm format`
- check-types: `pnpm check-types`
- orval: `pnpm orval`

## Validation

- Run the most relevant checks for the files you changed: tests, lint, typecheck, build, format check, or framework-specific validation.
- Prefer targeted checks first, then broader checks when the change crosses packages, apps, or shared contracts.
- If a validation command fails because of unrelated existing issues, report the command and the unrelated failure clearly.

<!-- BEGIN:codex-shared-skill-usage -->
## Shared Codex Skill Usage

This section supplements any repository-specific guidance in this file. AGENTS.md is treated as a README for automated coding agents: read it before editing, use the nearest nested AGENTS.md when one exists, and keep instructions local to the files you touch.

### Skill Selection Rules

- If the user names a skill, use that skill for the turn and read its `SKILL.md` before taking action.
- Prefer the most specific applicable skill. Repository-local `.agents/skills` beat global skills; framework-specific skills beat broad language skills.
- Use one primary skill first. Add another only when the task genuinely spans multiple domains.
- Setup, installer, migration, and creator skills are for those workflows only; do not use them for routine feature work.
- If a skill source is missing or cannot be read, say so briefly and continue with the best available approach.

### Global Skills

- `imagegen`: use for generating or editing raster images, illustrations, textures, sprites, mockups, and transparent-background bitmap assets. Do not use for repo-native SVGs, icons, CSS, or code-built visuals.
- `openai-docs`: use for current OpenAI API, model, SDK, product, migration, or prompt-upgrade questions. Use official OpenAI sources and cite them when answering.
- `plugin-creator`: use when creating or scaffolding a Codex plugin, including `.codex-plugin/plugin.json`, plugin folders, and marketplace metadata.
- `skill-creator`: use when creating or updating a Codex skill with a `SKILL.md`, workflow guidance, references, scripts, or assets.
- `skill-installer`: use when listing curated skills or installing a skill into `$CODEX_HOME/skills` from a curated source or GitHub repo.
- `browser:browser`: use for in-app browser automation, local app testing, screenshots, UI inspection, clicking, typing, or verifying localhost and web pages.
- `documents:documents`: use for creating, editing, redlining, or verifying `.docx`, Word, or Google Docs-targeted documents. Render and visually verify before delivery.
- `find-skills`: use when the user asks whether a skill exists, asks how to extend capabilities, or wants to discover/install a skill for a task.
- `presentations:Presentations`: use for creating or editing PowerPoint `.pptx` decks, slide layouts, speaker notes, and presentation artifacts.
- `spreadsheets:Spreadsheets`: use for `.xlsx`, `.xls`, `.csv`, `.tsv`, or Google Sheets-targeted work involving formulas, formatting, charts, tables, cleanup, or analysis.
<!-- END:codex-shared-skill-usage -->

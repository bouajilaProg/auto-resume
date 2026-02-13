# Agent Guidelines for AutoResume

This document provides operational and style guidance for agentic tools working in this repository.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`
- Typecheck: `npm run lint` (Next.js + ESLint handles TS rules here)
- Tests: none configured (no test script in `package.json`)
- Single test: not available (set up a test runner first)

## Repository Layout

- `app/`: Next.js App Router pages and API routes.
- `app/sections/`: Section-specific editor pages.
- `app/main/`: Editor + preview layout.
- `hooks/`: Section hooks and editor state logic.
- `types/resumeTypes/`: Zod schemas + shared types.
- `constants/`: Shared constants (sections, labels, icons).
- `temp/`: Mock or development artifacts (treat as non-prod).

## Frontend Stack

- Next.js App Router, React 19, TypeScript strict mode.
- Styling: Tailwind CSS v4.
- Icons: `lucide-react` (primary) and `react-icons` for brands.
- Persistence: localStorage via hooks (`useResumeSectionData`, `useResumeEditor`).
- PDF generation: `bouajila-resume-generator` (server route).

## Code Style and Conventions

### Imports

- Order imports: React/Next, third-party, local absolute, relative.
- Prefer absolute aliases:
  - `@/` for repo root.
  - `@hooks/` for `hooks/`.
  - `@types/` points to `./temp/types/*` (legacy; avoid unless required).
- Keep import blocks compact and deterministic.

### Formatting

- Double quotes for strings and imports.
- 2-space indentation (match existing files).
- Use trailing commas where the file already uses them.
- Keep lines reasonably short; avoid overly long JSX props lines.

### Naming

- Components: PascalCase (`EducationForm.tsx`).
- Hooks: camelCase, `useX` (`useProjects.ts`).
- Types: PascalCase, schemas end with `Schema`.
- Constants: SCREAMING_SNAKE_CASE (`SECTION_LABELS`).

### Types and Data Modeling

- Prefer Zod schemas as the source of truth in `types/resumeTypes/`.
- Derive TS types via `z.infer`.
- Avoid `any`. If unavoidable, contain it and add a note.
- Use `SectionType`/`SectionTypeValue` from `types/resumeTypes`.

### Error Handling

- API routes: wrap in `try/catch`, return `NextResponse.json` with status.
- UI: handle missing data with optional chaining or default empty states.
- Avoid throwing in render paths.

### State Management

- Use hooks in `hooks/ResumeSections/` for CRUD logic.
- Persist edits through `useResumeSectionData` and `useResumeEditor`.
- When updating nested state, avoid direct mutation; use copies.

### UI/UX

- Keep section editors consistent in layout and controls.
- Use existing design patterns (cards, dashed empty states, indigo accents).
- Avoid introducing new design systems without agreement.

## PDF / Resume Generation

- Server compile route: `app/api/compile/route.ts`.
- Generator package: `bouajila-resume-generator`.
- Section ordering and filtering happens in `useResumeEditor`.
- If a section is not appearing in output, verify:
  - `activeConfig.selectedItems` includes it.
  - `assembledResume` includes the section body.
  - Generator supports the section in `ResumeBuilder`.

## Lint Rules

- ESLint config in `eslint.config.mjs` uses Next.js core-web-vitals + TS.
- Default ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Local Rules Files

- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` present.

## Best Practices for Agents

- Prefer `Read`/`Edit` tools for file operations.
- Avoid destructive git commands.
- Do not amend commits unless explicitly requested.
- Keep changes scoped to the request.
- When changing section metadata, update `constants/sections.ts`.
- If adding a new section:
  - add to `SectionType` and schema in `types/resumeTypes/resumeItem.ts`.
  - add defaults in `types/resumeTypes/defaults.ts` and config.
  - add UI in `app/sections/<section>`.

## Known Gaps

- No automated tests. If you add a test runner, update this file.
- README mentions MongoDB, but current persistence is localStorage.

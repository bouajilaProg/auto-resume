# Agent Guidelines for AutoResume

This document guides agentic coding tools working in this repository. Keep it concise, follow existing patterns, and prefer small, focused changes.

## Build, Lint, Test Commands

Primary (pnpm):
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start (prod): `pnpm start` (serves on port 16000)
- Lint: `pnpm lint`
- Typecheck: `pnpm exec tsc --noEmit` (manual; not in scripts)

Tests:
- Tests: none configured
- Single test: not available
- If you add a test runner, update this file and README.md

Docker:
- Build image: `pnpm docker:build`
- Run image: `pnpm docker:run`

## Repository Layout

- `app/`: Next.js App Router pages, layouts, and API routes.
- `app/sections/`: Section editor pages and section-specific components.
- `app/main/`: Editor + preview layout.
- `components/`: Shared components (modal, sidebar, loading, etc.).
- `context/`: Context providers (modal, etc.).
- `hooks/`: Editor state and section CRUD logic.
- `types/resumeTypes/`: Zod schemas, shared types, defaults.
- `constants/`: Section labels, icons, and paths.
- `public/`: Assets and icons.

## Frontend Stack

- Next.js App Router, React 19, TypeScript strict mode.
- Styling: Tailwind CSS v4 (via `@import "tailwindcss"`).
- Icons: `lucide-react` (primary) and `react-icons` (brands).
- Persistence: localStorage via `useResumeSectionData` and `useResumeEditor`.
- PDF generation: `bouajila-resume-generator` via `app/api/compile/route.ts`.

## Code Style and Conventions

### Imports

- Import order: React/Next, third-party, local absolute (`@/`), relative.
- Prefer absolute aliases:
  - `@/` for repo root.
  - `@hooks/` for `hooks/`.
  - `@types/` points to `./temp/types/*` (legacy; avoid unless required).
- Keep import blocks compact and deterministic.
- Separate type-only imports when practical: `import type { Foo } from "..."`.

### Formatting

- Double quotes for strings and imports.
- 2-space indentation.
- Use trailing commas where present in file.
- Keep lines reasonably short; split long JSX props into one-per-line.

### Naming

- Components: PascalCase (`EducationForm.tsx`).
- Hooks: camelCase, `useX` (`useProjects.ts`).
- Types: PascalCase, schemas end with `Schema`.
- Constants: SCREAMING_SNAKE_CASE (`SECTION_LABELS`).
- Files: match component or hook name.

### Types and Data Modeling

- Zod schemas are the source of truth in `types/resumeTypes/`.
- Derive TS types via `z.infer` when possible.
- Avoid `any`. If unavoidable, contain it and document why.
- Use `SectionType`/`SectionTypeValue` from `types/resumeTypes`.
- Keep section defaults in sync with schemas and config.

### Error Handling

- API routes: wrap in `try/catch`, return `NextResponse.json` with status.
- UI: handle missing data with optional chaining or default empty states.
- Avoid throwing in render paths.
- Log unexpected API errors with context for debugging.

### State Management

- Use hooks in `hooks/ResumeSections/` for CRUD logic.
- Persist edits through `useResumeSectionData` and `useResumeEditor`.
- Avoid direct mutation when updating nested state.
- Keep derived state in selectors or memoized helpers, not local state.

### UI/UX

- Keep section editors consistent in layout and controls.
- Use existing design patterns (cards, dashed empty states, primary accents).
- Avoid introducing new design systems without agreement.
- Prefer Tailwind utilities over new custom CSS.

### Accessibility

- Use semantic HTML elements where possible.
- Ensure form controls have labels and accessible names.
- Keep color contrast readable for text in previews.

## PDF / Resume Generation

- Compile route: `app/api/compile/route.ts`.
- Generator: `bouajila-resume-generator`.
- Section ordering and filtering happens in `useResumeEditor`.
- If a section is missing in output, verify:
  - `activeConfig.selectedItems` includes it.
  - `assembledResume` includes the section body.
  - Generator supports the section in `ResumeBuilder`.

## Lint Rules

- ESLint config in `eslint.config.mjs` uses Next.js core-web-vitals + TS rules.
- Default ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Local Rules Files

- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` present.
- If added later, mirror their guidance here.

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
- Do not introduce new dependencies without calling it out.

## Known Gaps

- No automated tests yet; add a runner and document if needed.
- Persistence is localStorage (not MongoDB).

## Working Agreements

- Keep changes consistent with existing patterns in `app/sections/` editors.
- Avoid reorganizing folder structure without request.
- If a change touches API routes, verify expected response shape.
- If you add a new script or test runner, update this file and README.md.

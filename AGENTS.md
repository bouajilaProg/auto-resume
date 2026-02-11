# Agentic Guidelines for AutoResume

This document provides essential instructions for AI agents operating within the AutoResume codebase.

## 🛠 Build & Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev**: `npm run dev`
- **Test**: No testing framework is currently configured. Before adding tests, verify the preferred library (e.g., Vitest or Jest).

## 📁 Code Structure

- `app/`: Next.js App Router pages and API routes.
- `app/sections/`: UI for editing specific resume parts (Education, Experience, etc.).
- `hooks/`: Custom React hooks for state management and data fetching.
- `types/resumeTypes/`: Centralized Zod schemas and TypeScript types (inferred from schemas).
- `features/converterEngine/`: Logic for generating Typst source code and converting to PDF.

## 🎨 Code Style & Conventions

### 1. TypeScript & Types
- **Always use TypeScript**. Avoid `any` at all costs.
- **Single Source of Truth**: Define data structures using Zod schemas in `types/resumeTypes/`. 
- **Type Inference**: Infer TypeScript types from Zod schemas:
  ```typescript
  export const MySchema = z.object({ ... });
  export type MyType = z.infer<typeof MySchema>;
  ```
- **Path Aliases**: Use `@/` for project root and `@types/` for `types/resumeTypes/`.

### 2. Components & Styling
- **React Components**: Prefer Functional Components with `use client` or `use server` directives as appropriate.
- **Styling**: Use **Tailwind CSS**. Follow the existing "modern & clean" aesthetic (rounded-xl, indigo accents, gray text).
- **Icons**: Use `lucide-react` for standard UI icons and `react-icons/fa` for social brands.

### 3. State Management & Hooks
- Use custom hooks (in `hooks/`) to encapsulate logic for specific resume sections.
- Hooks should handle CRUD operations and interface with `useResumeSectionData` for persistence.
- **Persistence**: Currently uses local storage/mock data. Check `hooks/useResumeSectionData.ts` before modifying persistence logic.

### 4. Imports & Formatting
- **Imports**: Organize imports by: React/Next.js, external libraries, local components, local hooks/types.
- **Naming**: 
  - Components: PascalCase (e.g., `EducationForm.tsx`)
  - Hooks: camelCase starting with `use` (e.g., `useEducation.ts`)
  - Schemas: PascalCase ending in `Schema` (e.g., `EducationItemSchema`)

### 5. Error Handling
- **API Routes**: Wrap logic in `try...catch` and return standard `NextResponse.json` with appropriate status codes.
- **Frontend**: Use optional chaining and nullish coalescing to handle potentially missing resume data.

## 🚀 PDF Generation
- The engine uses **Typst** for PDF generation. 
- Templates are located in `features/converterEngine/templates/`. 
- Logic for mapping JSON to Typst markup is in `features/converterEngine/generate.ts`.

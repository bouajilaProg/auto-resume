
[![GitHub stars](https://img.shields.io/github/stars/bouajilaprog/auto-resume?style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume) [![Issues](https://img.shields.io/github/issues/bouajilaprog/auto-resume?style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume/issues) [![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)](LICENSE) [![Build Status](https://img.shields.io/github/actions/workflow/status/bouajilaprog/auto-resume/ci.yml?branch=main&style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume/actions)

# AutoResume

Version 1.2.0-stable | License: MIT | Type: Productivity / Web

Owner: `bouajilaprog`

AutoResume is a data-driven resume manager for professionals who need multiple, tailored CVs from a single source of truth. Toggle nodes (projects, roles, skills) and generate high-quality PDFs with Typst-based rendering — no copy/paste required.

Table of contents

- About
- Features
- Technical stack
- Setup
- Development
- Docker
- Roadmap
- Contributing

About

AutoResume focuses on flexible content orchestration and reproducible, type-safe data. It stores your resume data locally by default and compiles polished PDFs using the bouajila-resume-generator + Typst.

Features

- Dynamic content orchestration: include/exclude nodes (projects, skills, roles) to create role-specific CVs quickly.
- Typst-based rendering: LaTeX-quality typesetting with faster compile times and modern syntax.
- Local-first privacy: data persists in `localStorage` unless you explicitly export or sync it.
- Type-safe schemas: Zod validation keeps data consistent and portable.
- Production-ready Dockerfile: container maps to port 16000 to avoid common macOS port conflicts.

Technical stack

| Component   | Technology                                   |
|-------------|-----------------------------------------------|
| Framework   | Next.js (App Router)                         |
| Language    | TypeScript                                   |
| Styling     | Tailwind CSS v4                              |
| PDF Engine  | Typst (via bouajila-resume-generator)        |
| Validation  | Zod                                          |

Setup

Requirements

- Node.js v18.0.0 or higher
- Typst (system-level install required for local PDF generation)
- pnpm (preferred package manager)

Local development

Run the app locally:

```bash
git clone https://github.com/your-repo/auto-resume.git
cd auto-resume
pnpm install
pnpm dev
```

The app will be available at: http://localhost:3000

Docker

Build and run the container (maps to port 16000 by default):

```bash
pnpm docker:build
pnpm docker:run
```

Repository roadmap

- [x] Tailwind CSS v4 integration
- [x] Dockerized Typst environment
- [ ] Multi-template support (Academic vs. Industry)
- [ ] Remote storage sync (Supabase / Firebase)

Contributing

This repository is optimized for agentic workflows and automated refactoring. Please read `AGENTS.md` for contribution conventions (naming, hooks, and TypeScript rules). When adding new sections, follow the patterns in `types/resumeTypes/` and `app/sections/`.

Next steps / tips

1. Run `pnpm lint` and `pnpm exec tsc --noEmit` before opening a PR.
2. If you add a new resume section, update `constants/sections.ts` and the Zod schemas in `types/resumeTypes/`.
3. For PDF troubleshooting, verify your local Typst installation is available on PATH.

License

MIT

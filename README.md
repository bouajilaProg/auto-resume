
[![GitHub stars](https://img.shields.io/github/stars/bouajilaprog/auto-resume?style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume) [![Issues](https://img.shields.io/github/issues/bouajilaprog/auto-resume?style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume/issues) [![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)](LICENSE) [![Build Status](https://img.shields.io/github/actions/workflow/status/bouajilaprog/auto-resume/ci.yml?branch=main&style=flat&logo=github)](https://github.com/bouajilaprog/auto-resume/actions) [![TypeScript](https://img.shields.io/badge/TypeScript-%234785CC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![npm](https://img.shields.io/npm/v/bouajila-resume-generator?style=flat&logo=npm)](https://www.npmjs.com/package/bouajila-resume-generator)

# AutoResume

License: MIT

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
| PDF Engine  | bouajila-resume-generator (Typst-based, published package) |
| Validation  | Zod                                          |

Setup

Requirements

- Node.js v20.11.0 or higher
- Typst (system-level install required for local PDF generation)
- pnpm (preferred package manager)

Local development

Run the app locally:

```bash
git clone https://github.com/bouajilaprog/auto-resume.git
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

- [x] Dockerized Typst environment
- [ ] Multi-template support (Academic vs. Industry)
- [ ] Remote storage sync
- [x] Hosted web version
- [ ] Resume duplication (clone + variant workflows)
- [ ] AI-assisted resume creation from existing data

Contributing

This repository is optimized for agentic workflows and automated refactoring. Please read `AGENTS.md` for contribution conventions (naming, hooks, and TypeScript rules). When adding new sections, follow the patterns in `types/resumeTypes/` and `app/sections/`.

Next steps / tips

1. Run `pnpm lint` and `pnpm exec tsc --noEmit` before opening a PR.
2. If you add a new resume section, update `constants/sections.ts` and the Zod schemas in `types/resumeTypes/`.
3. For PDF troubleshooting, verify your local Typst installation is available on PATH.

License

MIT

Mobile installation and downloads

- Open the app over HTTPS, then use your browser's Install app / Add to Home Screen option. In Safari on iPhone, use Share → Add to Home Screen.
- Tap a resume to generate its saved active version. Download opens native file sharing when available (including Save to Files on iPhone); Open PDF provides a browser fallback.
- Resume data stays in this browser's local storage. Installing the app does not transfer resumes from another phone or computer; use JSON export/import on desktop to transfer data.
- Successful PDFs are cached locally using a SHA-256 hash of their content (up to 20 PDFs / 20 MB). Changed content generates a new PDF. Browser storage restrictions fall back to an in-memory cache; generating a new PDF still requires the server.

Browser behavior follows the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) and [web app installation requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

# AutoResume 🚀

**AutoResume** is a modern, smart resume builder designed for multidisciplinary professionals. It empowers you to maintain a comprehensive master list of your experiences and selectively export tailored resumes for specific roles.

## ✨ Features

- **Selective Content Selection:** Effortlessly toggle which projects, skills, and work experiences appear on your generated resume.
- **Instant PDF Export:** Generate high-quality, professional PDFs using the \`bouajila-resume-generator\`.
- **Responsive Editor:** Real-time preview and intuitive section-based editing.
- **Local-First Persistence:** Your data stays in your browser via \`localStorage\` for privacy and speed.
- **Tailwind CSS v4:** Clean, modern UI with a focus on usability.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State & Validation:** [Zod](https://zod.dev/) for schemas, React Hooks for state management.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **PDF Engine:** \`bouajila-resume-generator\`

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (Recommended)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-repo/auto-resume.git
cd auto-resume

# Install dependencies
pnpm install
\`\`\`

### Running Locally

\`\`\`bash
# Start the development server
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- \`app/\`: Next.js pages and API routes.
- \`app/sections/\`: Individual resume section editors.
- \`app/main/\`: Core editor and preview layout.
- \`hooks/\`: Custom hooks for data persistence and section logic.
- \`types/resumeTypes/\`: Zod schemas and TypeScript definitions.
- \`constants/\`: Global configurations, labels, and icons.

## 🤖 Agentic Coding

This repository is optimized for agentic workflows. For detailed guidelines on code style, commands, and repository conventions, please refer to [AGENTS.md](./AGENTS.md).

## 📄 License

MIT © [Bouajila](https://github.com/bouajila)

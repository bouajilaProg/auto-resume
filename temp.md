# AutoResume 📝

AutoResume is a high-performance, interactive resume builder built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It allows users to manage multiple resume versions, customize section ordering, and generate polished PDFs in real-time.

## 🚀 Features

- **Multiple Versions**: Create, duplicate, and manage different versions of your resume for specific job applications.
- **Live PDF Preview**: Instant feedback as you type, powered by a dedicated server-side compilation engine.
- **Modular Sections**: Easily toggle and reorder sections including Experience, Education, Projects, Skills (Technical, Soft, and Languages), Certifications, and more.
- **Smart Persistence**: Automatic local persistence ensures your progress is never lost while maintaining privacy.
- **Modern UI/UX**: A clean, accessible interface with indigo accents and smooth transitions.
- **Docker Ready**: Fully containerized for easy deployment.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **State Management**: React Context + Specialized Hooks
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: `bouajila-resume-generator`
- **Validation**: [Zod](https://zod.dev/)

## 📦 Deployment

The project includes GitHub Actions for automated Docker builds. To deploy your own instance:

1. Add `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` to your GitHub Repository Secrets.
2. Push to the main branch to trigger the build.

---
*Created by [bouajilaProg](https://github.com/bouajilaProg)*

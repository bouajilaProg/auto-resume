import { ContactType, DegreeType, Resume, skillType } from "@/types/resumeTypes";
// --- Mock Data (Personalized) ---
export const myResume: Resume = {
  name: "Bouajila",
  description: "Full-Stack Developer (React & NestJS)",
  template: "basic-resume",
  lastUpdate: "2025",

  personalInfo: {
    name: "Bouajila",
    location: "Tunisia (Remote-friendly)",
    description:
      "Computer Science bachelor graduate passionate about building clean, reusable systems and scalable web applications.",
    contact: [
      { id: 1, type: ContactType.Email, value: "your.email@example.com" },
      { id: 2, type: ContactType.GitHub, value: "github.com/yourusername" },
      {
        id: 3,
        type: ContactType.LinkedIn,
        value: "linkedin.com/in/yourusername",
      },
    ],
    hobbies: ["Learning", "Innovation", "Woodworking", "Fitness"],
  },

  educations: [
    {
      id: 1,
      degreeType: DegreeType.BS,
      degreeName: "Computer Science",
      institution: "ISIMM",
      startDate: "2021",
      endDate: "2024",
    },
  ],

  experiences: [
    {
      id: 1,
      jobTitle: "Junior Full-Stack Developer",
      company: "Freelance / Personal Projects",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      summary:
        "Built and maintained full-stack applications using React, TypeScript, and NestJS. Focused on reusable components, clean architecture, and small-business solutions.",
      keywords: "React TypeScript NestJS PostgreSQL Docker",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Invoicing & Stock Management App",
      description:
        "A web application for small businesses to manage invoices, products, and stock with a simple UI.",
      tools: "React, NestJS, PostgreSQL, Docker",
      projectLink: "",
      repoLink: "",
    },
    {
      id: 2,
      title: "Reusable Full-Stack Starter",
      description:
        "A plug-and-play project template to avoid repetitive setup and speed up new client projects.",
      tools: "Next.js, NestJS, pnpm",
      projectLink: "",
      repoLink: "",
    },
  ],

  skills: {
    languages: [
      { id: 1, type: skillType.LANG, name: "TypeScript" },
      { id: 2, type: skillType.LANG, name: "JavaScript" },
      { id: 3, type: skillType.LANG, name: "Rust" },
    ],
    technologies: [
      { id: 4, type: skillType.TECH, name: "React" },
      { id: 5, type: skillType.TECH, name: "NestJS" },
      { id: 6, type: skillType.TECH, name: "Node.js" },
      { id: 7, type: skillType.TECH, name: "Docker" },
      { id: 8, type: skillType.TECH, name: "PostgreSQL" },
    ],
    softSkills: [
      { id: 9, type: skillType.SOFT, name: "Independent Problem Solving" },
      { id: 10, type: skillType.SOFT, name: "System Thinking" },
    ],
  },

  extracurriculars: [
    {
      id: 1,
      activityName: "Self-Directed Learning & Open-Source Exploration",
      startDate: "2022",
      endDate: "Present",
    },
  ],
};

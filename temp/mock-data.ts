import { ContactType, DegreeType, Resume, skillType, SectionType } from "@/types/resumeTypes";

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
      { id: 1, type: "Email", value: "your.email@example.com" },
      { id: 2, type: "GitHub", value: "github.com/yourusername" },
      {
        id: 3,
        type: "LinkedIn",
        value: "linkedin.com/in/yourusername",
      },
    ],
  },

  sections: [
    {
      type: SectionType.Education,
      body: [
        {
          id: 1,
          degreeType: "BS",
          degreeName: "Computer Science",
          institution: "ISIMM",
          startDate: "2021",
          endDate: "2024",
          notes: [],
          keySkills: "",
        },
      ],
    },
    {
      type: SectionType.WorkExperience,
      body: [
        {
          id: 1,
          jobTitle: "Junior Full-Stack Developer",
          company: "Freelance / Personal Projects",
          location: "Remote",
          startDate: "2023",
          endDate: "Present",
          highlights: [
            "Built and maintained full-stack applications using React, TypeScript, and NestJS.",
            "Focused on reusable components, clean architecture, and small-business solutions."
          ],
          keywords: "React TypeScript NestJS PostgreSQL Docker",
        },
      ],
    },
    {
      type: SectionType.Project,
      body: [
        {
          id: 1,
          title: "Invoicing & Stock Management App",
          notes: [
            "A web application for small businesses to manage invoices, products, and stock with a simple UI."
          ],
          tools: "React, NestJS, PostgreSQL, Docker",
          projectLink: "",
          repoLink: "",
        },
        {
          id: 2,
          title: "Reusable Full-Stack Starter",
          notes: [
            "A plug-and-play project template to avoid repetitive setup and speed up new client projects."
          ],
          tools: "Next.js, NestJS, pnpm",
          projectLink: "",
          repoLink: "",
        },
      ],
    },
    {
      type: SectionType.Skills,
      body: {
        languages: [
          { id: 1, type: "LANG", name: "TypeScript" },
          { id: 2, type: "LANG", name: "JavaScript" },
          { id: 3, type: "LANG", name: "Rust" },
        ],
        technologies: [
          { id: 4, type: "TECH", name: "React" },
          { id: 5, type: "TECH", name: "NestJS" },
          { id: 6, type: "TECH", name: "Node.js" },
          { id: 7, type: "TECH", name: "Docker" },
          { id: 8, type: "TECH", name: "PostgreSQL" },
        ],
        softSkills: [
          { id: 9, type: "SOFT", name: "Independent Problem Solving" },
          { id: 10, type: "SOFT", name: "System Thinking" },
        ],
      },
    },
    {
      type: SectionType.ExtraCurricular,
      body: [
        {
          id: 1,
          activityName: "Self-Directed Learning & Open-Source Exploration",
          startDate: "2022",
          endDate: "Present",
        },
      ],
    },
  ],
};

// craete a resume mock data

import { ContactType, DegreeType, ExtraCurricularActivity, hobby, PersonalInfo, Resume, Skills, skillType, WorkExperience } from "@/types/resumeTypes";




const personalInfo: PersonalInfo = {
  name: "Mohamed Yessine Bouajila",
  location: "Bizerte",
  description: "Passionate software developer with expertise in building scalable web applications and a strong background in computer science.",
  contactMethods: [
    { id: 1, type: ContactType.Email, value: "bouajilamedyessine@gmail.com" },
    { id: 2, type: ContactType.Phone, value: "+216-28-747-707" },
    { id: 3, type: ContactType.Website, value: "http://bouajilaProg.com/" },
    { id: 4, type: ContactType.GitHub, value: "bouajil" },
    { id: 5, type: ContactType.LinkedIn, value: "mohamed-yessine-bouajila" }
  ]
};


const educations = [
  {
    id: 1,
    degreeType: DegreeType.Bachelor,
    degreeName: "Bachelor of Science in Computer Science",
    institution: "higher institute of computer science and mathematics of Monastir(ISIMM)",
    startDate: "2022-09",
    endDate: "2025-06"
  }
];

const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "Developed a responsive personal portfolio website using React and Tailwind CSS to showcase projects and skills.",
    tools: "React Tailwind CSS JavaScript",

    projectLink: "https://bouajilaProg.com/",
    repoLink: "https://github/bouajilaProg/portfolio"

  }
];

const experiences: WorkExperience[] = [
  {
    id: 1,
    jobTitle: "Frontend Developer Intern",
    company: "Tech Solutions Ltd.",
    location: "Tunis, Tunisia",
    startDate: "2023-06",
    endDate: "2023-08",
    keywords: "React JavaScript CSS HTML UI/UX",
    summary: "Collaborated with the development team to create and optimize user interfaces for client projects, improving load times by 20%."
  }
];


const skills: Skills = {
  languages: [
    { id: 1, type: skillType.languages, name: "TypeScript" },
    { id: 2, type: skillType.languages, name: "JavaScript" },
    { id: 3, type: skillType.languages, name: "Python" },
    { id: 4, type: skillType.languages, name: "Rust" },
  ],
  technologies: [
    { id: 1, type: skillType.technologies, name: "React" },
    { id: 2, type: skillType.technologies, name: "NestJS" },
    { id: 3, type: skillType.technologies, name: "PostgreSQL" },
    { id: 4, type: skillType.technologies, name: "Docker" },
    { id: 5, type: skillType.technologies, name: "Caddy" },
    { id: 6, type: skillType.technologies, name: "Next.js" },
    { id: 7, type: skillType.technologies, name: "Arch Linux" },
  ],
  softSkills: [
    { id: 1, type: skillType.softSkills, name: "Problem Solving" },
    { id: 2, type: skillType.softSkills, name: "Leadership" },
    { id: 3, type: skillType.softSkills, name: "Creativity" },
    { id: 4, type: skillType.softSkills, name: "Communication" },
    { id: 5, type: skillType.softSkills, name: "Adaptability" },
  ],
};

const certifications = [{
  id: 1,
  name: "Certified JavaScript Developer",
  issuingOrganization: "Tech Institute",
  issueDate: "2023-05",
  credentialID: "JS-DEV-12345",
  credentialURL: "https://www.techinstitute.com/certificates/JS-DEV-12345"
}];


const extracurriculars: ExtraCurricularActivity[] = [
  {
    id: 1,
    activityName: "the code bey chairman",
    startDate: "2022-10",
    endDate: "2023-06",
  }
];


const hobbies: hobby[] = [
  {
    id: 1,
    name: "Photography"
  },
  {
    id: 2,
    name: "Traveling"
  }];


export const mockResumeData: Resume = {
  name: "standard resume",
  description: "A standard resume template",
  template: "standard",
  lastUpdate: new Date().toISOString(),

  personalInfo,
  educations,
  projects,
  experiences: experiences,
  skills,
  certifications,
  extracurriculars,
  hobbies
};





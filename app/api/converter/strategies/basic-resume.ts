import {
  Certification,
  Contact,
  ContactType,
  EducationItem,
  ExtraCurricularActivity,
  PersonalInfo,
  Project,
  Skills,
  WorkExperience,
}
  from "@/types/resumeTypes";
import { ResumeGenerator } from "./types";



// --- Helpers ---
const sanitize = (text: string = ""): string =>
  text.replace(/@/g, "\\@").replace(/#/g, "\\#").replace(/\[/g, "\\[").replace(
    /\]/g,
    "\\]",
  ).replace(/"/g, '\\"');

const getContact = (contacts: any[], type: ContactType): string | undefined =>
  contacts.find((c) => c.type === type)?.value;

const datesHelper = (start: string, end: string) =>
  `dates-helper(start-date: "${start}", end-date: "${end}")`;

// --- Section Renderers ---

const Header = (info: any) => {
  const email = getContact(info.contact, ContactType.Email);
  const phone = getContact(info.contact, ContactType.Phone);
  const github = getContact(info.contact, ContactType.GitHub)?.replace(
    "https://",
    "",
  );
  const linkedin = getContact(info.contact, ContactType.LinkedIn)?.replace(
    "https://",
    "",
  );
  const site = getContact(info.contact, ContactType.Website)?.replace(
    "https://",
    "",
  );

  return `
#import "@preview/basic-resume:0.2.9": *

#let name = "${sanitize(info.name)}"
#let location = "${sanitize(info.location)}"
${email ? `#let email = "${sanitize(email)}"` : ""}
${github ? `#let github = "${sanitize(github)}"` : ""}
${linkedin ? `#let linkedin = "${sanitize(linkedin)}"` : ""}
${phone ? `#let phone = "${sanitize(phone)}"` : ""}
${site ? `#let personal-site = "${sanitize(site)}"` : ""}

#show: resume.with(
  author: name,
  location: location,
  ${email ? "email: email," : ""}
  ${github ? "github: github," : ""}
  ${linkedin ? "linkedin: linkedin," : ""}
  ${phone ? "phone: phone," : ""}
  ${site ? "personal-site: personal-site," : ""}
  accent-color: "#26428b",
  font: "New Computer Modern",
)
`;
};

const Education = (edu: EducationItem) => `
#edu(
  institution: "${sanitize(edu.institution)}",
  dates: ${datesHelper(edu.startDate, edu.endDate)},
  degree: "${sanitize(edu.degreeType)} in ${sanitize(edu.degreeName)}",
)
`;

const Experience = (exp: WorkExperience) => {
  const bullets = exp.summary.split("\n").map((s) => `- ${sanitize(s.trim())}`)
    .join("\n");
  return `
#work(
  title: "${sanitize(exp.jobTitle)}",
  location: "${sanitize(exp.location)}",
  company: "${sanitize(exp.company)}",
  dates: ${datesHelper(exp.startDate, exp.endDate)},
)
${bullets}
`;
};

const ProjectSection = (proj: Project) => `
#project(
  name: "${sanitize(proj.title)}",
  role: "${sanitize(proj.tools)}",
  dates: "", 
  url: "${sanitize(proj.projectLink || proj.repoLink || "")}",
)
- ${sanitize(proj.description)}
`;

const Extracurriculars = (act: ExtraCurricularActivity) => `
#extracurriculars(
  activity: "${sanitize(act.activityName)}",
  dates: ${datesHelper(act.startDate, act.endDate || "Present")},
)
`;

const SkillsSection = (skills: Skills) => {
  const langs = skills.languages.map((s) => s.name).join(", ");
  const techs = skills.technologies.map((s) => s.name).join(", ");

  return `
== Skills
- *Programming Languages*: ${sanitize(langs)}
- *Technologies*: ${sanitize(techs)}
`;
};

// --- The Strategy Function ---
export const generateBasicResume: ResumeGenerator = (resume) => {
  return [
    Header(resume.personalInfo),

    "== Education",
    ...resume.educations.map(Education),

    "== Work Experience",
    ...resume.experiences.map(Experience),

    "== Projects",
    ...resume.projects.map(ProjectSection),

    "== Extracurricular Activities",
    ...(resume.extracurriculars || []).map(Extracurriculars),

    SkillsSection(resume.skills),
  ].join("\n");
};

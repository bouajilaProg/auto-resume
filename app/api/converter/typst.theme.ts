
// typst.theme.ts

import {
  Certification,
  Contact,
  EducationItem,
  ExtraCurricularActivity,
  PersonalInfo,
  Project,
  Skills,
  WorkExperience,
}
  from "@/types/resumeTypes";


// --- Helpers ---
const sanitize = (text: string = ""): string =>
  text.replace(/@/g, "\\@").replace(/#/g, "\\#").replace(/\[/g, "\\[").replace(
    /\]/g,
    "\\]",
  );

const joinLines = (lines: (string | undefined | null)[]) =>
  lines.filter(Boolean).join("\n");

// --- "Components" ---

export const DocumentLayout = ({ children }: { children: string }) => `
#set page(margin: (top: 1.5cm, bottom: 1.5cm, left: 2cm, right: 2cm))
#set text(size: 11pt)
#set heading(numbering: none)

// Global Helper Functions
#let section(title) = [
  #text(weight: "bold", size: 14pt)[#title]
  #line(length: 100%)
  #v(0.6em)
]

#let subheading(title, subtitle, dates) = [
  #text(weight: "bold")[#title]
  #h(1fr)
  #emph[#dates]
  #linebreak()
  #text(size: 10pt)[#subtitle]
  #v(0.3em)
]

${children}
`;

export const Header = (info: PersonalInfo) => {
  const contacts = info.contact.map((c) => sanitize(c.value)).join(" · ");

  return `
#align(center)[
  #text(weight: "bold", size: 22pt)[${sanitize(info.name)}]
  #linebreak()
  #emph[${sanitize(info.description)}]
  #linebreak()
  ${sanitize(info.location)}
]
#v(0.6em)
#align(center)[#text[${contacts}]]
#v(1.2em)
`;
};

export const Section = (
  { title, children }: { title: string; children: string },
) => {
  if (!children.trim()) return "";
  return `
#section("${title}")
${children}
`;
};

export const Profile = (description: string) => `
${sanitize(description)}
`;

export const EducationEntry = (edu: EducationItem) => `
#subheading(
  "${sanitize(edu.degreeType)}",
  "${sanitize(edu.degreeName)} at ${sanitize(edu.institution)}",
  "${sanitize(edu.startDate)} – ${sanitize(edu.endDate)}"
)
`;

export const ProjectEntry = (proj: Project) => {
  const links = [
    proj.projectLink ? `• Live demo: ${sanitize(proj.projectLink)}` : null,
    proj.repoLink ? `• Repository: ${sanitize(proj.repoLink)}` : null,
  ].filter(Boolean).join(" \\ \n");

  return `
#subheading(
  "${sanitize(proj.title)}",
  "${sanitize(proj.tools)}",
  ""
)

${sanitize(proj.description)}
#linebreak()
${links}
#v(0.6em)
`;
};

export const ExperienceEntry = (exp: WorkExperience) => {
  // Convert newlines to typst bullets if needed, or just plain text
  const summary = exp.summary.split("\n").map((s) => `• ${sanitize(s.trim())}`)
    .join(" \n");

  return `
#subheading(
  "${sanitize(exp.jobTitle)}",
  "${sanitize(exp.company)} – ${sanitize(exp.location)}",
  "${sanitize(exp.startDate)} – ${sanitize(exp.endDate)}"
)
${summary}
`;
};

export const SkillsList = (skills: Skills) => {
  const renderRow = (label: string, items: { name: string }[]) => {
    if (!items.length) return "";
    return `#text(weight: "bold")[${label}] ${items.map((i) => sanitize(i.name)).join(" · ")
      }`;
  };

  return joinLines([
    renderRow("Languages", skills.languages),
    "#v(0.3em)",
    renderRow("Technologies", skills.technologies),
    "#v(0.3em)",
    renderRow("Soft Skills", skills.softSkills),
  ]);
};

export const CertificationList = (certs: Certification[]) =>
  certs.map((c) =>
    `• ${sanitize(c.name)} (${sanitize(c.issuingOrganization)
    }) – ${c.issueDate}`
  ).join(" \n");

export const ExtraCurricularList = (acts: ExtraCurricularActivity[]) =>
  acts.map((a) => `• ${sanitize(a.activityName)} (${a.startDate})`).join(" \n");

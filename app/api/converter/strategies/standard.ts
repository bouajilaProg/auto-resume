import * as UI from "../typst.theme"
import { ResumeGenerator } from "./types";

export const generateStandardResume: ResumeGenerator = (resume) => {
  // Re-using the logic from the previous answer
  const content = [
    UI.Header(resume.personalInfo),
    UI.Section({ title: "Profile", children: UI.Profile(resume.description) }),
    UI.Section({
      title: "Education",
      children: resume.educations.map(UI.EducationEntry).join("\n"),
    }),
    UI.Section({
      title: "Work Experience",
      children: resume.experiences.map(UI.ExperienceEntry).join("\n"),
    }),
    // ... rest of sections
  ].join("\n");

  return UI.DocumentLayout({ children: content });
};

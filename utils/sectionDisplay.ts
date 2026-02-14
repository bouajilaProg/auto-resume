import {
  SectionType,
  SectionTypeValue,
  EducationItem,
  Project,
  WorkExperience,
  Certification,
  ExtraCurricularActivity,
  Hobby,
  Language,
} from "@/types/resumeTypes";

export type SectionItem =
  | EducationItem
  | Project
  | WorkExperience
  | Certification
  | ExtraCurricularActivity
  | Hobby
  | Language;

/**
 * Gets display properties for a section item in a type-safe way
 */
export function getSectionItemDisplay(
  sectionType: SectionTypeValue,
  item: SectionItem
): { title: string; subtitle: string } {
  switch (sectionType) {
    case SectionType.Education: {
      const edu = item as EducationItem;
      return { title: edu.degreeName, subtitle: edu.institution };
    }
    case SectionType.WorkExperience: {
      const exp = item as WorkExperience;
      return { title: exp.jobTitle, subtitle: exp.company };
    }
    case SectionType.Project: {
      const proj = item as Project;
      return { title: proj.title, subtitle: proj.tools };
    }
    case SectionType.Certification: {
      const cert = item as Certification;
      return { title: cert.name, subtitle: cert.issuingOrganization };
    }
    case SectionType.ExtraCurricular: {
      const extra = item as ExtraCurricularActivity;
      return { title: extra.activityName, subtitle: "" };
    }
    case SectionType.Hobbies: {
      const hobby = item as Hobby;
      return { title: hobby.name, subtitle: hobby.description || "" };
    }
    case SectionType.Languages: {
      const lang = item as Language;
      return { title: lang.name, subtitle: lang.proficiency || "" };
    }
    default:
      return {
        title:
          "name" in item && typeof (item as { name: string }).name === "string"
            ? (item as { name: string }).name
            : "Unknown",
        subtitle: "",
      };
  }
}

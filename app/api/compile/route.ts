import { NextRequest, NextResponse } from "next/server";
import { compile, ResumeSchema, type Resume } from "bouajila-resume-generator";

export async function POST(req: NextRequest) {
  try {
    const assembledResume: Resume = await req.json();
    if (!assembledResume || typeof assembledResume !== "object" || Array.isArray(assembledResume)) {
      return NextResponse.json({ error: "Send a resume object." }, { status: 400 });
    }

    const normalizeUrlValue = (value?: string | null) => {
      const trimmedValue = typeof value === "string" ? value.trim() : undefined;
      if (!trimmedValue) return undefined;
      if (/^https?:\/\//i.test(trimmedValue)) return trimmedValue;
      return `https://${trimmedValue}`;
    };

    const normalizedResume: Resume = {
      ...assembledResume,
      personalInfo: assembledResume.personalInfo ? {
        ...assembledResume.personalInfo,
        contact: (Array.isArray(assembledResume.personalInfo.contact) ? assembledResume.personalInfo.contact : []).map((contact) => {
          if (!contact || contact.type !== "Website") return contact;

          const normalizedValue = normalizeUrlValue(contact.value);
          if (!normalizedValue) return contact;

          return { ...contact, value: normalizedValue };
        }),
      } : assembledResume.personalInfo,
      sections: (Array.isArray(assembledResume.sections) ? assembledResume.sections : []).map((section) => {
        if (!section || section.type !== "project" || !Array.isArray(section.body)) {
          return section;
        }

        return {
          ...section,
          body: section.body.map((project) => {
            if (!project || typeof project !== "object") return project;

            const normalizedValue = normalizeUrlValue(project.projectLink);
            if (!normalizedValue) return { ...project, projectLink: undefined };

            return { ...project, projectLink: normalizedValue };
          }),
        };
      }),
    };

    const validation = ResumeSchema.safeParse(normalizedResume);
    if (!validation.success) {
      const details = validation.error.issues.map((issue) => {
        const path = issue.path.map((part, index) => {
          if (typeof part === "number") {
            if (issue.path[index - 1] === "sections") {
              return normalizedResume.sections?.[part]?.type?.replaceAll("_", " ") || `section ${part + 1}`;
            }
            return `entry ${part + 1}`;
          }
          if (part === "sections" || part === "body") return "";
          return String(part).replace(/([a-z])([A-Z])/g, "$1 $2");
        }).filter(Boolean).join(" → ");
        return { field: path, message: issue.message };
      });
      return NextResponse.json({ error: "Please complete or correct these resume details.", details }, { status: 422 });
    }

    const result = await compile(normalizedResume);

    if (!result.success) {
      console.error("PDF generation failed:", result.error);
      return NextResponse.json(
        { error: "The PDF could not be generated. Please retry or check the PDF service configuration." },
        { status: 500 }
      );
    }

    if (!result.data.buffer) {
      return NextResponse.json(
        { error: "Failed to generate PDF buffer" },
        { status: 500 }
      );
    }

    return new NextResponse(new Uint8Array(result.data.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="resume.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error("Compilation error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "The request must contain valid JSON." }, { status: 400 });
    }
    return NextResponse.json({ error: "The PDF service encountered an unexpected error. Please try again." }, { status: 500 });
  }
}

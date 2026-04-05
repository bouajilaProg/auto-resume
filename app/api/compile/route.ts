import { NextRequest, NextResponse } from "next/server";
import { compile, type Resume } from "bouajila-resume-generator";

export async function POST(req: NextRequest) {
  try {
    const assembledResume: Resume = await req.json();

    const normalizeUrlValue = (value?: string | null) => {
      const trimmedValue = value?.trim();
      if (!trimmedValue) return undefined;
      if (/^https?:\/\//i.test(trimmedValue)) return trimmedValue;
      return `https://${trimmedValue}`;
    };

    const normalizedResume: Resume = {
      ...assembledResume,
      personalInfo: assembledResume.personalInfo ? {
        ...assembledResume.personalInfo,
        contact: (assembledResume.personalInfo.contact || []).map((contact) => {
          if (contact.type !== "Website") return contact;

          const normalizedValue = normalizeUrlValue(contact.value);
          if (!normalizedValue) return contact;

          return { ...contact, value: normalizedValue };
        }),
      } : assembledResume.personalInfo,
      sections: (assembledResume.sections || []).map((section) => {
        if (section.type !== "project" || !Array.isArray(section.body)) {
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

    const result = await compile(normalizedResume);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 422 }
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
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

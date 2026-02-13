import { NextRequest, NextResponse } from "next/server";
import { compile, Resume as GeneratorResume } from "bouajila-resume-generator";
import { Resume } from "@/types/resumeTypes";

export async function POST(req: NextRequest) {
  try {
    const assembledResume: Resume = await req.json();




    // Compile using bouajila-resume-generator
    const result = await compile(assembledResume as unknown as GeneratorResume);

    if (!result.success || !result.data?.buffer) {
      throw new Error(result.error?.message || "Failed to generate PDF buffer");
    }

    return new NextResponse(new Uint8Array(result.data.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="resume.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("Compilation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

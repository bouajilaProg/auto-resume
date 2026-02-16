import { NextRequest, NextResponse } from "next/server";
import { compile, type Resume } from "bouajila-resume-generator";

export async function POST(req: NextRequest) {
  try {
    const assembledResume: Resume = await req.json();

    const result = await compile(assembledResume);

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

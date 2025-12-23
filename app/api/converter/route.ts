// app/api/resume/route.ts
import { NextResponse } from "next/server";
import { ResumeGenerator } from "./strategies/types";
import { generateBasicResume } from "./strategies/basic-resume";
import { myResume } from "@/temp/mock-data";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

const execFileAsync = promisify(execFile);

// --- Strategy Registry ---
const strategies: Record<string, ResumeGenerator> = {
  "basic-resume": generateBasicResume,
  "standard": generateBasicResume, // fallback
};

// --- API Route ---
export async function GET() {
  try {
    const strategy = strategies[myResume.template];

    if (!strategy) {
      return NextResponse.json(
        { error: `Template strategy '${myResume.template}' not found.` },
        { status: 404 }
      );
    }

    const typstContent = strategy(myResume);

    // Temporary paths
    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const typstFile = path.join(tmpDir, "resume.typ");
    const pdfFile = path.join(tmpDir, "resume.pdf");

    // Write Typst content to file
    fs.writeFileSync(typstFile, typstContent, "utf-8");

    // Compile to PDF using Typst CLI
    await execFileAsync("typst", ["compile", typstFile, pdfFile]);

    // Read compiled PDF
    const pdfBuffer = fs.readFileSync(pdfFile);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="resume.pdf"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

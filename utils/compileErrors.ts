export async function readCompileError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (Array.isArray(body.details) && body.details.length > 0) {
      return body.details.map((detail: { field?: string; message?: string }) =>
        `${detail.field ? `${detail.field}: ` : ""}${detail.message || "Check this value."}`,
      ).join("\n");
    }
    if (typeof body.error === "string") return body.error;
  } catch {
    // Proxies may return HTML instead of the API's JSON response.
  }
  return response.status >= 500
    ? "The PDF service is unavailable. Please try again in a moment."
    : "Unable to generate this PDF. Check your resume details and try again.";
}

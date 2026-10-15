import type { Resume } from "@/types/resumeTypes";
import { readCompileError } from "@/utils/compileErrors";

const CACHE_NAME = "resume-pdfs-generator-1.3.2-v1";
const MAX_ENTRIES = 20;
const MAX_BYTES = 20 * 1024 * 1024;
const memory = new Map<string, Blob>();
const pending = new Map<string, Promise<Blob>>();

// Object key order does not change the document; array order does.
export function serializeResume(value: unknown): string {
  return JSON.stringify(value, (_, item) => {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      return Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]]));
    }
    return item;
  });
}

async function compilePdf(payload: string): Promise<Blob> {
  let cache: Cache | undefined;
  let cacheKey: string | undefined;
  try {
    if (globalThis.crypto?.subtle && "caches" in globalThis) {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
      const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
      cacheKey = `${location.origin}/__resume-pdf-cache/${hash}`;
      cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(cacheKey);
      if (cached) return cached.blob();
    }
  } catch {
    // Private browsing or storage limits must not prevent PDF generation.
  }

  const response = await fetch("/api/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  if (!response.ok) throw new Error(await readCompileError(response));
  if (!response.headers.get("Content-Type")?.includes("application/pdf")) {
    throw new Error("The PDF service returned an invalid document. Please try again.");
  }
  const blob = await response.blob();
  if (cache && cacheKey && blob.size <= MAX_BYTES) {
    try {
      await cache.put(cacheKey, new Response(blob, { headers: { "Content-Type": "application/pdf" } }));
      const keys = await cache.keys();
      const entries = await Promise.all(keys.map(async key => {
        const entry = await cache!.match(key);
        return { key, size: entry ? (await entry.blob()).size : 0 };
      }));
      let bytes = 0;
      const obsolete: Request[] = [];
      // Retain the newest documents within both entry and storage limits.
      entries.reverse().forEach((entry, index) => {
        bytes += entry.size;
        if (index >= MAX_ENTRIES || bytes > MAX_BYTES) obsolete.push(entry.key);
      });
      await Promise.all(obsolete.map(key => cache!.delete(key)));
    } catch {
      // The downloaded blob remains usable even when persistent caching fails.
    }
  }
  return blob;
}

export async function getResumePdf(resume: Resume): Promise<Blob> {
  const payload = serializeResume(resume);
  const cached = memory.get(payload);
  if (cached) return cached;
  const existing = pending.get(payload);
  if (existing) return existing;
  const request = compilePdf(payload);
  pending.set(payload, request);
  try {
    const blob = await request;
    memory.set(payload, blob);
    let bytes = Array.from(memory.values()).reduce((sum, item) => sum + item.size, 0);
    for (const [key, item] of memory) {
      if (memory.size <= MAX_ENTRIES && bytes <= MAX_BYTES) break;
      memory.delete(key);
      bytes -= item.size;
    }
    return blob;
  } finally {
    pending.delete(payload);
  }
}

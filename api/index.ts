import type { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";

let serverEntry: any;

async function loadServerEntry() {
  if (serverEntry) return serverEntry;
  try {
    // Try multiple possible paths for the server entry
    const possiblePaths = [
      "../dist/server/index.js",
      "./dist/server/index.js",
      "/var/task/dist/server/index.js",
      path.join(process.cwd(), "dist/server/index.js"),
    ];

    let entry;
    let lastError: Error | null = null;

    for (const tryPath of possiblePaths) {
      try {
        console.log(`[Server] Trying to load from: ${tryPath}`);
        entry = await import(tryPath);
        serverEntry = entry.default || entry;
        console.log(`[Server] Successfully loaded from: ${tryPath}`);
        return serverEntry;
      } catch (e) {
        lastError = e as Error;
        console.log(`[Server] Failed to load from ${tryPath}: ${(e as Error).message}`);
      }
    }

    throw new Error(`Could not load server entry from any path. Last error: ${lastError?.message}`);
  } catch (e) {
    console.error("Failed to load server entry:", e);
    throw e;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const handler = await loadServerEntry();

    const url = new URL(
      req.url || "/",
      `http://${req.headers.host || "localhost:3000"}`
    );

    const request = new Request(url, {
      method: req.method || "GET",
      headers: new Headers(req.headers as Record<string, string | string[]>),
      body:
        req.method && ["GET", "HEAD"].includes(req.method)
          ? undefined
          : typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body || {}),
    });

    const response = await handler.fetch(request, {}, {});

    // Set status
    res.status(response.status);

    // Set headers
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    // Stream the response
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";

let serverEntry: any;

async function loadServerEntry() {
  if (serverEntry) return serverEntry;
  try {
    serverEntry = (await import("../dist/server/index.js")).default;
    return serverEntry;
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

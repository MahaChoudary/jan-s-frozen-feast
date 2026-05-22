import { readFileSync, existsSync } from "fs";
import { join } from "path";

const distClientPath = join(process.cwd(), "dist/client");
const distServerPath = join(process.cwd(), "dist/server/index.js");

let indexHtml = "";
let serverHandler: any = null;

// Initialize at startup
async function initialize() {
  // Load index.html
  try {
    const indexPath = join(distClientPath, "index.html");
    if (existsSync(indexPath)) {
      indexHtml = readFileSync(indexPath, "utf-8");
      console.log("[Init] ✓ Loaded index.html");
    }
  } catch (e) {
    console.error("[Init] Failed to read index.html:", e);
  }

  // Load server handler
  try {
    if (existsSync(distServerPath)) {
      const mod = await import(distServerPath);
      serverHandler = mod.default;
      console.log("[Init] ✓ Loaded server handler from dist/server/index.js");
    }
  } catch (e) {
    console.warn("[Init] Could not load server handler - will use static mode:", e);
  }
}

// Initialize on first run
let initialized = false;

export default async function handler(req: any, res: any) {
  try {
    // Initialize once
    if (!initialized) {
      await initialize();
      initialized = true;
    }

    const path = req.url || "/";
    const method = req.method || "GET";

    console.log(`[${method}] ${path}`);

    // Serve static assets
    if (path.startsWith("/assets/")) {
      const filePath = join(distClientPath, path);
      try {
        const content = readFileSync(filePath);

        if (path.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (path.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (path.endsWith(".png")) {
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
          res.setHeader("Content-Type", "image/jpeg");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }

        res.status(200).send(content);
        return;
      } catch (e) {
        console.error("Failed to serve:", path, e);
      }
    }

    // Try server handler first (for API routes and SSR)
    if (serverHandler) {
      try {
        const url = new URL(
          `${req.headers["x-forwarded-proto"] || "http"}://${req.headers["x-forwarded-host"] || req.headers.host || "localhost"}${path}`
        );

        const request = new Request(url, {
          method,
          headers: new Headers(
            Object.fromEntries(
              Object.entries(req.headers).map(([k, v]: [string, any]) => [
                k,
                typeof v === "string" ? v : Array.isArray(v) ? v.join(", ") : String(v),
              ])
            )
          ),
          body: ["GET", "HEAD"].includes(method)
            ? undefined
            : req.body
              ? typeof req.body === "string"
                ? req.body
                : JSON.stringify(req.body)
              : undefined,
        });

        const response = await serverHandler.fetch(request, {}, {});

        res.status(response.status);
        response.headers.forEach((value: string, key: string) => {
          res.setHeader(key, value);
        });

        const body = await response.arrayBuffer();
        res.send(Buffer.from(body));
        return;
      } catch (e) {
        console.error("[Server] Error:", e);
        // Fall through to static mode
      }
    }

    // Fallback: serve index.html for client-side routing
    if (indexHtml) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(indexHtml);
    } else {
      res.status(500).json({ error: "Could not load application" });
    }
  } catch (error) {
    console.error("[Handler] Fatal error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const distClientPath = join(process.cwd(), "dist/client");

// Cache index.html
let indexHtml = "";
let initialized = false;

function initialize() {
  if (initialized) return;

  try {
    const indexPath = join(distClientPath, "index.html");
    if (existsSync(indexPath)) {
      indexHtml = readFileSync(indexPath, "utf-8");
      console.log("[Init] ✓ Loaded index.html from dist/client");
    } else {
      console.error("[Init] index.html not found at:", indexPath);
    }
  } catch (e) {
    console.error("[Init] Error:", e);
  }

  initialized = true;
}

export default function handler(req: any, res: any) {
  try {
    // Initialize on first request
    initialize();

    const urlPath = req.url || "/";
    console.log(`[${req.method}] ${urlPath}`);

    // Serve static assets with caching headers
    if (urlPath.startsWith("/assets/")) {
      try {
        const filePath = join(distClientPath, urlPath);
        const content = readFileSync(filePath);

        // Set content type and cache headers
        if (urlPath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript; charset=utf-8");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (urlPath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css; charset=utf-8");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (urlPath.endsWith(".png")) {
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (urlPath.endsWith(".jpg") || urlPath.endsWith(".jpeg")) {
          res.setHeader("Content-Type", "image/jpeg");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (urlPath.endsWith(".svg")) {
          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (urlPath.endsWith(".woff2")) {
          res.setHeader("Content-Type", "font/woff2");
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }

        res.writeHead(200);
        res.end(content);
        return;
      } catch (e: any) {
        console.log(`[Assets] Not found: ${urlPath}`);
        // Continue to serve index.html
      }
    }

    // Serve index.html for all other routes (client-side routing)
    if (!indexHtml) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Application not ready" }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    });
    res.end(indexHtml);
  } catch (error: any) {
    console.error("[Handler] Error:", error?.message || error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
        message: error?.message || "Unknown error",
      })
    );
  }
}

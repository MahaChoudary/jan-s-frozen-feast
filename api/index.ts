import { readFileSync, existsSync } from "fs";
import { join } from "path";

const distPath = join(process.cwd(), "dist/server");
let htmlContent = "";

// Load HTML once
function loadHTML() {
  try {
    const htmlFile = join(distPath, "index.html");
    if (existsSync(htmlFile)) {
      htmlContent = readFileSync(htmlFile, "utf-8");
      return true;
    }
  } catch (e) {
    console.error("Cannot load HTML:", e);
  }
  return false;
}

export default async function handler(req: any, res: any) {
  try {
    // Load HTML on first request
    if (!htmlContent) {
      if (!loadHTML()) {
        res.status(500).json({ error: "Application not ready" });
        return;
      }
    }

    const path = req.url || "/";

    // Serve assets
    if (path.startsWith("/assets/")) {
      try {
        const filePath = join(distPath, path);
        const content = readFileSync(filePath);

        // Set cache headers for assets
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        if (path.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (path.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (path.endsWith(".png")) {
          res.setHeader("Content-Type", "image/png");
        } else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
          res.setHeader("Content-Type", "image/jpeg");
        } else if (path.endsWith(".svg")) {
          res.setHeader("Content-Type", "image/svg+xml");
        } else if (path.endsWith(".woff2")) {
          res.setHeader("Content-Type", "font/woff2");
        }

        res.send(content);
        return;
      } catch (e) {
        // Not found, continue
      }
    }

    // Serve HTML for all other routes (SPA)
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
}

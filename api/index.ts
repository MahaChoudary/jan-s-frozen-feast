// Route all requests through the TanStack Start server entry
let serverHandler: any;

async function getServerHandler() {
  if (serverHandler) return serverHandler;

  try {
    // Import the server entry - this handles everything (static + dynamic)
    // @ts-expect-error - built at runtime
    const mod = await import("../dist/server/index.js");
    serverHandler = mod.default;
    console.log("[Server] ✓ Loaded TanStack Start server entry");
    return serverHandler;
  } catch (error) {
    console.error("[Server] ✗ Failed to load server entry:", error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  try {
    const serverHandler = await getServerHandler();

    // Build the full URL
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(`${protocol}://${host}${req.url || "/"}`);

    console.log(`[${req.method}] ${req.url}`);

    // Create a Web standard Request
    const request = new Request(url, {
      method: req.method || "GET",
      headers: new Headers(
        Object.fromEntries(
          Object.entries(req.headers).map(([key, value]: [string, any]) => [
            key,
            typeof value === "string" ? value : Array.isArray(value) ? value.join(", ") : String(value),
          ])
        )
      ),
      body: ["GET", "HEAD"].includes(req.method || "GET")
        ? undefined
        : req.body
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    // Call the server handler (handles all routing)
    const response = await serverHandler.fetch(request, {}, {});

    // Send response
    res.status(response.status);

    // Copy all headers
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    // Send body
    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (error) {
    console.error("[API] Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

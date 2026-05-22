let serverHandler: any;

async function getServerHandler() {
  if (serverHandler) return serverHandler;

  try {
    // @ts-expect-error - built at runtime
    const mod = await import("../dist/server/index.js");
    serverHandler = mod.default;
    return serverHandler;
  } catch (error) {
    console.error("[Server] Failed to load:", error instanceof Error ? error.message : error);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  try {
    const url = new URL(
      `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host || "localhost"}${req.url || "/"}`
    );

    const request = new Request(url, {
      method: req.method || "GET",
      headers: new Headers(
        Object.fromEntries(
          Object.entries(req.headers).map(([k, v]: [string, any]) => [
            k,
            typeof v === "string" ? v : Array.isArray(v) ? v.join(",") : String(v),
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

    const serverHandler = await getServerHandler();

    if (!serverHandler) {
      res.status(503).json({ error: "Service unavailable - server handler not loaded" });
      return;
    }

    const response = await serverHandler.fetch(request, {}, {});

    res.status(response.status);
    response.headers.forEach((v: string, k: string) => res.setHeader(k, v));

    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (error) {
    res.status(500).json({
      error: "Internal error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

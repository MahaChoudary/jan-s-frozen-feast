// Vercel Serverless Function Handler
let serverHandler: any;

async function loadHandler() {
  if (serverHandler) return serverHandler;

  try {
    console.log('[Server] Loading handler...');
    console.log('[Server] CWD:', process.cwd());

    // Try to load from built dist
    try {
      // @ts-expect-error - dist folder created at build time
      const handler = await import('./dist/server/index.js');
      serverHandler = handler.default;
      console.log('[Server] Loaded from relative dist/server/index.js');
      return serverHandler;
    } catch (e) {
      console.log('[Server] Failed to load from relative path:', e);
    }

    // Fallback: load from absolute path that Vercel uses
    try {
      // @ts-expect-error - dist folder created at build time
      const handler = await import('/var/task/dist/server/index.js');
      serverHandler = handler.default;
      console.log('[Server] Loaded from /var/task/dist/server/index.js');
      return serverHandler;
    } catch (e) {
      console.log('[Server] Failed to load from /var/task:', e);
    }

    // Final fallback: load from built-in TanStack
    const handler = await import('@tanstack/react-start/server-entry');
    serverHandler = handler.default || handler;
    console.log('[Server] Loaded from @tanstack/react-start');
    return serverHandler;
  } catch (error) {
    console.error('[Server] All import attempts failed:', error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  try {
    const serverHandler = await loadHandler();

    // Build URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(`${protocol}://${host}${req.url || '/'}`);

    console.log('[Handler] Processing:', req.method, req.url);

    // Create Request
    const request = new Request(url, {
      method: req.method || 'GET',
      headers: new Headers(
        Object.fromEntries(
          Object.entries(req.headers).map(([k, v]: [string, any]) => [
            k,
            typeof v === 'string' ? v : Array.isArray(v) ? v.join(', ') : String(v),
          ])
        )
      ),
      body: ['GET', 'HEAD'].includes(req.method || 'GET')
        ? undefined
        : req.body
          ? typeof req.body === 'string'
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    // Call handler
    const response = await serverHandler.fetch(request, {}, {});

    // Send response
    res.status(response.status);
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (error) {
    console.error('[Handler] Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

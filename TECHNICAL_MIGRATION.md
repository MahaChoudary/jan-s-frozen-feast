# Technical Migration Details

## Changes Summary

### ✅ What Was Changed

#### 1. package.json
**Removed:**
```json
"@cloudflare/vite-plugin": "^1.25.5",
```

**Why:** No longer needed - Vercel provides Node.js runtime

**Result:** All other dependencies remain unchanged

#### 2. vite.config.ts
**Before:**
```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
```

**After:**
```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      target: "node",
      noExternal: [],
    },
  },
});
```

**Why:** Explicitly target Node.js SSR instead of Cloudflare Workers

**Impact:** Cleaner build output, native Node.js compatibility

---

### ✨ What Was Added

#### 1. vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "nodeVersion": "20.x",
  "env": {
    "NODE_ENV": "production"
  },
  "framework": "vite"
}
```

**Why:** Tells Vercel how to build and deploy your app

**Location:** Repository root

#### 2. .vercelignore
```
.git
.gitignore
.env
.env.local
.env.*.local
node_modules
dist
build
.vite
.turbo
*.log
.DS_Store
wrangler.toml
wrangler.jsonc
```

**Why:** Prevents unnecessary files from being uploaded

**Location:** Repository root

---

### 📄 What Stayed The Same

#### No Changes Needed
- ✅ `src/server.ts` - Already compatible with Node.js
- ✅ `src/start.ts` - No changes required
- ✅ All route files - No changes required
- ✅ All components - No changes required
- ✅ Cart store - No changes required
- ✅ Order functions - No changes required
- ✅ Email integration - Works with Vercel
- ✅ WhatsApp integration - No changes required

#### Why?
- TanStack Start abstracts the runtime
- `server.ts` uses standard Fetch API (supported by Node.js)
- H3 framework (underlying server) supports Node.js
- Vercel provides Node.js environment with Fetch support

---

## How the Build Works

### Local Build
```bash
npm run build
```

**Process:**
1. Vite compiles React components
2. TanStack Router processes routes
3. Creates `dist/client/` (static assets)
4. Creates `dist/server/` (server code)
5. Output ready for Node.js

### Vercel Build
When you push to main:
```
Git Push
    ↓
Vercel Webhook (triggered)
    ↓
npm install (install dependencies)
    ↓
npm run build (execute build command)
    ↓
Analyze dist/ folder
    ↓
Create serverless functions
    ↓
Deploy to Vercel's infrastructure
    ↓
App live at https://[project].vercel.app
```

---

## Runtime Compatibility

### Cloudflare Workers (Before)
- ✅ Uses Fetch API
- ✅ Custom runtime
- ✅ V8 engine
- ✅ Deployed via Wrangler
- ✅ Limited Node.js APIs

### Vercel Node.js (After)
- ✅ Uses Fetch API (with Node polyfill)
- ✅ Full Node.js runtime
- ✅ v20.x specified
- ✅ Deployed via Git push
- ✅ Full Node.js APIs available

### Compatibility Layer
```
┌─────────────────────┐
│   Your App Code     │
│  (Framework Agnostic)
└──────────┬──────────┘
           │
    ┌──────▼──────┐
    │ TanStack    │
    │ Start       │ ← Abstracts runtime
    └──────┬──────┘
           │
    ┌──────▼──────────────────┐
    │ H3 Framework            │
    │ (HTTP Server abstraction)│
    └──────┬──────────────────┘
           │
    ┌──────▼──────────┐
    │ Node.js         │
    │ (Vercel)        │
    └─────────────────┘
```

---

## Environment Variables

### How They Work

#### In Development (Local)
```bash
# .env.local (not committed)
RESEND_API_KEY=re_xxx
COMPANY_EMAIL=orders@example.com

# Accessed in code as:
process.env.RESEND_API_KEY
```

#### In Production (Vercel)
```
# Set in Vercel Dashboard
RESEND_API_KEY=re_xxx
COMPANY_EMAIL=orders@example.com

# Vercel injects into process.env
# Accessed same way: process.env.RESEND_API_KEY
```

#### In Code
```typescript
// src/lib/order.functions.ts
const resendKey = process.env.RESEND_API_KEY;
const companyEmail = process.env.COMPANY_EMAIL || "orders@jansfrozenfood.com";
```

No code changes needed - environment reading is identical.

---

## Build Output Comparison

### Cloudflare Workers Build
```
dist/
├── wrangler.json
└── [worker-bundle].js
```
- Single bundle for Cloudflare Workers
- Optimized for Workers runtime
- Deploy via `wrangler deploy`

### Vercel Node.js Build
```
dist/
├── client/               (Served by CDN)
│   ├── assets/
│   ├── index.html
│   └── [client bundles]
└── server/              (Serverless functions)
    ├── index.js         (Entry point)
    ├── assets/
    └── [server bundles]
```
- Separate client/server bundles
- Client: Optimized for browsers
- Server: Optimized for Node.js
- Deploy via `git push`

---

## Performance Implications

### Before (Cloudflare)
- Deployed to Cloudflare edge
- Cold start: ~5-50ms
- Global distribution included
- Limited to Cloudflare APIs

### After (Vercel)
- Deployed to Vercel edge
- Cold start: ~1-100ms (similar)
- Global distribution included
- Full Node.js ecosystem available
- **Better:** Easier to use npm packages
- **Better:** Standard Node.js conventions
- **Better:** Git-based deployments

---

## Breaking Changes

### For End Users
✅ **None** - Everything works the same

### For Developers
✅ **None** - Same code, same API

### API Changes
✅ **None** - Routes work identically

---

## Migration Checklist for Understanding

- ✅ Removed Cloudflare plugin dependency
- ✅ Updated Vite config for Node.js target
- ✅ Added Vercel configuration file
- ✅ Added deployment ignore file
- ✅ No code changes to app logic
- ✅ No breaking changes for users
- ✅ All features preserved
- ✅ Ready for production

---

## Rollback Strategy

If you need to go back to Cloudflare:

1. **Find previous commit:**
   ```bash
   git log --oneline | grep -i cloudflare
   ```

2. **Revert changes:**
   ```bash
   git revert [commit-hash]
   git push origin main
   ```

3. **Reinstall dependencies:**
   ```bash
   npm install
   ```

4. **Deploy with Wrangler:**
   ```bash
   wrangler deploy
   ```

**Note:** This is only if you specifically need Cloudflare features that Vercel doesn't support.

---

## Technical Support

### For Deployment Issues
1. Check Vercel Deployment Logs
   - Dashboard → Deployments → click deployment
2. Check Build Output
   - Look for npm error messages
3. Test Locally
   ```bash
   npm run build
   npm run preview
   ```

### For Application Issues
1. Check server logs
   - Vercel Dashboard → Deployments → Logs
2. Check browser console
   - F12 → Console tab
3. Check network tab
   - Network tab for API calls

---

## File Structure After Migration

```
your-project/
├── src/
│   ├── routes/              (unchanged)
│   ├── components/          (unchanged)
│   ├── server.ts            (unchanged)
│   ├── start.ts             (unchanged)
│   └── ...
│
├── dist/                    (generated on build)
│   ├── client/
│   └── server/
│
├── package.json             (updated - removed @cloudflare/vite-plugin)
├── vite.config.ts           (updated - added Node.js target)
├── vercel.json              (new)
├── .vercelignore            (new)
│
├── MIGRATION_SUMMARY.md     (new)
├── VERCEL_DEPLOYMENT.md     (new)
├── VERCEL_QUICK_REFERENCE.md (new)
├── DEPLOYMENT_CHECKLIST.md  (new)
├── VERCEL_CONFIGURATION.md  (new)
└── TECHNICAL_MIGRATION.md   (this file)
```

---

## Version Compatibility

| Tool | Version | Status |
|------|---------|--------|
| Node.js | 20.x (Vercel) | ✅ Tested |
| Vite | 7.3.1 | ✅ Compatible |
| React | 19.2.0 | ✅ Compatible |
| TanStack Start | 1.167.50 | ✅ Compatible |
| TanStack Router | 1.168.25 | ✅ Compatible |

---

## Dependency Tree (Preserved)

```
@tanstack/react-start
  ├── @tanstack/react-router
  ├── @tanstack/react-query
  └── [other dependencies]

@radix-ui/* (all components)
  └── React 19.2.0

Styling
  ├── tailwindcss 4.2.1
  ├── @tailwindcss/vite 4.2.1
  └── clsx 2.1.1

Utilities
  ├── zustand (cart store)
  ├── zod (validation)
  ├── react-hook-form
  ├── date-fns
  └── framer-motion

UI Components
  ├── lucide-react
  ├── recharts
  ├── embla-carousel-react
  └── sonner (toast notifications)

All dependencies preserved and compatible with Vercel.
```

---

This completes the technical migration documentation.

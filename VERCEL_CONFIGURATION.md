# Exact Vercel Configuration Settings

## Copy These to Vercel Dashboard

### 1. Project Settings → Build & Development Settings

```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

### 2. Environment Variables

Add these in: Project Settings → Environment Variables

```
KEY: RESEND_API_KEY
VALUE: re_xxxxxxxxxxxxxxxxxxxx
ENVIRONMENTS: All (Production, Preview, Development)

---

KEY: COMPANY_EMAIL
VALUE: orders@jansfrozenfood.com
ENVIRONMENTS: All (Production, Preview, Development)

---

KEY: NODE_ENV
VALUE: production
ENVIRONMENTS: Production only
```

### 3. Git Settings

```
Production Branch: main
Redeploy on Push: Enabled (default)
```

---

## Email Service Setup (Optional but Recommended)

### If Using Resend for Email Notifications

1. **Sign up at:** https://resend.com
2. **Get API Key:**
   - Dashboard → API Keys
   - Click "Create API Key"
   - Copy the key (starts with `re_`)
3. **Set in Vercel:**
   - Paste into `RESEND_API_KEY` above

### Without Resend
- Orders will be logged to console
- No email notifications
- Everything else works fine

---

## vercel.json (Already Created)

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

---

## .env.local (For Local Development)

```
# Local development only - not committed to git
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
COMPANY_EMAIL=orders@jansfrozenfood.com
NODE_ENV=development
```

### To Use Locally:
```bash
# Copy the template
cp .env.local.example .env.local

# Edit .env.local with your keys
# Never commit .env.local to git
```

---

## Command Reference

### Build Process
```bash
npm run build          # Build for production (creates dist/)
npm run preview        # Preview production build locally
npm run dev            # Development server (hot reload)
npm run lint           # Check code quality
npm run format         # Format code
```

### Vercel CLI
```bash
npm i -g vercel        # Install Vercel CLI
vercel                 # Deploy from terminal
vercel env pull        # Pull env vars locally
vercel logs            # View deployment logs
vercel project rename  # Rename project
```

---

## Build Process Flow

```
┌─────────────────────────────────┐
│ npm run build                   │
│ (Vercel runs this automatically) │
└──────────────┬──────────────────┘
               │
        ┌──────▼──────┐
        │ Vite builds │
        └──────┬──────┘
               │
        ┌──────▼──────────────┐
        │ Client (dist/client)│
        │ - React components  │
        │ - CSS/JS bundles    │
        │ - Static assets     │
        └──────┬──────────────┘
               │
        ┌──────▼──────────────┐
        │ Server (dist/server)│
        │ - SSR entry         │
        │ - API handlers      │
        │ - Manifests         │
        └──────┬──────────────┘
               │
        ┌──────▼──────────────┐
        │ Ready to Deploy     │
        │ (Vercel uploads)    │
        └─────────────────────┘
```

---

## Output Files Location

After `npm run build`:

```
dist/
├── client/                    # Static files served by CDN
│   ├── index.html
│   ├── assets/                # Bundled CSS/JS
│   │   ├── index-xxx.js
│   │   ├── styles-xxx.css
│   │   └── ...
│   └── .assetsignore
│
└── server/                    # Serverless functions
    ├── index.js               # Entry point
    ├── wrangler.json          # (Cloudflare config - harmless)
    ├── assets/                # Server-side bundles
    │   ├── worker-entry.js
    │   └── ...
    └── .vite/                 # Build manifest
        └── manifest.json
```

---

## Vercel Dashboard Locations

### To Set Environment Variables:
```
Dashboard → Your Project → Settings → Environment Variables
```

### To See Build Logs:
```
Dashboard → Your Project → Deployments → Click deployment → View Logs
```

### To Monitor Performance:
```
Dashboard → Your Project → Analytics
```

### To Configure Domains:
```
Dashboard → Your Project → Settings → Domains
```

---

## Production Domain Setup

### If You Have a Custom Domain

1. Go to: Project Settings → Domains
2. Click "Add"
3. Enter your domain: `example.com`
4. Follow DNS configuration instructions
5. Wait for verification (usually minutes)

### Default Vercel URL
```
https://[project-name].vercel.app
```

This works immediately after deployment.

---

## Troubleshooting Configuration

### "Build Failed" in Vercel
1. Check build logs in Vercel dashboard
2. Try locally: `npm run build`
3. Look for errors in package.json or vite.config.ts
4. Ensure all dependencies installed: `npm install`

### "Environment variables not defined"
1. Check variables are set in Vercel dashboard
2. Redeploy after setting (can take a few seconds)
3. Clear browser cache if testing

### "Pages still 404 in production"
1. This shouldn't happen - all routes work
2. Try: Vercel Dashboard → Clear Cache → Redeploy
3. Check dist/ folder has both client/ and server/

---

## Before First Deployment Checklist

- [ ] Read `VERCEL_QUICK_REFERENCE.md`
- [ ] Created Resend account (optional)
- [ ] Have Resend API key (if sending emails)
- [ ] Committed all changes to Git
- [ ] Code pushed to main branch
- [ ] Git repository is on GitHub/GitLab/Bitbucket
- [ ] Vercel account created
- [ ] Ready to import Git repo

---

## Ready to Deploy?

```
1. Go to: https://vercel.com/dashboard
2. Click: Add New → Project
3. Click: Import Git Repository
4. Select: your repository
5. Add Environment Variables (see above)
6. Click: Deploy
7. Done! 🎉
```

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **This Project Files:**
  - `VERCEL_DEPLOYMENT.md` - Complete guide
  - `VERCEL_QUICK_REFERENCE.md` - Cheat sheet
  - `DEPLOYMENT_CHECKLIST.md` - Checklist
  - `MIGRATION_SUMMARY.md` - Summary

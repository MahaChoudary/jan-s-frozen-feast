# Vercel Deployment - Quick Reference

## Copy & Paste Build Settings

### Vercel Project Settings

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

**Development Command (for preview):**
```
npm run dev
```

**Node.js Version:**
```
20.x
```

---

## Environment Variables to Set in Vercel

### Add these in Vercel Dashboard → Project Settings → Environment Variables

```
RESEND_API_KEY = re_[YOUR_API_KEY]
COMPANY_EMAIL = orders@jansfrozenfood.com
NODE_ENV = production
```

### Get Resend API Key (Optional but Recommended)
1. Sign up: https://resend.com
2. Go to API Keys
3. Create key
4. Paste in `RESEND_API_KEY` above

---

## Framework Detection

✅ **Vercel auto-detects:**
- Framework: Vite
- Runtime: Node.js 20.x
- Output: Single Deployable

✅ **Auto-configured by vercel.json:**
- Build settings
- Output directory  
- Framework preset

---

## Deployment Process

### Option 1: Git Push (Recommended)
```bash
git push origin main
```
Vercel auto-deploys on push to main branch.

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 3: Vercel Dashboard
1. https://vercel.com/dashboard
2. Add New → Project
3. Import Git repo
4. Click Deploy

---

## Verify Deployment Works

### Test URLs After Deployment
- Homepage: `https://your-domain.vercel.app/`
- Products: `https://your-domain.vercel.app/products`
- Cart: `https://your-domain.vercel.app/cart`
- Checkout: `https://your-domain.vercel.app/checkout`

### Test Order Submission
1. Add items to cart
2. Go to checkout
3. Fill in customer details
4. Click "Place Order"
5. Should see success page with Order ID
6. Check email (if RESEND_API_KEY is set)

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| 404 on routes | Redeploy after build |
| Email not sending | Check RESEND_API_KEY is set and valid |
| Build fails | Run `npm run build` locally to debug |
| Styles not loading | Clear Vercel cache: Settings → Deployments → Clear cache |

---

## Removed Files (No Longer Needed)

- ❌ `wrangler.toml` / `wrangler.jsonc` → Use `vercel.json` instead
- ❌ `@cloudflare/vite-plugin` → Removed from package.json
- ❌ Cloudflare workers config → Vercel handles all

---

## Key Files for Vercel

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel deployment settings |
| `.vercelignore` | Files to skip during deployment |
| `package.json` | Dependencies & build scripts |
| `vite.config.ts` | Build configuration |
| `src/server.ts` | SSR entry point |

---

## Performance Metrics

After deploying, check in Vercel Dashboard:
- **Deployment Status:** All green ✓
- **Build Duration:** Usually 2-5 minutes
- **Bundle Size:** View in Deployments tab
- **Core Web Vitals:** Monitor in Analytics

---

## Need Help?

1. **Vercel Docs:** https://vercel.com/docs/frameworks/vite
2. **TanStack Start:** https://tanstack.com/start/latest
3. **Resend Setup:** https://resend.com/docs/introduction
4. **Project Logs:** Vercel Dashboard → Deployments → View Logs

---

## What Changed

| Before (Cloudflare) | After (Vercel) |
|-------------------|----------------|
| Deploy via `wrangler deploy` | Deploy via `git push` |
| Workers runtime | Node.js 20.x |
| `wrangler.jsonc` config | `vercel.json` config |
| Cloudflare D1 database | Bring your own database |
| Edge network (Cloudflare) | Edge network (Vercel) |

All functionality preserved:
- ✅ Shopping cart
- ✅ Checkout & COD
- ✅ Email notifications
- ✅ WhatsApp integration
- ✅ Product catalog
- ✅ All pages & routes

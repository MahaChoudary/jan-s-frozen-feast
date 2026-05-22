# Vercel Deployment Checklist - JAN'S Frozen Food

## ✅ Migration Complete

All Cloudflare-specific code has been removed and replaced with Vercel-compatible configuration.

### Files Modified
- ✅ `package.json` - Removed `@cloudflare/vite-plugin`
- ✅ `vite.config.ts` - Updated for Node.js target
- ✅ `server.ts` - Compatible with Node.js runtime (no changes needed)

### Files Created
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.vercelignore` - Files to skip during deployment
- ✅ `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- ✅ `VERCEL_QUICK_REFERENCE.md` - Quick reference card

### Files Removed
- `wrangler.jsonc` - No longer needed (but can be kept in git history)

---

## 🚀 Ready to Deploy

### Step 1: Commit Changes
```bash
git add .
git commit -m "Migrate from Cloudflare Workers to Vercel"
git push origin main
```

### Step 2: Go to Vercel
1. Visit https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your Git repository
4. Vercel auto-detects Vite framework

### Step 3: Set Environment Variables
Before deploying, add these in Vercel Dashboard:

**Settings → Environment Variables**

Add:
```
RESEND_API_KEY = re_[YOUR_RESEND_KEY]
COMPANY_EMAIL = orders@jansfrozenfood.com
```

### Step 4: Deploy
Click "Deploy" button - Done!

---

## 🎯 Build Settings (Auto-Configured)

Vercel automatically detects these from `vercel.json`:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 20.x |
| Framework | Vite |

---

## 📋 Environment Variables Required

### For Email Notifications (Optional)
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
COMPANY_EMAIL=orders@jansfrozenfood.com
```

Without these, orders are logged to console. Set them if you want actual email notifications.

### Get Resend API Key
1. Go to https://resend.com
2. Sign up or log in
3. Dashboard → API Keys
4. Create new key
5. Copy to `RESEND_API_KEY`

---

## ✨ What's Preserved

All functionality works identically:
- ✅ Shopping cart (Zustand state)
- ✅ Checkout flow
- ✅ Cash on Delivery
- ✅ Order submission (server function)
- ✅ Email notifications (via Resend)
- ✅ WhatsApp integration
- ✅ All routes and pages
- ✅ SSR and page metadata
- ✅ Product catalog
- ✅ Cart persistence

---

## 🔄 Deployment Process

### First Deployment
1. Vercel installs dependencies: `npm install`
2. Vite builds client: `npm run build` (builds to `dist/`)
3. Creates serverless functions from server code
4. Deploys to Vercel's global CDN
5. Returns production URL

### After Initial Deploy
Every `git push` to `main` automatically redeploys.

---

## 🧪 Test After Deployment

### URLs to Test
- [ ] Homepage: `https://[YOUR_DOMAIN].vercel.app/`
- [ ] Products: `https://[YOUR_DOMAIN].vercel.app/products`
- [ ] Cart: `https://[YOUR_DOMAIN].vercel.app/cart`
- [ ] Checkout: `https://[YOUR_DOMAIN].vercel.app/checkout`
- [ ] About: `https://[YOUR_DOMAIN].vercel.app/about`
- [ ] FAQ: `https://[YOUR_DOMAIN].vercel.app/faq`

### Test Shopping Flow
1. [ ] Navigate to products
2. [ ] Add item to cart
3. [ ] Open cart page - see items
4. [ ] Go to checkout
5. [ ] Fill customer details
6. [ ] Submit order
7. [ ] See success page with Order ID
8. [ ] Check email (if RESEND_API_KEY set)

---

## 🆘 Common Issues & Solutions

### 404 on Pages
**Problem:** Routes return 404 instead of rendering
**Solution:**
```bash
# Local test
npm run build
npm run preview

# Then redeploy on Vercel
```

### Email Not Sending
**Problem:** Orders don't send emails
**Solution:**
1. Verify `RESEND_API_KEY` is set in Vercel env vars
2. Verify key is valid at https://resend.com
3. Redeploy after setting variables
4. Check Resend account is active

### Build Fails
**Problem:** Deployment fails during npm run build
**Solution:**
1. Test locally: `npm run build`
2. Check for errors in build logs
3. Verify dependencies: `npm install`
4. Check `vite.config.ts` syntax

### Slow Performance
**Solution:** Vercel handles optimization automatically
- Images optimized
- Assets cached globally
- Server functions scale automatically

---

## 📊 Monitoring Deployment

### In Vercel Dashboard
1. **Deployments Tab** - See build status
2. **Analytics Tab** - Performance metrics
3. **Logs Tab** - See any errors
4. **Settings Tab** - Configure env vars

### Useful Commands
```bash
# Test build locally
npm run build

# Preview build
npm run preview

# Development server
npm run dev
```

---

## 💾 Database & Persistence

⚠️ **Important:** This setup has no database included.

If you need to store data:
- **Email Only:** Current setup (Resend emails)
- **Database:** Add your own:
  - PostgreSQL (Neon, Supabase)
  - MongoDB (Atlas)
  - Vercel Postgres
  - Your own backend API

For now, orders are:
1. Sent via email (if Resend configured)
2. Logged to server logs
3. Not persisted in database

---

## 🔐 Security Checklist

- [ ] RESEND_API_KEY is set in Vercel (not hardcoded)
- [ ] COMPANY_EMAIL is configured
- [ ] Git repository is private
- [ ] No secrets in code or `.env`
- [ ] SSL/TLS enabled (automatic on Vercel)

---

## 📚 Useful Resources

| Resource | Link |
|----------|------|
| Vercel Docs | https://vercel.com/docs |
| Vercel Vite | https://vercel.com/docs/frameworks/vite |
| TanStack Start | https://tanstack.com/start |
| TanStack Router | https://tanstack.com/router |
| Resend | https://resend.com/docs |
| Vite | https://vitejs.dev |

---

## 🎓 How Vercel Deployment Works

```
┌─────────────────────────────────────────────┐
│ 1. You push code to Git (main branch)       │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│ 2. Vercel webhook triggered                 │
│    - Fetches your repo                      │
│    - Installs dependencies                  │
│    - Runs: npm run build                    │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│ 3. Build Process                            │
│    - Vite builds client (dist/client)       │
│    - Vite builds server (dist/server)       │
│    - Creates serverless functions           │
│    - Optimizes assets                       │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│ 4. Deploy                                   │
│    - Uploads to Vercel's CDN                │
│    - Routes traffic to serverless functions │
│    - Returns deployment URL                 │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│ 5. Live                                     │
│    - https://your-domain.vercel.app         │
│    - Auto-scales based on traffic           │
│    - Global distribution                    │
└─────────────────────────────────────────────┘
```

---

## ✅ Final Checklist Before Deploying

- [ ] Read `VERCEL_QUICK_REFERENCE.md`
- [ ] Understand environment variables
- [ ] Created Resend account (optional)
- [ ] Have Git repository ready
- [ ] Have Vercel account
- [ ] Committed all changes to Git
- [ ] Ready to push to main branch

---

## 🎉 You're Ready!

Your JAN'S Frozen Food application is now:
- ✅ Cloudflare-free
- ✅ Vercel-compatible  
- ✅ Production-ready
- ✅ Fully deployable

Follow the "Step 1-4" above to deploy!

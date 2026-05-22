# Vercel Deployment Guide - JAN'S Frozen Food

## Overview
This TanStack Start application has been configured for deployment on Vercel with full support for:
- Server-side rendering (SSR)
- API endpoints (server functions)
- Email notifications via Resend
- WhatsApp integration
- Cash on Delivery checkout
- Cart management

## Build Configuration
The project automatically uses Vercel-compatible build settings configured in:
- `vercel.json` - Vercel deployment settings
- `vite.config.ts` - Vite build configuration (auto-detects Node.js target)

## Required Environment Variables

### Email Service (Optional but Recommended)
For order email notifications to work:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
COMPANY_EMAIL=orders@jansfrozenfood.com
```

### Get Resend API Key
1. Go to https://resend.com
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy and set as `RESEND_API_KEY`

### Alternative Email Services
If not using Resend, emails will be logged to console. No configuration needed, but you won't receive email notifications.

## Vercel Deployment Steps

### 1. Push to Git Repository
```bash
git add .
git commit -m "Migrate from Cloudflare to Vercel deployment"
git push
```

### 2. Connect to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel auto-detects it's a Vite project

### 3. Configure Environment Variables
In Vercel project settings, add:

**Environment Variables Tab:**
- Key: `RESEND_API_KEY`
- Value: `re_xxxxxxxxxxxxxxxxxxxx` (your Resend API key)

- Key: `COMPANY_EMAIL`
- Value: `orders@jansfrozenfood.com`

### 4. Deploy Settings (Should Auto-Configure)
**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Node.js Version:**
```
20.x
```

**Framework Preset:**
```
Vite
```

### 5. Deploy
Click "Deploy" - Vercel will:
1. Install dependencies
2. Run `npm run build`
3. Deploy to Vercel's serverless functions
4. Provide a production URL

## Vercel Build Settings Reference

### Build Command
```
npm run build
```

### Output Directory
```
dist
```

### Development Branch
```
main
```

### Install Command
```
npm install
```

### Node.js Version
```
20.x (or later)
```

## Environment Variables Explained

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `RESEND_API_KEY` | Optional | API key for Resend email service | `re_xxxxxxxxxxxxxxxxxxxx` |
| `COMPANY_EMAIL` | Optional | Email to receive order notifications | `orders@jansfrozenfood.com` |
| `NODE_ENV` | Auto | Set automatically by Vercel | `production` |

## How It Works on Vercel

### Frontend (Static)
- All React/TanStack Router pages are pre-rendered as static HTML
- CSS and JavaScript are bundled and optimized
- Served globally via Vercel's CDN

### Backend (Serverless)
- Server functions (like `submitOrder`) run on Vercel's serverless functions
- Each API route becomes a serverless function
- Scales automatically based on traffic

### Server-Side Rendering
- Pages can be dynamically rendered on the server
- Metadata (Open Graph, etc.) is injected server-side
- H3 framework handles routing

## Testing Before Deployment

### Local Build Test
```bash
npm run build
npm run preview
```

### Test Email Functionality
1. Run `npm run dev`
2. Add items to cart
3. Go to checkout
4. Fill form and submit
5. Check console for order details or email

## Deployment Checklist

- [ ] Removed Cloudflare worker dependencies
- [ ] Updated `vite.config.ts` 
- [ ] Created `vercel.json`
- [ ] Repository pushed to Git (GitHub, GitLab, or Bitbucket)
- [ ] Vercel project created and connected
- [ ] Environment variables set:
  - [ ] `RESEND_API_KEY` (if using email)
  - [ ] `COMPANY_EMAIL` (if using email)
- [ ] Initial deployment completed
- [ ] Tested order submission
- [ ] Tested page routing (products, checkout, etc.)
- [ ] Verified email notifications (if using Resend)
- [ ] Set custom domain (optional)

## Troubleshooting

### "404 NOT_FOUND" on Routes
**Issue:** Routes return 404 instead of rendering
**Solution:** This is usually fixed by:
1. Rebuilding locally: `npm run build && npm run preview`
2. Redeploying on Vercel
3. Checking that `dist` folder contains both client and server files

### Email Not Sending
**Issue:** Orders don't send confirmation emails
**Cause:** `RESEND_API_KEY` not set or invalid
**Solution:** 
1. Verify key is in Vercel environment variables
2. Redeploy after setting variables
3. Check Resend account is active

### Build Failures
**Issue:** Deployment fails during build
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies installed: `npm install`
3. Test locally: `npm run build`
4. Check for missing environment variables

### Performance Issues
**Optimization:**
- Vercel auto-optimizes images and assets
- Server functions are cached when possible
- Static pages serve from global CDN
- No additional configuration needed

## Differences from Cloudflare

| Feature | Cloudflare Workers | Vercel |
|---------|-------------------|--------|
| Deployment | Wrangler CLI | Git push to main |
| Backend Runtime | Cloudflare Workers | Node.js 20.x |
| Database | D1 | External (not included) |
| Edge Functions | @edge | Serverless functions |
| Configuration | `wrangler.toml` | `vercel.json` |
| Build Output | Worker Bundle | Node.js Application |

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **TanStack Start:** https://tanstack.com/start
- **Resend Email:** https://resend.com/docs
- **Vite:** https://vitejs.dev

## Rolling Back

If you need to revert to Cloudflare:
1. Keep `wrangler.jsonc` in git history
2. Git checkout the previous version
3. Update dependencies
4. Run `npm install` and `npm run build`

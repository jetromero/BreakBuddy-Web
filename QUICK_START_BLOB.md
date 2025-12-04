# Quick Start: Vercel Blob Storage Setup

## TL;DR - Get your APK on Vercel Blob in 5 minutes!

### 1. Create Blob Store (2 minutes)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Storage** tab
3. Click **"Create Database"** → Select **"Blob"**
4. Name it: `triminder-blob`
5. Click **"Create"**

### 2. Install SDK (30 seconds)
```bash
npm install @vercel/blob
```

### 3. Upload APK (1 minute)
1. Get your token from Vercel Dashboard → Settings → Environment Variables (`BLOB_READ_WRITE_TOKEN`)
2. Set it:
   ```bash
   # Windows PowerShell
   $env:BLOB_READ_WRITE_TOKEN="your_token_here"
   
   # Git Bash / Linux / Mac
   export BLOB_READ_WRITE_TOKEN="your_token_here"
   ```
3. Run upload:
   ```bash
   npm run upload-apk
   ```
4. Copy the blob URL that appears!

### 4. Set Environment Variable (1 minute)
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_APK_DOWNLOAD_URL` = (paste your blob URL)
3. Apply to all environments
4. Redeploy!

### 5. Done! ✅

Your APK is now:
- Hosted on Vercel's global CDN
- Fast downloads worldwide
- Professional production solution

The download component will automatically use the blob URL if set, or fallback to GitHub raw URL.

## Full Guide
See `VERCEL_BLOB_SETUP.md` for detailed instructions and troubleshooting.


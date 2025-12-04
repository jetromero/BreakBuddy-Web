# Vercel Blob Storage Setup Guide

## Overview
This guide will help you set up Vercel Blob Storage to host your TriMinder.apk file, providing a professional, scalable solution for file downloads.

## Benefits
- ✅ Files served from Vercel's global CDN (fast downloads worldwide)
- ✅ Integrated with Vercel platform (no external services needed)
- ✅ Professional solution suitable for production
- ✅ Free tier includes 1 GB storage and 10 GB transfer/month
- ✅ Your APK (59.8 MB) is well within free limits!

## Step 1: Create Blob Store in Vercel Dashboard

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your `triminder-webpage` project
3. Click on the **Storage** tab (or go to Settings → Storage)
4. Click **"Create Database"** or **"Add Storage"**
5. Select **"Blob"** as the storage type
6. Give it a name: `triminder-blob` (or any name you prefer)
7. Choose a region (closest to your users - e.g., `us-east-1`)
8. Click **"Create"**

⚠️ **Note:** After creating, Vercel will automatically generate a `BLOB_READ_WRITE_TOKEN` environment variable for your project.

## Step 2: Get Your Blob Token

1. Go to your Vercel Dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Look for `BLOB_READ_WRITE_TOKEN` - it should be automatically created
4. If not found:
   - Go to the Storage tab
   - Click on your blob store
   - Go to Settings
   - Copy the read/write token

## Step 3: Install Vercel Blob SDK

```bash
npm install @vercel/blob
```

## Step 4: Upload the APK File

### Option A: Upload via Script (Recommended - Easy!)

1. Set the token as environment variable:

   **Windows PowerShell:**
   ```powershell
   $env:BLOB_READ_WRITE_TOKEN="your_token_here"
   ```

   **Windows CMD:**
   ```cmd
   set BLOB_READ_WRITE_TOKEN=your_token_here
   ```

   **Git Bash / Linux / Mac:**
   ```bash
   export BLOB_READ_WRITE_TOKEN="your_token_here"
   ```

2. Run the upload script:
   ```bash
   npm run upload-apk
   ```

3. The script will output the blob URL - copy it!

### Option B: Manual Upload via Dashboard

1. Go to your blob store in Vercel Dashboard
2. Click **"Upload"** button
3. Select `public/TriMinder.apk` file
4. Make sure it's set to **Public**
5. Copy the URL after upload

## Step 5: Update Your Code

After uploading, you'll get a blob URL like:
```
https://[hash].public.blob.vercel-storage.com/TriMinder-[hash].apk
```

### Option A: Use Environment Variable (Recommended)

1. Add to Vercel Environment Variables:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_APK_DOWNLOAD_URL` = your blob URL
   - Apply to all environments

2. Update `src/pages/StudentDownload.tsx` to use the environment variable (see next section)

### Option B: Direct URL (Quick Fix)

Simply update the URL in `src/pages/StudentDownload.tsx` directly with your blob URL.

## Step 6: Redeploy

After setting environment variables:
1. Go to Vercel Dashboard
2. Trigger a new deployment (or push a commit)
3. Test the download!

## Pricing Reference

**Free Tier (Hobby Plan):**
- ✅ 1 GB storage free
- ✅ 10 GB data transfer/month free
- $0.023/GB storage after free tier
- $0.05/GB data transfer after free tier

**Your APK:** 59.8 MB ≈ 0.06 GB
- Well within the free tier limits!
- About 167 downloads/month before hitting transfer limits

## Troubleshooting

### Script fails with "token not found"
- Make sure you've set the `BLOB_READ_WRITE_TOKEN` environment variable
- Check that you've created a blob store first

### Upload fails
- Verify the token is correct
- Check that the APK file exists at `public/TriMinder.apk`
- Ensure you have read permissions on the file

### Can't access blob store
- Make sure you're on the Vercel Pro plan or have access to Storage features
- Some features may require a paid plan

## Next Steps

After completing setup:
1. ✅ Your APK is hosted on Vercel's global CDN
2. ✅ Fast downloads worldwide
3. ✅ Professional solution for production
4. ✅ No more GitHub raw URL needed!

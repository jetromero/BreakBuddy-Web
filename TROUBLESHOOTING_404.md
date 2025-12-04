# Troubleshooting 404 Error for TriMinder.apk

## ✅ Current Status
- ✅ APK file is in repository: `public/TriMinder.apk`
- ✅ File size: 59.8 MB (under 100MB limit)
- ✅ File is committed to git (commit `ab1943a`)
- ✅ Configuration files are set up

## The Problem
Even though the file is in git, you're still getting a 404 error on Vercel.

## Solution Steps

### Step 1: Trigger a New Vercel Deployment

The file was committed 17 minutes ago, but Vercel might not have rebuilt yet, or the previous build might not have included it.

**Option A: Push a Small Change to Trigger Rebuild**
```bash
# Make a small change to trigger rebuild
echo "" >> README.md
git add README.md
git commit -m "Trigger Vercel rebuild for APK"
git push origin main
```

**Option B: Manually Trigger in Vercel Dashboard**
1. Go to your Vercel dashboard
2. Find your project
3. Click "Redeploy" on the latest deployment
4. Wait for build to complete

### Step 2: Check Vercel Build Logs

After deployment, check the build logs to ensure:
1. The file is being copied to `dist/TriMinder.apk`
2. No errors related to file size or permissions

Look for lines like:
```
✓ built in XXXms
```

### Step 3: Verify File in Build Output

In Vercel dashboard:
1. Go to your deployment
2. Click on "Functions" or "Source" tab
3. Check if `TriMinder.apk` is listed in the output files

### Step 4: Test After Rebuild

Wait 2-3 minutes after deployment completes, then test:
```
https://your-vercel-url.vercel.app/TriMinder.apk
```

### Step 5: Test Locally First (Recommended)

Before pushing to Vercel, test locally:

```bash
# Build the project
npm run build

# Check if APK is in dist folder
# Windows PowerShell:
Test-Path dist/TriMinder.apk

# Git Bash:
ls -lh dist/TriMinder.apk

# Preview locally
npm run preview
```

Then test locally: `http://localhost:4173/TriMinder.apk`

If it works locally but not on Vercel, it's a Vercel configuration issue.

## Alternative Solution: Direct GitHub Raw URL

If Vercel continues to have issues, you can temporarily use GitHub's raw file URL:

Update `src/pages/StudentDownload.tsx`:

```typescript
const handleDownload = () => {
    // Direct GitHub raw URL
    window.open('https://raw.githubusercontent.com/Russelatan/triminder-web/main/public/TriMinder.apk', '_blank')
}
```

This will work immediately while you troubleshoot Vercel.

## Common Issues & Fixes

### Issue 1: File Not in Build Output
**Symptom**: File exists in git but not in `dist/` after build

**Fix**: Vite should copy files from `public/` automatically. If not:
1. Check `vite.config.ts` - ensure no custom public directory config
2. Verify file is exactly at `public/TriMinder.apk` (case-sensitive)

### Issue 2: Routing Interference
**Symptom**: 404 error even though file exists

**Fix**: The `vercel.json` rewrite pattern should allow static files. Verify:
- Files with extensions (like `.apk`) should be served directly
- Rewrite only applies to routes without file extensions

### Issue 3: Cache Issues
**Symptom**: File works sometimes but not others

**Fix**: Clear browser cache or test in incognito mode

## Next Steps

1. **First**: Test build locally with `npm run build` and check `dist/` folder
2. **Second**: Trigger a new Vercel deployment
3. **Third**: Check Vercel build logs for errors
4. **Fourth**: If still failing, use GitHub raw URL as temporary solution

Let me know what you find in the build logs or local test!





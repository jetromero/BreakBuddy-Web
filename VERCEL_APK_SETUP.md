# TriMinder APK Setup for Vercel

## Problem
The APK file is returning a 404 error on Vercel.

## Solution Steps

### 1. Verify APK File Location
The APK file should be located at:
```
public/TriMinder.apk
```

### 2. Ensure File is Committed to Git
**This is the most common issue!** Vercel builds from your git repository, so the APK file must be committed.

Check if the file is tracked:
```bash
git status
git ls-files public/TriMinder.apk
```

If not committed, add and commit it:
```bash
git add public/TriMinder.apk
git commit -m "Add TriMinder APK file"
git push
```

### 3. Check File Size
- GitHub has a 100MB file size limit
- If your APK is larger than 100MB, you have two options:

#### Option A: Use Git LFS (Recommended for large files)
```bash
# Install Git LFS
git lfs install

# Track APK files with LFS
git lfs track "*.apk"

# Add the .gitattributes file
git add .gitattributes

# Add the APK file
git add public/TriMinder.apk
git commit -m "Add TriMinder APK with Git LFS"
git push
```

#### Option B: Host APK Externally
- Upload APK to cloud storage (AWS S3, Google Cloud Storage, etc.)
- Update `StudentDownload.tsx` to use the external URL:
```typescript
window.open('https://your-storage-url.com/TriMinder.apk', '_blank')
```

### 4. Verify Build Output
After deploying, check Vercel's build logs to ensure:
- The file is copied to `dist/TriMinder.apk` during build
- No errors related to the APK file

### 5. Test the Configuration
1. Build locally: `npm run build`
2. Check if `dist/TriMinder.apk` exists
3. Test locally: `npm run preview` and try accessing `/TriMinder.apk`

### 6. Current Configuration
The `vercel.json` is configured to:
- Serve static files from `dist/` directory
- Apply proper headers for APK downloads
- Handle SPA routing for React app

## Alternative: Direct Download Link
If you continue having issues, consider hosting the APK on a CDN or file hosting service and updating the download link in `StudentDownload.tsx`.





/**
 * Script to upload TriMinder.apk to Vercel Blob Storage
 * 
 * Usage:
 * 1. Install dependencies: npm install @vercel/blob
 * 2. Set BLOB_READ_WRITE_TOKEN environment variable
 * 3. Run: node scripts/upload-apk.js
 * 
 * Or create .env.local file:
 * BLOB_READ_WRITE_TOKEN=your_token_here
 */

import { put } from '@vercel/blob'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function uploadAPK() {
  try {
    // Check for token
    const token = process.env.BLOB_READ_WRITE_TOKEN
    
    if (!token) {
      console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is required')
      console.log('\nTo get your token:')
      console.log('1. Go to Vercel Dashboard → Your Project → Storage')
      console.log('2. Create a Blob store if you haven\'t already')
      console.log('3. Copy the BLOB_READ_WRITE_TOKEN')
      console.log('4. Set it: export BLOB_READ_WRITE_TOKEN=your_token')
      console.log('   Or create .env.local file with: BLOB_READ_WRITE_TOKEN=your_token')
      process.exit(1)
    }

    // Path to APK file
    const apkPath = join(__dirname, '..', 'public', 'TriMinder.apk')
    
    console.log('📦 Reading APK file...')
    const file = readFileSync(apkPath)
    
    console.log('📤 Uploading to Vercel Blob Storage...')
    console.log(`   File size: ${(file.length / 1024 / 1024).toFixed(2)} MB`)
    
    const blob = await put('TriMinder.apk', file, {
      access: 'public',
      contentType: 'application/vnd.android.package-archive',
      allowOverwrite: true,
    })

    console.log('\n✅ Upload successful!')
    console.log('\n📎 Blob URL:', blob.url)
    console.log('\n🔗 Next steps:')
    console.log('1. Add this to your Vercel environment variables:')
    console.log(`   VITE_APK_DOWNLOAD_URL=${blob.url}`)
    console.log('\n2. Or update StudentDownload.tsx directly with this URL')
    console.log('\n💡 The file is now publicly accessible at:', blob.url)
    
  } catch (error) {
    console.error('❌ Upload failed:', error)
    if (error.message) {
      console.error('Error message:', error.message)
    }
    process.exit(1)
  }
}

uploadAPK()


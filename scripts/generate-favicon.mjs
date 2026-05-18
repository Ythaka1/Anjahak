import sharp from 'sharp'

await sharp('public/images/logo.png')
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32x32.png')

await sharp('public/images/logo.png')
  .resize(16, 16)
  .png()
  .toFile('public/favicon-16x16.png')

await sharp('public/images/logo.png')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')

await sharp('public/images/logo.png')
  .resize(192, 192)
  .png()
  .toFile('public/android-chrome-192x192.png')

await sharp('public/images/logo.png')
  .resize(512, 512)
  .png()
  .toFile('public/android-chrome-512x512.png')

console.log('All favicons generated')

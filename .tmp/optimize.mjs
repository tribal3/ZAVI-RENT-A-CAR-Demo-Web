import sharp from 'sharp'
import { rename, unlink, access } from 'node:fs/promises'

const cars = [
  ['c5.jpg', 'economy-polo.jpg'],
  ['c14.jpg', 'economy-fiat.jpg'],
  ['c22.jpg', 'sedan-camry.jpg'],
  ['c16.jpg', 'sedan-accent.jpg'],
  ['c17.jpg', 'sedan-model3.jpg'],
  ['c21.jpg', 'suv-rangerover.jpg'],
  ['c6.jpg', 'suv-crv.jpg'],
  ['c13.jpg', 'family-expedition.jpg'],
  ['c19.jpg', 'luxury-amg.jpg'],
  ['c18.jpg', 'luxury-m4.jpg'],
  ['c2.jpg', 'luxury-camaro.jpg'],
]

for (const [src, out] of cars) {
  await sharp(`public/images/cars/${src}`)
    .resize(1000, 640, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 76, mozjpeg: true, progressive: true })
    .toFile(`public/images/cars/${out}`)
  console.log('car ->', out)
}

await sharp('public/images/cars/hero-src.jpg')
  .resize(2000, 1250, { fit: 'cover' })
  .jpeg({ quality: 78, mozjpeg: true, progressive: true })
  .toFile('public/images/cars/hero.jpg')

const dests = [
  ['muscat.jpg', 'muscat.jpg'],
  ['nizwa.jpg', 'nizwa.jpg'],
  ['jebel.jpg', 'jebel-akhdar.jpg'],
  ['sur.jpg', 'sur.jpg'],
  ['wadi-shab.jpg', 'wadi-shab.jpg'],
]
for (const [src, out] of dests) {
  await sharp(`public/images/dest/${src}`)
    .resize(1000, 750, { fit: 'cover' })
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(`.tmp/dest-${out}`)
  console.log('dest ->', out)
}
for (const [, out] of dests) {
  await rename(`.tmp/dest-${out}`, `public/images/dest/${out}`)
}

// Previews for visual checking
await sharp('public/images/dest/jebel-akhdar.jpg').resize(640).toFile('.tmp/preview-jebel.jpg')
await sharp('public/images/dest/wadi-shab.jpg').resize(640).toFile('.tmp/preview-wadi.jpg')

const unused = [
  'c1.jpg', 'c3.jpg', 'c4.jpg', 'c7.jpg', 'c8.jpg', 'c9.jpg', 'c10.jpg', 'c11.jpg', 'c12.jpg',
  'c15.jpg', 'c20.jpg', 'hero-src.jpg',
  ...cars.map(([src]) => src),
]
for (const f of unused) {
  try { await unlink(`public/images/cars/${f}`) } catch { console.log('skip', f) }
}
for (const f of ['wadi-tiwi.jpg', 'jebel.jpg']) {
  try { await unlink(`public/images/dest/${f}`) } catch { console.log('skip dest', f) }
}
console.log('done')


import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const configPath = path.join(root, 'qr', 'config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

const targetUrl = process.env.QR_TARGET_URL?.trim() || config.targetUrl
const outputName = config.outputFile || 'qr-order-landing.png'
const outputPath = path.join(root, 'qr', outputName)

await QRCode.toFile(outputPath, targetUrl, {
  type: 'png',
  width: 640,
  margin: 2,
  color: {
    dark: '#1a2e1a',
    light: '#ffffff',
  },
  errorCorrectionLevel: 'M',
})

console.log(`تم إنشاء QR: ${outputPath}`)
console.log(`الرابط المشفّر: ${targetUrl}`)

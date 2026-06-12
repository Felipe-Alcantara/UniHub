import { chromium } from 'playwright'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS = join(__dirname, '..', 'docs')
const htmlPath = join(DOCS, 'Relatorio_Hackathon_ATLETIZA.html')
const outPath = join(DOCS, 'Relatorio_Hackathon_ATLETIZA.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
})
await browser.close()
console.log('Wrote', outPath)

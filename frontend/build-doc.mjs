import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS = join(__dirname, '..', 'docs')
const htmlPath = join(DOCS, 'Relatorio_Hackathon_ATLETIZA.html')
const outPath = join(DOCS, 'Relatorio_Hackathon_ATLETIZA.doc')

let html = readFileSync(htmlPath, 'utf8')

// Inline every <img src="..."> as a base64 data URI so the .doc is self-contained.
const mime = (p) => (/\.png$/i.test(p) ? 'image/png' : /\.jpe?g$/i.test(p) ? 'image/jpeg' : 'application/octet-stream')

html = html.replace(/src="([^"]+)"/g, (m, src) => {
  if (src.startsWith('data:') || src.startsWith('http')) return m
  // Resolve relative to the docs folder (where the html lives)
  const abs = join(DOCS, src.replace(/^\.\//, '').replace(/^\.\.\//, '../'))
  try {
    const buf = readFileSync(abs)
    return `src="data:${mime(abs)};base64,${buf.toString('base64')}"`
  } catch (e) {
    console.warn('  ! could not inline', src, '-', e.message)
    return m
  }
})

// Word-specific header so Office opens it as a Word document with A4 page setup.
const wordMeta = `
<!--[if gte mso 9]>
<xml>
<w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument>
</xml>
<![endif]-->
<style>
@page { size: A4; margin: 1.6cm 1.8cm; }
body { -webkit-print-color-adjust: exact; }
</style>
`

html = html.replace('</head>', `${wordMeta}</head>`)

writeFileSync(outPath, html, 'utf8')
console.log('Wrote', outPath, '(' + (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) + ' MB)')

import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'docs', 'screenshots')
mkdirSync(OUT, { recursive: true })

const BASE = 'http://localhost:3000/UniHub'
const PASSWORD = process.env.UNIHUB_DEMO_PASSWORD ?? ''
if (!PASSWORD) {
  console.error('Defina UNIHUB_DEMO_PASSWORD com a senha das contas demo deste ambiente.')
  process.exit(1)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function login(page, email) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await sleep(2600) // cinematic animation
  await page.fill('#login-email', email)
  await page.fill('#login-password', PASSWORD)
  await sleep(300)
  await page.click('button[type="submit"]')
  await page.waitForFunction(() => !document.querySelector('#login-email'), { timeout: 15000 })
  await sleep(1600)
}

// Navigate within the SPA by clicking a sidebar link (preserves in-memory auth).
async function goVia(page, linkText, file) {
  // Use the sidebar nav link; .first() avoids duplicate navbar/sidebar matches.
  const link = page.getByRole('link', { name: linkText, exact: true }).first()
  await link.click()
  await sleep(1500) // framer-motion entrance + images
  await page.screenshot({ path: join(OUT, `${file}.png`), fullPage: true })
  console.log('captured', file)
}

async function run() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } })

  // --- 1. Login screen (capture before authenticating) ---
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await sleep(2800)
  await page.screenshot({ path: join(OUT, 'login.png') })
  console.log('captured login')

  // --- 2. Student session ---
  await login(page, 'aluno@atletiza.com')

  // Home (already here post-login)
  await sleep(600)
  await page.screenshot({ path: join(OUT, 'home.png'), fullPage: true })
  console.log('captured home')

  await goVia(page, 'Agenda', 'agenda')

  // Event detail: click first event card/button inside the calendar
  try {
    const opener = page.locator('[role="button"], button, a').filter({ hasText: /confirmar|detalhe|ver|treino|evento/i }).first()
    if (await opener.count()) {
      await opener.click()
      await sleep(1500)
      if (/\/events\//.test(page.url())) {
        await page.screenshot({ path: join(OUT, 'detalhe-evento.png'), fullPage: true })
        console.log('captured detalhe-evento')
      }
    }
  } catch (e) { console.log('detalhe-evento skip:', e.message) }

  await goVia(page, 'Agenda', 'agenda') // ensure back on a known nav
  await goVia(page, 'Modalidades', 'modalidades')

  // Sport detail
  try {
    const card = page.locator('a[href*="/sports/"], [role="button"], button').filter({ hasText: /ver|detalhe|participar|solicitar/i }).first()
    if (await card.count()) {
      await card.click()
      await sleep(1500)
      if (/\/sports\/.+/.test(page.url())) {
        await page.screenshot({ path: join(OUT, 'detalhe-modalidade.png'), fullPage: true })
        console.log('captured detalhe-modalidade')
      }
    }
  } catch (e) { console.log('detalhe-modalidade skip:', e.message) }

  await goVia(page, 'Modalidades', 'modalidades')
  await goVia(page, 'Links', 'links')
  await goVia(page, 'Vitrine', 'vitrine')
  await goVia(page, 'Carteirinha', 'carteirinha')
  await goVia(page, 'Mural', 'mural')
  await goVia(page, 'Horas', 'horas')

  // --- 3. Admin/board session for the diretoria panel ---
  try {
    await login(page, 'admin@exemple.com')
    await sleep(800)
    const boardLink = page.getByRole('link', { name: /painel|diretoria|board/i }).first()
    if (await boardLink.count()) {
      await boardLink.click()
    } else {
      await page.goto(`${BASE}/board`, { waitUntil: 'networkidle' })
    }
    await sleep(1600)
    await page.screenshot({ path: join(OUT, 'painel-diretoria.png'), fullPage: true })
    console.log('captured painel-diretoria')
  } catch (e) { console.log('painel skip:', e.message) }

  await browser.close()
  console.log('DONE')
}

run().catch((e) => { console.error(e); process.exit(1) })

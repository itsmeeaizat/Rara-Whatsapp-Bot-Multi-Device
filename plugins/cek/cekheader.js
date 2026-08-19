// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'cekheader', alias: ['headers', 'httpheader'], category: 'cek', description: 'Cek HTTP headers website', usage: '.cekheader <url>', example: '.cekheader google.com', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan URL!\n\nContoh: .cekheader google.com')
    let url = text.startsWith('http') ? text : 'https://' + text
    try {
        const res = await axios.get(url, { timeout: 10000 })
        const h = res.headers
        let lines = ['╭┈❀ *HTTP HEADERS*', '┃', '┃ ◦ URL: ' + url, '┃ ◦ Status: ' + res.status, '┃', '┃ ◦ Server: ' + (h.server || 'N/A'), '┃ ◦ Content-Type: ' + (h['content-type'] || 'N/A'), '┃ ◦ X-Powered-By: ' + (h['x-powered-by'] || 'N/A'), '┃ ◦ Cache-Control: ' + (h['cache-control'] || 'N/A'), '┃ ◦ Content-Length: ' + (h['content-length'] || 'N/A'), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Gagal mengambil headers: ' + e.message) }
}
export { pluginConfig as config, handler }

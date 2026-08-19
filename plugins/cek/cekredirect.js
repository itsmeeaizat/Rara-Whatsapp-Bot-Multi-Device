// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'cekredirect', alias: ['redirect', 'redircheck'], category: 'cek', description: 'Cek redirect chain URL', usage: '.cekredirect <url>', example: '.cekredirect bit.ly/abc', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan URL!\n\nContoh: .cekredirect bit.ly/abc')
    let url = text.startsWith('http') ? text : 'https://' + text
    try {
        const res = await axios.get(url, { maxRedirects: 10, timeout: 10000, validateStatus: () => true })
        let lines = ['╭┈❀ *CEK REDIRECT*', '┃', '┃ ◦ URL Awal: ' + url, '┃ ◦ URL Akhir: ' + res.request.res.responseUrl || res.config.url, '┃ ◦ Status: ' + res.status, '┃ ◦ Redirects: ' + (res.request._redirectable?._redirectCount || 0), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        return m.reply('Gagal cek redirect: ' + e.message)
    }
}
export { pluginConfig as config, handler }

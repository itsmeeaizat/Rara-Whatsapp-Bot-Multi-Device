// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'wiktionary', alias: ['wikt', 'kamus'], category: 'search', description: 'Cari definisi di Wiktionary', usage: '.wiktionary <kata>', example: '.wiktionary love', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata!\n\nContoh: .wiktionary love')
    try {
        const res = await axios.get('https://en.wiktionary.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(text) + '&format=json&origin=*')
        const results = res.data.query?.search || []
        if (!results.length) return m.reply('Tidak ada definisi untuk: ' + text)
        const top = results[0]
        let lines = ['╭┈❀ *WIKTIONARY*', '┃', '┃ ◦ Kata: ' + top.title, '┃']
        const snippet = top.snippet.replace(/<[^>]+>/g, '')
        lines.push('┃ ◦ Definisi: ' + snippet.slice(0, 200))
        lines.push('┃', '┃ ◦ URL: https://en.wiktionary.org/wiki/' + encodeURIComponent(top.title))
        lines.push('╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

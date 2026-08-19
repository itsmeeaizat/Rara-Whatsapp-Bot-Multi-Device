// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'charanime', alias: ['charinfo', 'karakter'], category: 'info', description: 'Info karakter anime via Jikan', usage: '.charanime <nama>', example: '.charanime Naruto', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama karakter!\n\nContoh: .charanime Naruto')
    try {
        const res = await axios.get('https://api.jikan.moe/v4/characters?q=' + encodeURIComponent(text) + '&limit=1')
        const c = res.data.data?.[0]
        if (!c) return m.reply('Karakter tidak ditemukan: ' + text)
        let lines = ['╭┈❀ *KARAKTER ANIME*', '┃', '┃ ◦ Nama: ' + (c.name || 'N/A'), '┃ ◦ Nama (Kanji): ' + (c.name_kanji || 'N/A'), '┃ ◦ Favorit: ' + (c.favorites || 0), '┃', '┃ ◦ Tentang: ' + (c.about || 'N/A').slice(0, 300), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

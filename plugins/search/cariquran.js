// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'cariquran', alias: ['quransearch', 'carived'], category: 'search', description: 'Cari ayat Al-Quran', usage: '.cariquran <kata>', example: '.cariquran sabar', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata kunci!\n\nContoh: .cariquran sabar')
    try {
        const res = await axios.get('https://api.quran.com/api/v4/search?q=' + encodeURIComponent(text) + '&language=id&size=3')
        const verses = res.data.search?.results || []
        if (!verses.length) return m.reply('Tidak ada hasil untuk: ' + text)
        let lines = ['╭┈❀ *CARI AYAT QURAN*', '┃', '┃ ◦ Query: ' + text, '┃']
        verses.forEach((v, i) => {
            lines.push('┃ ◦ ' + (i+1) + '. ' + (v.verse_key || ''))
            if (v.text) lines.push('┃   Arab: ' + v.text)
            if (v.translations) lines.push('┃   Arti: ' + (v.translations[0]?.text || '').slice(0, 150))
            if (i < verses.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

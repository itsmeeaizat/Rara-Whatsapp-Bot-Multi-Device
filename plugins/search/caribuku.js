// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'caribuku', alias: ['buku', 'booksearch'], category: 'search', description: 'Cari buku via Google Books', usage: '.caribuku <judul>', example: '.caribuku pemrograman', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan judul buku!\n\nContoh: .caribuku pemrograman')
    try {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(text) + '&maxResults=5')
        const items = res.data.items || []
        if (!items.length) return m.reply('Tidak ada buku untuk: ' + text)
        let lines = ['╭┈❀ *CARI BUKU*', '┃', '┃ ◦ Query: ' + text, '┃']
        items.forEach((b, i) => {
            const v = b.volumeInfo || {}
            lines.push('┃ ◦ ' + (i+1) + '. ' + (v.title || 'N/A'))
            lines.push('┃   Penulis: ' + ((v.authors || []).join(', ') || 'N/A'))
            lines.push('┃   Terbit: ' + (v.publishedDate || 'N/A'))
            if (v.description) lines.push('┃   Desc: ' + v.description.slice(0, 100))
            if (i < items.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

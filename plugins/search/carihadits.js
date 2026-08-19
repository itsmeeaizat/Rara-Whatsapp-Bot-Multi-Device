// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'carihadits', alias: ['haditssearch', 'carihadis'], category: 'search', description: 'Cari hadits', usage: '.carihadits <kata>', example: '.carihadits sabar', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata kunci!\n\nContoh: .carihadits sabar')
    try {
        const res = await axios.get('https://api.hadith.gading.dev/books/muslim?range=1-20')
        const data = res.data.data || res.data
        const items = data?.hadiths || data?.items || []
        if (!items.length) return m.reply('API hadits sedang bermasalah, coba lagi nanti')
        const random = items[Math.floor(Math.random() * items.length)]
        let lines = ['╭┈❀ *HADITS*', '┃', '┃ ◦ Kitab: Muslim', '┃ ◦ Nomor: ' + (random.number || 'N/A'), '┃']
        if (random.arab) lines.push('┃ ◦ Arab: ' + random.arab)
        if (random.id) lines.push('┃ ◦ Arti: ' + random.id)
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

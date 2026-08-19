// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'devto', alias: ['dev', 'devtoarticle'], category: 'search', description: 'Cari artikel di Dev.to', usage: '.devto <tag>', example: '.devto javascript', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan tag!\n\nContoh: .devto javascript')
    try {
        const res = await axios.get('https://dev.to/api/articles?tag=' + encodeURIComponent(text) + '&per_page=5')
        const items = res.data || []
        if (!items.length) return m.reply('Tidak ada artikel untuk tag: ' + text)
        let lines = ['╭┈❀ *DEV.TO ARTICLES*', '┃', '┃ ◦ Tag: ' + text, '┃']
        items.forEach((a, i) => {
            lines.push('┃ ◦ ' + (i+1) + '. ' + a.title)
            lines.push('┃   Author: ' + (a.user?.name || a.user?.username || 'N/A'))
            lines.push('┃   Published: ' + (a.published_at || 'N/A').slice(0, 10))
            lines.push('┃   Reactions: ' + a.public_reactions_count)
            lines.push('┃   URL: ' + a.url)
            if (i < items.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

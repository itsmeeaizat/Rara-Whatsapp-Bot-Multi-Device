// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'stackoverflow', alias: ['so', 'stack'], category: 'search', description: 'Cari pertanyaan di Stack Overflow', usage: '.stackoverflow <query>', example: '.stackoverflow async await', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata kunci!\n\nContoh: .stackoverflow async await')
    try {
        const res = await axios.get('https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=' + encodeURIComponent(text) + '&site=stackoverflow&pagesize=5')
        const items = res.data.items || []
        if (!items.length) return m.reply('Tidak ada hasil untuk: ' + text)
        let lines = ['╭┈❀ *STACK OVERFLOW*', '┃', '┃ ◦ Query: ' + text, '┃']
        items.forEach((q, i) => {
            lines.push('┃ ◦ ' + (i+1) + '. ' + q.title)
            lines.push('┃   Score: ' + q.score + ' | Answers: ' + q.answer_count)
            lines.push('┃   Tags: ' + (q.tags || []).join(', '))
            lines.push('┃   URL: ' + q.link)
            if (i < items.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'aipoem', alias: ['poem', 'puisien'], category: 'ai', description: 'Puisi acak dari PoetryDB', usage: '.aipoem', example: '.aipoem', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://poetrydb.org/random')
        const p = res.data[0]
        let lines = ['╭┈❀ *RANDOM POEM*', '┃', '┃ ◦ Title: ' + (p.title || 'N/A'), '┃ ◦ Author: ' + (p.author || 'N/A'), '┃']
        const text = (p.lines || []).slice(0, 10)
        text.forEach(l => lines.push('┃ ◦ ' + l))
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

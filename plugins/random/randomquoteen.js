// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomquoteen', alias: ['quoteen', 'quote'], category: 'random', description: 'Quote acak bahasa Inggris', usage: '.randomquoteen', example: '.randomquoteen', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://api.quotable.io/random')
        let lines = ['╭┈❀ *RANDOM QUOTE*', '┃', '┃ ◦ "' + res.data.content + '"', '┃', '┃ ◦ -- ' + res.data.author, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

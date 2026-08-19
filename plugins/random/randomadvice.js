// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomadvice', alias: ['advice', 'saran'], category: 'random', description: 'Saran acak dari Advice Slip API', usage: '.randomadvice', example: '.randomadvice', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://api.adviceslip.com/advice')
        let lines = ['╭┈❀ *RANDOM ADVICE*', '┃', '┃ ◦ ' + res.data.slip.advice, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

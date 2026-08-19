// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomjoke', alias: ['joke', 'lelucon'], category: 'random', description: 'Joke acak dari JokeAPI', usage: '.randomjoke', example: '.randomjoke', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode')
        const d = res.data
        let lines = ['╭┈❀ *RANDOM JOKE*', '┃']
        if (d.type === 'twopart') { lines.push('┃ ◦ ' + d.setup, '┃', '┃ ◦ ' + d.delivery) }
        else { lines.push('┃ ◦ ' + d.joke) }
        lines.push('┃', '┃ ◦ Category: ' + (d.category || 'N/A'), '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

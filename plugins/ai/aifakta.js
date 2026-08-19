// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'aifakta', alias: ['faktaen', 'fact'], category: 'ai', description: 'Fakta menarik bahasa Inggris', usage: '.aifakta', example: '.aifakta', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
        let lines = ['╭┈❀ *INTERESTING FACT*', '┃', '┃ ◦ ' + res.data.text, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        const facts = ['Honey never spoils.', 'A shrimp\'s heart is in its head.', 'Octopuses have three hearts.', 'A group of flamingos is called a flamboyance.']
        return m.reply('╭┈❀ *INTERESTING FACT*\n┃\n┃ ◦ ' + facts[Math.floor(Math.random()*facts.length)] + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    }
}
export { pluginConfig as config, handler }

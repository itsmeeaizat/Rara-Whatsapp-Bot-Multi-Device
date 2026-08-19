// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomcat', alias: ['cat', 'kucing'], category: 'random', description: 'Gambar kucing acak', usage: '.randomcat', example: '.randomcat', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m, { sock }) {
    try {
        await sock.sendMessage(m.chat, { image: { url: 'https://cataas.com/cat' }, caption: '╭┈❀ *RANDOM CAT*\n┃\n┃ ◦ Source: cataas.com\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

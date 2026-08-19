// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomfox', alias: ['fox', 'rubah'], category: 'random', description: 'Gambar rubah acak', usage: '.randomfox', example: '.randomfox', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m, { sock }) {
    try {
        const res = await axios.get('https://randomfox.ca/floof/')
        await sock.sendMessage(m.chat, { image: { url: res.data.image }, caption: '╭┈❀ *RANDOM FOX*\n┃\n┃ ◦ Source: randomfox.ca\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

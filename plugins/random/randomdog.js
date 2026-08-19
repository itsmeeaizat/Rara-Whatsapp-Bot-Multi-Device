// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'randomdog', alias: ['dog', 'anjing'], category: 'random', description: 'Gambar anjing acak dari Dog CEO', usage: '.randomdog', example: '.randomdog', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m, { sock }) {
    try {
        const res = await axios.get('https://dog.ceo/api/breeds/image/random')
        await sock.sendMessage(m.chat, { image: { url: res.data.message }, caption: '╭┈❀ *RANDOM DOG*\n┃\n┃ ◦ Source: dog.ceo\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

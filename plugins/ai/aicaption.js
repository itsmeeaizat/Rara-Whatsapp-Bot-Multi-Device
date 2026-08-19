// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aicaption', alias: ['captionai', 'capgen'], category: 'ai', description: 'Generate caption Instagram dari teks', usage: '.aicaption <tema foto>', example: '.aicaption liburan di Bali', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan tema!\n\nContoh: .aicaption liburan di Bali')
    try {
        m.react('🕕')
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent('instagram worthy photo of ' + text + ', aesthetic, professional') + '?width=1080&height=1080&nologo=true&model=flux'
        const captions = [
            'Life is better with ' + text.toLowerCase(),
            'Vibes ' + text.toLowerCase(),
            'This is the moment ' + text.toLowerCase(),
            'Nothing beats ' + text.toLowerCase(),
            'Pure joy ' + text.toLowerCase()
        ]
        const cap = captions[Math.floor(Math.random() * captions.length)]
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *AI CAPTION + IMAGE*\n┃\n┃ ◦ ' + cap + '\n┃ ◦ Tema: ' + text + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

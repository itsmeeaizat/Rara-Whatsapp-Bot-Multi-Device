// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aiwallpaper', alias: ['wallpaperai', 'wallai'], category: 'ai', description: 'Generate wallpaper HD dari teks', usage: '.aiwallpaper <tema>', example: '.aiwallpaper galaxy nebula', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan tema!\n\nContoh: .aiwallpaper galaxy nebula')
    try {
        m.react('🕕')
        const enhanced = text + ', 4k wallpaper, ultra detailed, high quality, beautiful'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1920&height=1080&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *AI WALLPAPER*\n┃\n┃ ◦ Tema: ' + text + '\n┃ ◦ Resolusi: 1920x1080\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

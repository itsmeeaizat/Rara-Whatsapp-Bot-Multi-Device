// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'ailandscape', alias: ['landscape', 'aiscape'], category: 'ai', description: 'Generate landscape wallpaper', usage: '.ailandscape <prompt>', example: '.ailandscape tropical beach sunset', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .ailandscape tropical beach sunset')
    try {
        m.react('🕕')
        const enhanced = text + ', landscape, wallpaper, wide shot, scenic, 8k, high detail'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1280&height=720&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *LANDSCAPE AI*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Ratio: 16:9\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

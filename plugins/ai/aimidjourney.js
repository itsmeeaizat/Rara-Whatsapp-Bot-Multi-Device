// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aimidjourney', alias: ['midjourney', 'mj', 'aimj'], category: 'ai', description: 'Generate gambar Midjourney style', usage: '.aimidjourney <prompt>', example: '.aimidjourney dreamy landscape, 8k, cinematic', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aimidjourney dreamy landscape, 8k, cinematic')
    try {
        m.react('🕕')
        const enhanced = text + ', midjourney style, highly detailed, 8k, cinematic lighting, sharp focus'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1280&height=720&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *MIDJOURNEY STYLE*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Ratio: 16:9\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aicyberpunk', alias: ['cyberpunk', 'cpunk'], category: 'ai', description: 'Generate gambar Cyberpunk style', usage: '.aicyberpunk <prompt>', example: '.aicyberpunk neon city street at night', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aicyberpunk neon city street at night')
    try {
        m.react('🕕')
        const enhanced = text + ', cyberpunk style, neon lights, blade runner aesthetic, futuristic, 8k'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1024&height=1024&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *CYBERPUNK AI*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aipixelart', alias: ['pixelart', 'pixel'], category: 'ai', description: 'Generate pixel art dari teks', usage: '.aipixelart <prompt>', example: '.aipixelart a knight standing in forest', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aipixelart a knight standing in forest')
    try {
        m.react('🕕')
        const enhanced = text + ', pixel art, 16-bit, retro game style, detailed pixel'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=512&height=512&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *PIXEL ART AI*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

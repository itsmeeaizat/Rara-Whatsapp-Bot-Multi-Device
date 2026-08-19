// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'ai3drender', alias: ['3drender', 'render3d'], category: 'ai', description: 'Generate 3D render dari teks', usage: '.ai3drender <prompt>', example: '.ai3drender a glass cube on table', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .ai3drender a glass cube on table')
    try {
        m.react('🕕')
        const enhanced = text + ', 3D render, octane render, blender, ultra realistic, 8k'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1024&height=1024&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *3D RENDER AI*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

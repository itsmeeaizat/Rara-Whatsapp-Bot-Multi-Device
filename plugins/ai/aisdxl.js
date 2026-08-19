// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aisdxl', alias: ['sdxl', 'sdxlai'], category: 'ai', description: 'Generate gambar Stable Diffusion XL', usage: '.aisdxl <prompt>', example: '.aisdxl portrait of a samurai', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aisdxl portrait of a samurai')
    try {
        m.react('🕕')
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent('SDXL style: ' + text) + '?width=1024&height=1024&nologo=true&model=flux&enhance=true'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *STABLE DIFFUSION XL*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

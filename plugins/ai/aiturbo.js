// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aiturbo', alias: ['turbo', 'turboai'], category: 'ai', description: 'Generate gambar dengan Turbo model (cepat)', usage: '.aiturbo <prompt>', example: '.aiturbo sunset over mountains', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 8, energi: 2, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aiturbo sunset over mountains')
    try {
        m.react('🕕')
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(text) + '?width=1024&height=1024&nologo=true&model=turbo'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *TURBO AI IMAGE*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Model: Turbo (Fast)\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

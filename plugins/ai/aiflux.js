// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aiflux', alias: ['flux', 'fluxai'], category: 'ai', description: 'Generate gambar dengan Flux model', usage: '.aiflux <prompt>', example: '.aiflux futuristic city at night', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aiflux futuristic city at night')
    try {
        m.react('🕕')
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(text) + '?width=1024&height=1024&nologo=true&model=flux&seed=' + Math.floor(Math.random()*999999)
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *FLUX AI IMAGE*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Model: Flux\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

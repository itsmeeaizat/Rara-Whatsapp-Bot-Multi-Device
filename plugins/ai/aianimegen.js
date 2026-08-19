// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aianimegen', alias: ['animegen', 'aianime'], category: 'ai', description: 'Generate gambar anime style', usage: '.aianimegen <prompt>', example: '.aianimegen girl with cherry blossoms', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aianimegen girl with cherry blossoms')
    try {
        m.react('🕕')
        const enhanced = text + ', anime style, detailed, studio quality, key visual, high quality'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1024&height=1024&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *ANIME GENERATOR*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

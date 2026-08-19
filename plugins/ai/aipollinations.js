// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aipollinations', alias: ['pollinations', 'aigen'], category: 'ai', description: 'Generate gambar dari teks via Pollinations (gratis)', usage: '.aipollinations <prompt>', example: '.aipollinations cat wearing sunglasses', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aipollinations cat wearing sunglasses')
    try {
        m.react('🕕')
        const w = aiConfig.default.imageWidth, h = aiConfig.default.imageHeight
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(text) + '?width=' + w + '&height=' + h + '&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *AI IMAGE (POLLINATIONS)*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Model: Flux\n┃ ◦ Size: ' + w + 'x' + h + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'ailogo', alias: ['logoai', 'logogen'], category: 'ai', description: 'Generate logo dari teks', usage: '.ailogo <nama brand>', example: '.ailogo Rara Tech', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan nama brand!\n\nContoh: .ailogo Rara Tech')
    try {
        m.react('六年级')
        const enhanced = 'minimalist professional logo design for "' + text + '", vector style, clean, modern, white background'
        const url = aiConfig.pollinations.baseURL + '/' + encodeURIComponent(enhanced) + '?width=1024&height=1024&nologo=true&model=flux'
        await sock.sendMessage(m.chat, { image: { url }, caption: '╭┈❀ *AI LOGO GENERATOR*\n┃\n┃ ◦ Brand: ' + text + '\n┃ ◦ Style: Minimalist\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

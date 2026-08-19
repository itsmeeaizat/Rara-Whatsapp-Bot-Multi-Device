// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aivision', alias: ['vision', 'aivisual'], category: 'ai', description: 'Tanya AI tentang gambar (Gemini Vision)', usage: '.aivision <pertanyaan> (reply gambar)', example: '.aivision apa di gambar ini?', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 10, energi: 5, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    const quoted = m.quoted
    if (!quoted || (!quoted.message?.imageMessage && !quoted.message?.stickerMessage)) return m.reply('Reply ke gambar dengan pertanyaan!\n\nContoh: .aivision apa di gambar ini?')
    if (!text) return m.reply('Masukkan pertanyaan tentang gambar!')
    if (!aiConfig.hasKey('gemini')) return m.reply('API Key Gemini belum di-set!\n\nSet di: src/config/ai-config.js → gemini.key')
    try {
        m.react('🕕')
        const buffer = await quoted.download()
        const base64 = buffer.toString('base64')
        const mime = quoted.message?.imageMessage?.mimetype || 'image/jpeg'
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.visionModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text }, { inline_data: { mime_type: mime, data: base64 } }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        let lines = ['╭┈❀ *AI VISION*', '┃', '┃ ◦ Q: ' + text, '┃', '┃ ◦ ' + result, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

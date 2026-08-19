// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aiexplain', alias: ['explain', 'jelaskan'], category: 'ai', description: 'Jelaskan isi gambar dengan AI', usage: '.aiexplain (reply gambar)', example: '.aiexplain', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 10, energi: 5, isEnabled: true }
async function handler(m, { sock }) {
    const quoted = m.quoted
    if (!quoted || (!quoted.message?.imageMessage && !quoted.message?.stickerMessage)) return m.reply('Reply ke gambar!')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        m.react('🕕')
        const buffer = await quoted.download()
        const base64 = buffer.toString('base64')
        const mime = quoted.message?.imageMessage?.mimetype || 'image/jpeg'
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.visionModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Jelaskan apa yang terjadi di gambar ini secara lengkap dalam bahasa Indonesia. Sertakan detail objek, warna, suasana, dan konteks.' }, { inline_data: { mime_type: mime, data: base64 } }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI EXPLAIN*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

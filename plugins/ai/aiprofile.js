// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aiprofile', alias: ['profileai', 'aibio'], category: 'ai', description: 'Generate bio/profile description', usage: '.aiprofile <nama/hobi>', example: '.aiprofile Dinda suka fotografi', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan info!\n\nContoh: .aiprofile Dinda suka fotografi')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Buat 3 versi bio profil menarik (untuk social media) dalam bahasa Indonesia berdasarkan info: ' + text + '. Masing-masing 2-3 kalimat dengan gaya berbeda.' }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI PROFILE BIO*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

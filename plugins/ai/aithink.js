// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aithink', alias: ['think', 'aianalyze'], category: 'ai', description: 'AI analisa & berpikir kritis', usage: '.aithink <masalah>', example: '.aithink pro kontra beli motor listrik', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 15, energi: 5, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan masalah!\n\nContoh: .aithink pro kontra beli motor listrik')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Analisa masalah berikut secara kritis dalam bahasa Indonesia. Berikan: 1. Konteks 2. Pro & Kontra 3. Solusi/Rekomendasi 4. Kesimpulan\n\nMasalah: ' + text }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI CRITICAL THINKING*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

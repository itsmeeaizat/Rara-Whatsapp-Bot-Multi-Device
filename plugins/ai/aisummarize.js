// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aisummarize', alias: ['summary', 'ringkas'], category: 'ai', description: 'Ringkas teks panjang dengan AI', usage: '.aisummarize <teks>', example: '.aisummarize <paste teks panjang>', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 10, energi: 5, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan teks yang ingin diringkas!')
    if (text.length < 100) return m.reply('Teks terlalu pendek untuk diringkas (min 100 karakter)')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Ringkas teks berikut dalam bahasa Indonesia menjadi 3-5 poin utama:\n\n' + text }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI SUMMARIZE*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

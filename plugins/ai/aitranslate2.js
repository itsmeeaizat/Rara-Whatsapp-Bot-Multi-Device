// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aitranslate2', alias: ['aitrans', 'transai'], category: 'ai', description: 'Translate teks dengan AI (multi bahasa)', usage: '.aitranslate2 <bahasa> <teks>', example: '.aitranslate2 english halo dunia', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 10, energi: 3, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Format: .aitranslate2 <bahasa> <teks>\n\nContoh: .aitranslate2 english halo dunia')
    const parts = text.split(' ')
    const lang = parts[0]
    const content = parts.slice(1).join(' ')
    if (!content) return m.reply('Masukkan teks yang ingin diterjemahkan!')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Terjemahkan teks berikut ke bahasa ' + lang + '. Tampilkan hanya hasil terjemahan:\n\n' + content }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI TRANSLATE*\n┃\n┃ ◦ Target: ' + lang + '\n┃ ◦ Original: ' + content.slice(0, 80) + '\n┃\n┃ ◦ Result: ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'ailirik', alias: ['lyricsai', 'lirik'], category: 'ai', description: 'Generate lirik lagu dengan AI', usage: '.ailirik <tema>', example: '.ailirik cinta sejati', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 15, energi: 5, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan tema lirik!\n\nContoh: .ailirik cinta sejati')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Tulis lirik lagu dalam bahasa Indonesia dengan tema: ' + text + '. Format: Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus. 2-3 baris per section.' }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI LYRICS GENERATOR*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aipuisi', alias: ['puisiai', 'poe'], category: 'ai', description: 'Generate puisi dengan AI', usage: '.aipuisi <tema>', example: '.aipuisi senja di pantai', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 15, energi: 5, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan tema puisi!\n\nContoh: .aipuisi senja di pantai')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Tulis puisi indah dalam bahasa Indonesia dengan tema: ' + text + '. 2-3 bait, penuh makna.' }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI POEM GENERATOR*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

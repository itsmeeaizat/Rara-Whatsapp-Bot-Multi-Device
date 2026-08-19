// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aistory', alias: ['story', 'cerita'], category: 'ai', description: 'Generate cerita dari prompt', usage: '.aistory <tema cerita>', example: '.aistory petualangan di hutan ajaib', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 15, energi: 5, isEnabled: true }
async function handler(m) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan tema cerita!\n\nContoh: .aistory petualangan di hutan ajaib')
    if (!aiConfig.hasKey('gemini')) return m.reply('Set API Key Gemini di: src/config/ai-config.js → gemini.key')
    try {
        const res = await axios.post(aiConfig.gemini.baseURL + '/models/' + aiConfig.gemini.textModel + ':generateContent?key=' + aiConfig.gemini.key, {
            contents: [{ parts: [{ text: 'Tulis cerita pendek (200-300 kata) dalam bahasa Indonesia dengan tema: ' + text + '. Buat menarik dengan alur dan ending yang baik.' }] }]
        })
        const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons'
        return m.reply('╭┈❀ *AI STORY GENERATOR*\n┃\n┃ ◦ ' + result + '\n┃\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

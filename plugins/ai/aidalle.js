// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
import { aiConfig } from "../../src/config/ai-config.js"
const pluginConfig = { name: 'aidalle', alias: ['dalle', 'dalle3'], category: 'ai', description: 'Generate gambar via OpenAI DALL-E (butuh API key)', usage: '.aidalle <prompt>', example: '.aidalle a cat in space', isOwner: false, isPremium: true, isGroup: false, isPrivate: false, cooldown: 15, energi: 5, isEnabled: true }
async function handler(m, { sock }) {
    const text = (m.args || []).join(' ').trim()
    if (!text) return m.reply('Masukkan prompt!\n\nContoh: .aidalle a cat in space')
    if (!aiConfig.hasKey('openai')) return m.reply('API Key OpenAI belum di-set!\n\nSet di: src/config/ai-config.js → openai.key')
    try {
        m.react('🕕')
        const res = await axios.post(aiConfig.openai.baseURL + '/images/generations', {
            model: aiConfig.openai.imageModel, prompt: text, n: 1, size: '1024x1024'
        }, { headers: { 'Authorization': 'Bearer ' + aiConfig.openai.key, 'Content-Type': 'application/json' } })
        await sock.sendMessage(m.chat, { image: { url: res.data.data[0].url }, caption: '╭┈❀ *DALL-E 3*\n┃\n┃ ◦ Prompt: ' + text.slice(0, 100) + '\n┃ ◦ Model: ' + aiConfig.openai.imageModel + '\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀' }, { quoted: m })
        m.react('✅')
    } catch (e) { m.react('❌'); return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

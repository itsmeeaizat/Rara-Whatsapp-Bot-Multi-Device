// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import config from '../../config.js'
import { getDatabase } from '../../src/lib/rara-database.js'

const pluginConfig = {
    name: 'rules',
    alias: ['aturanbot', 'botrules'],
    category: 'main',
    description: 'Menampilkan rules/aturan bot',
    usage: '.rules',
    example: '.rules',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

const DEFAULT_BOT_RULES = [
    'Jangan spam command',
    'Gunakan fitur dengan bijak',
    'Dilarang menyalahgunakan bot',
    'Hormati sesama pengguna',
    'Report bug ke owner',
    'Jangan request fitur aneh',
    'Bot bukan 24/7, ada maintenance'
]

async function handler(m, { sock, config: botConfig }) {
    try {
        const db = getDatabase()
        const customRules = db.setting('botRules')
        const botName = botConfig.bot?.name || 'Rara-AI'

        let rulesList = DEFAULT_BOT_RULES

        if (customRules) {
            if (Array.isArray(customRules)) {
                rulesList = customRules
            } else if (typeof customRules === 'string') {
                rulesList = customRules
                    .split('\n')
                    .map(v => v.replace(/^[^a-zA-Z0-9]+/, '').trim())
                    .filter(Boolean)
            }
        }

        let txt = `╭─〔 📜 *ʀᴜʟᴇs ʙᴏᴛ* 〕\n`
        txt += `┃\n`
        txt += `┃ *${botName}*\n`
        txt += `┃\n`
        for (let i = 0; i < rulesList.length; i++) {
            txt += `┃ ➤ *${i + 1}.* ${rulesList[i]}\n`
        }
        txt += `┃\n`
        txt += `┃ ⚠️ _Pelanggaran dapat mengakibatkan_\n`
        txt += `┃ _banned / kick dari bot_\n`
        txt += `╰────────────────⬣`

        await m.reply(txt)
    } catch (e) {
        m.reply('❌ Terjadi kesalahan saat mengambil rules')
    }
}

export { pluginConfig as config, handler }

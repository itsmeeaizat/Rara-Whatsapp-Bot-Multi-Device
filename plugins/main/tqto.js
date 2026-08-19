// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import config from '../../config.js'
import { AIRich } from '../../src/lib/rara-builder.js'

const pluginConfig = {
    name: 'tqto',
    alias: ['thanksto', 'credits', 'kredit'],
    category: 'main',
    description: 'Menampilkan daftar kontributor bot',
    usage: '.tqto',
    example: '.tqto',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const botName = config.bot?.name || 'Rara-AI'
    const version = config.bot?.version || '1.0.0'

    const credits = [
        { name: 'Aizat', role: 'Developer Rara Multi Device', icon: '👨‍💻' },
    ]

    const thanksLines = [
        'WhiskeySockets — Penyedia Baileys MD',
        'Penyedia APIs & Scrapers',
        'Kontributor Open Source',
    ]

    let txt = `╭─〔 🍟 *ᴛʜᴀɴᴋs ᴛᴏ* 〕\n`
    txt += `┃\n`
    txt += `┃ *Kontributor Utama*\n`
    for (const c of credits) {
        txt += `┃ ➤ *${c.name}* — ${c.icon} ${c.role}\n`
    }
    txt += `┃\n`
    txt += `┃ *Apresiasi*\n`
    for (const t of thanksLines) {
        txt += `┃ ➤ ${t}\n`
    }
    txt += `┃\n`
    txt += `┃ _Bot ${botName} v${version}_\n`
    txt += `┃ _Made in Indonesia 🇮🇩_\n`
    txt += `╰────────────────⬣`

    await m.reply(txt)
}

export { pluginConfig as config, handler }

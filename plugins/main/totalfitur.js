// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { getAllPlugins } from '../../src/lib/rara-plugins.js'
import config from '../../config.js'
import te from '../../src/lib/rara-error.js'

const pluginConfig = {
    name: 'totalfitur',
    alias: ['totalfeature', 'totalcmd', 'countplugin', 'distribusi'],
    category: 'main',
    description: 'Lihat total fitur/command bot',
    usage: '.totalfitur',
    example: '.totalfitur',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

const ICONS = {
    main: '🏠', tools: '🔧', downloader: '📥', download: '📥', sticker: '🎨',
    ai: '🤖', media: '📷', game: '🎮', rpg: '⚔️', maker: '🖼️', fun: '🎭',
    group: '👥', owner: '👑', premium: '💎', info: '📊', search: '🔍',
    canvas: '🎨', anime: '🌸', nsfw: '🔞', utility: '🛠️', economy: '💰',
    stalker: '🔎', random: '🎲', religi: '🕌', islamic: '☪️', cek: '✅',
    store: '🛒', panel: '🖥️', convert: '🔄', primbon: '🔮', tts: '🗣️',
    otp: '🔑', vps: '☁️', pushkontak: '📱', jpm: '🎰', ephoto: '📸',
    asupan: '🎞️', clan: '⚔️', berita: '📰', other: '📦'
}

async function handler(m, { sock }) {
    try {
        const allPlugins = getAllPlugins()
        const cats = {}
        let total = 0, enabled = 0

        for (const p of allPlugins) {
            if (!p.config) continue
            const cat = p.config.category || 'other'
            if (!cats[cat]) cats[cat] = { total: 0, enabled: 0 }
            cats[cat].total++
            total++
            if (p.config.isEnabled !== false) {
                cats[cat].enabled++
                enabled++
            }
        }

        await m.react('📊')

        const sorted = Object.entries(cats).sort((a, b) => b[1].total - a[1].total)
        const botName = config.bot?.name || 'Rara-AI'

        let txt = `╭─〔 📊 *ᴅɪsᴛʀɪʙᴜsɪ ꜰɪᴛᴜʀ* 〕\n`
        txt += `┃\n`
        txt += `┃ ➤ *Total:* ${total} fitur\n`
        txt += `┃ ➤ *Aktif:* ${enabled} fitur\n`
        txt += `┃ ➤ *Kategori:* ${sorted.length}\n`
        txt += `┃\n`

        for (const [cat, data] of sorted) {
            const icon = ICONS[cat] || '📦'
            txt += `┃ ${icon} *${cat.toUpperCase()}* — ${data.total} fitur\n`
        }

        txt += `┃\n`
        txt += `┃ _Bot ${botName} — Made in Indonesia 🇮🇩_\n`
        txt += `╰────────────────⬣`

        await m.reply(txt)

    } catch (error) {
        await m.react('☢')
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }

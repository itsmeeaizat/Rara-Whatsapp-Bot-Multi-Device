import config from '../../config.js'
import path from 'path'
import fs from 'fs'
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
    const developer = config.bot?.developer || 'Aizat'

    const credits = [
        { name: 'Aizat', role: 'Developer Rara Multi Device', icon: '👨‍💻' },
    ]

    const headers = ['No', 'Nama', 'Role / Tier']
    const rows = credits.map((c, i) => [i + 1, c.name, c.role])

    await m.reply(`🍟 *Berikut ini adalah orang orang yang sudah berkontribusi di bot ${config.bot.name}*
        
${credits.map((c, i) => `*${i + 1}*. *${c.name}* [ ${c.icon} ${c.role} ]`).join('\n')}}`)
}

export { pluginConfig as config, handler }

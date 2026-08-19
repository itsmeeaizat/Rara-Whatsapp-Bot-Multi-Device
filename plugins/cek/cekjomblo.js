// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekjomblo',
    alias: ['jomblo', 'single'],
    category: 'cek',
    description: 'Cek tingkat kejombloan kamu',
    usage: '.cekjomblo <nama>',
    example: '.cekjomblo Budi',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
        const percent = Math.floor(Math.random() * 101)
    const mentioned = m.mentionedJid[0] || m.sender
                    
    let desc = ''
    if (percent >= 90) desc = 'Jomblo abadi! Single is happiness~ 💔😎'
    else if (percent >= 70) desc = 'Strong independent person! 💪'
    else if (percent >= 50) desc = 'MasihPDKT mode ON 😍'
    else if (percent >= 30) desc = 'Ada yang naksir kayaknya~ 👀'
    else desc = 'Soon taken! 💕'
    
    let txt = mentioned === m.sender ? `╭─【 💔 *KEJOMBLOAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kejombloan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 💔 *KEJOMBLOAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kejombloan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
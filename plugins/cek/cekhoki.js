// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekhoki',
    alias: ['hoki', 'lucky'],
    category: 'cek',
    description: 'Cek seberapa hoki kamu',
    usage: '.cekhoki <nama>',
    example: '.cekhoki Budi',
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
    if (percent >= 90) {
        desc = 'HOKI DEWA! Main gacha pasti menang! 🍀✨'
    } else if (percent >= 70) {
        desc = 'Hoki banget! 🎰'
    } else if (percent >= 50) {
        desc = 'Lumayan hoki 🍀'
    } else if (percent >= 30) {
        desc = 'Sedikit hoki 😊'
    } else {
        desc = 'Sabar ya, lagi apes 😅'
    }
    
    let txt = mentioned === m.sender ? `╭─【 🍀 *KEHOKIAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kehokian kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🍀 *KEHOKIAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kehokian dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
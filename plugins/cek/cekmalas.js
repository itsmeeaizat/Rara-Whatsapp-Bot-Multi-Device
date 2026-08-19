// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekmalas',
    alias: ['malas', 'lazy'],
    category: 'cek',
    description: 'Cek seberapa malas kamu',
    usage: '.cekmalas <nama>',
    example: '.cekmalas Budi',
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
        desc = 'SUPER MALAS! Raja rebahan! 🛏️'
    } else if (percent >= 70) {
        desc = 'Malas banget! 😴'
    } else if (percent >= 50) {
        desc = 'Lumayan malas 🥱'
    } else if (percent >= 30) {
        desc = 'Sedikit malas 😊'
    } else {
        desc = 'Rajin banget! 💪'
    }
    
    let txt = mentioned === m.sender ? `╭─【 😴 *KEMALASAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kemalasan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 😴 *KEMALASAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kemalasan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
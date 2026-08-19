// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekwibu',
    alias: ['wibu', 'weeb'],
    category: 'cek',
    description: 'Cek seberapa wibu kamu',
    usage: '.cekwibu <nama>',
    example: '.cekwibu Budi',
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
        desc = 'WIBU SEJATI! Ara ara~ 🎌'
    } else if (percent >= 70) {
        desc = 'Wibu parah! Kimochi~ 😍'
    } else if (percent >= 50) {
        desc = 'Lumayan wibu 🌸'
    } else if (percent >= 30) {
        desc = 'Sedikit wibu 😊'
    } else {
        desc = 'Bukan wibu, normal! 😎'
    }
    
    let txt = mentioned === m.sender ? `╭─【 🍥 *KEWIBUAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kewibuan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🍥 *KEWIBUAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kewibuan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
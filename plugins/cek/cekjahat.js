// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekjahat',
    alias: ['jahat', 'evil'],
    category: 'cek',
    description: 'Cek seberapa jahat kamu',
    usage: '.cekjahat <nama>',
    example: '.cekjahat Budi',
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
        desc = 'VILLAIN LEVEL! 😈👿'
    } else if (percent >= 70) {
        desc = 'Jahat banget! 💀'
    } else if (percent >= 50) {
        desc = 'Lumayan jahat 😏'
    } else if (percent >= 30) {
        desc = 'Sedikit jahat 😊'
    } else {
        desc = 'Baik kok, gak jahat! 😇'
    }
    
    let txt = mentioned === m.sender ? `╭─【 😈 *KEJAHATAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kejahatan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 😈 *KEJAHATAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kejahatan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
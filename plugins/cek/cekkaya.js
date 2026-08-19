// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekkaya',
    alias: ['kaya', 'rich'],
    category: 'cek',
    description: 'Cek seberapa kaya kamu',
    usage: '.cekkaya <nama>',
    example: '.cekkaya Budi',
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
    let emoji = ''
    if (percent >= 90) {
        desc = 'Sultan! Crazy rich! 💎'
        emoji = '👑'
    } else if (percent >= 70) {
        desc = 'Tajir melintir! 💰'
        emoji = '💎'
    } else if (percent >= 50) {
        desc = 'Lumayan berada 💵'
        emoji = '💰'
    } else if (percent >= 30) {
        desc = 'Cukup lah buat hidup 😊'
        emoji = '💵'
    } else {
        desc = 'Semangat nabung! 🙏'
        emoji = '🪙'
    }
    
    let txt = mentioned === m.sender ? `╭─【 💰 *KEKAYAAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kekayaan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 💰 *KEKAYAAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kekayaan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
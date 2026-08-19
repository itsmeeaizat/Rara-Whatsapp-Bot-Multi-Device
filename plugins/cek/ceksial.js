// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'ceksial',
    alias: ['sial', 'apes'],
    category: 'cek',
    description: 'Cek seberapa sial kamu',
    usage: '.ceksial <nama>',
    example: '.ceksial Budi',
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
        desc = 'SIAL BANGET! Mending di rumah aja! 😭'
    } else if (percent >= 70) {
        desc = 'Lagi apes nih~ 😢'
    } else if (percent >= 50) {
        desc = 'Lumayan sial 😓'
    } else if (percent >= 30) {
        desc = 'Sedikit sial 😕'
    } else {
        desc = 'Gak sial, hoki dong! 🍀'
    }
    
    let txt = mentioned === m.sender ? `╭─【 🙃 *KESIALAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kesialan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🙃 *KESIALAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kesialan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
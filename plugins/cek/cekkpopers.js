// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekkpopers',
    alias: ['kpopers', 'kpop'],
    category: 'cek',
    description: 'Cek tingkat kpopers kamu',
    usage: '.cekkpopers <nama>',
    example: '.cekkpopers Budi',
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
    if (percent >= 90) desc = 'ARMY/BLINK level max! 💜💗'
    else if (percent >= 70) desc = 'Stan berat nih! 🎤'
    else if (percent >= 50) desc = 'Casual listener~ 🎵'
    else if (percent >= 30) desc = 'Tau dikit-dikit aja 😅'
    else desc = 'Bukan kpopers 🤷'
    
    let txt = mentioned === m.sender ? `╭─【 🎤 *KPOPERS* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kpopers kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🎤 *KPOPERS* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kpopers dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
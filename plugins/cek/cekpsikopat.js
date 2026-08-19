// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekpsikopat',
    alias: ['psikopat', 'psycho'],
    category: 'cek',
    description: 'Cek seberapa psikopat kamu',
    usage: '.cekpsikopat <nama>',
    example: '.cekpsikopat Budi',
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
        desc = 'PSIKOPAT AKUT! Jauhi! 😈'
    } else if (percent >= 70) {
        desc = 'Hati-hati sama orang ini 👀'
    } else if (percent >= 50) {
        desc = 'Ada sisi gelapnya 🌑'
    } else if (percent >= 30) {
        desc = 'Sedikit misterius 🤔'
    } else {
        desc = 'Normal dan baik hati 😇'
    }
    
    let txt = mentioned === m.sender ? `╭─【 🔪 *KEPSIKOPATAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kepsikopatan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🔪 *KEPSIKOPATAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kepsikopatan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
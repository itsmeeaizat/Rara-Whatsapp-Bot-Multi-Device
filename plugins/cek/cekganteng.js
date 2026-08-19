// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekganteng',
    alias: ['ganteng', 'handsome'],
    category: 'cek',
    description: 'Cek seberapa ganteng kamu',
    usage: '.cekganteng <nama>',
    example: '.cekganteng Budi',
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
        desc = 'Ganteng maksimal! 😍🔥'
    } else if (percent >= 70) {
        desc = 'Ganteng banget! 😎'
    } else if (percent >= 50) {
        desc = 'Lumayan ganteng~ 👍'
    } else if (percent >= 30) {
        desc = 'Biasa aja sih 😅'
    } else {
        desc = 'Mungkin inner beauty? 🤭'
    }
    
    let txt = mentioned === m.sender ? `╭─【 😎 *KEGANTENGAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kegantengan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 😎 *KEGANTENGAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat kegantengan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
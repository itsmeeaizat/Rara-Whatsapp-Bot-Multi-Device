// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cekimut',
    alias: ['imut', 'cute'],
    category: 'cek',
    description: 'Cek seberapa imut kamu',
    usage: '.cekimut <nama>',
    example: '.cekimut Ani',
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
        desc = 'IMUT BANGET! Kawaii~~ 🥺💕'
    } else if (percent >= 70) {
        desc = 'Imutnya kebangetan! 😍'
    } else if (percent >= 50) {
        desc = 'Lumayan imut~ 🌸'
    } else if (percent >= 30) {
        desc = 'Ada imutnya dikit 😊'
    } else {
        desc = 'Mungkin cool bukan imut? 😎'
    }
    
    let txt = mentioned === m.sender ? `╭─【 🥰 *KEIMUTAN* 】\n┃\n┃ ➤ Hai @${mentioned.split('@')[0]}\n┃\n┃ Tingkat keimutan kamu *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣` : `╭─【 🥰 *KEIMUTAN* 】\n┃\n┃ ➤ Kamu ngecek @${mentioned.split('@')[0]}\n┃\n┃ Tingkat keimutan dia sebesar *${percent}%*\n┃ \`\`\`${desc}\`\`\`\n╰────────────────⸣`
    await m.reply(txt, { mentions: [mentioned] })
}

export { pluginConfig as config, handler }
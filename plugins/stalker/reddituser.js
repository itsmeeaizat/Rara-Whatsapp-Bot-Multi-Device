// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'reddituser', alias: ['rdtuser', 'rdtstalk'], category: 'stalker', description: 'Info user Reddit', usage: '.reddituser <username>', example: '.reddituser spez', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan username!\n\nContoh: .reddituser spez')
    try {
        const res = await axios.get('https://www.reddit.com/user/' + encodeURIComponent(text) + '/about.json')
        const d = res.data.data
        const age = new Date(d.created_utc * 1000).toLocaleDateString('id-ID')
        let lines = ['╭┈❀ *REDDIT USER*', '┃', '┃ ◦ Username: u/' + d.name, '┃ ◦ Karma: ' + (d.total_karma || 0), '┃ ◦ Link Karma: ' + (d.link_karma || 0), '┃ ◦ Comment Karma: ' + (d.comment_karma || 0), '┃ ◦ Akun dibuat: ' + age, '┃ ◦ Verified: ' + (d.verified ? 'Yes' : 'No'), '┃ ◦ Mod: ' + (d.is_mod ? 'Yes' : 'No'), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('User tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

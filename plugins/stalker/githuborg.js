// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'githuborg', alias: ['ghorg', 'org'], category: 'stalker', description: 'Info organisasi GitHub', usage: '.githuborg <nama>', example: '.githuborg google', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama organisasi!\n\nContoh: .githuborg google')
    try {
        const res = await axios.get('https://api.github.com/orgs/' + encodeURIComponent(text))
        const d = res.data
        let lines = ['╭┈❀ *GITHUB ORG*', '┃', '┃ ◦ Nama: ' + (d.name || d.login), '┃ ◦ Login: ' + d.login, '┃ ◦ Repos: ' + (d.public_repos || 0), '┃ ◦ Followers: ' + (d.followers || 0), '┃ ◦ Blog: ' + (d.blog || 'N/A'), '┃ ◦ Lokasi: ' + (d.location || 'N/A'), '┃ ◦ Email: ' + (d.email || 'N/A'), '┃', '┃ ◦ Desc: ' + (d.description || 'N/A').slice(0, 200), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Organisasi tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

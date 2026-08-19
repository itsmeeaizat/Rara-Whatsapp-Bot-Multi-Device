// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'infomanga', alias: ['mangainfo', 'manga'], category: 'info', description: 'Info manga via Jikan API', usage: '.infomanga <judul>', example: '.infomanga One Piece', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan judul manga!\n\nContoh: .infomanga One Piece')
    try {
        const res = await axios.get('https://api.jikan.moe/v4/manga?q=' + encodeURIComponent(text) + '&limit=1&sfw=true')
        const a = res.data.data?.[0]
        if (!a) return m.reply('Manga tidak ditemukan: ' + text)
        let lines = ['╭┈❀ *INFO MANGA*', '┃', '┃ ◦ Judul: ' + (a.title || 'N/A'), '┃ ◦ Skor: ' + (a.score || 'N/A'), '┃ ◦ Chapter: ' + (a.chapters || 'N/A'), '┃ ◦ Volume: ' + (a.volumes || 'N/A'), '┃ ◦ Status: ' + (a.status || 'N/A'), '┃ ◦ Genre: ' + (a.genres || []).map(g => g.name).join(', '), '┃', '┃ ◦ Sinopsis: ' + (a.synopsis || 'N/A').slice(0, 300), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

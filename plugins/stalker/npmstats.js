// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'npmstats', alias: ['npmdownloads', 'npmstats'], category: 'stalker', description: 'Download stats NPM package', usage: '.npmstats <package>', example: '.npmstats axios', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama package!\n\nContoh: .npmstats axios')
    try {
        const res = await axios.get('https://api.npmjs.org/downloads/point/last-month/' + encodeURIComponent(text))
        const d = res.data
        let lines = ['╭┈❀ *NPM STATS*', '┃', '┃ ◦ Package: ' + d.package, '┃ ◦ Downloads (30 hari): ' + d.downloads.toLocaleString(), '┃ ◦ Periode: ' + d.start + ' s/d ' + d.end, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Package tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

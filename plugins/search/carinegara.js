// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'carinegara', alias: ['negara', 'countrysearch'], category: 'search', description: 'Cari info negara via REST Countries', usage: '.carinegara <negara>', example: '.carinegara Indonesia', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama negara!\n\nContoh: .carinegara Indonesia')
    try {
        const res = await axios.get('https://restcountries.com/v3.1/name/' + encodeURIComponent(text))
        const c = res.data[0]
        const currencies = c.currencies ? Object.values(c.currencies).map(cur => cur.name).join(', ') : 'N/A'
        const languages = c.languages ? Object.values(c.languages).join(', ') : 'N/A'
        let lines = ['╭┈❀ *INFO NEGARA*', '┃', '┃ ◦ Nama: ' + (c.name?.common || text), '┃ ◦ Ibu Kota: ' + ((c.capital || []).join(', ') || 'N/A'), '┃ ◦ Populasi: ' + (c.population?.toLocaleString() || 'N/A'), '┃ ◦ Region: ' + (c.region || 'N/A'), '┃ ◦ Mata Uang: ' + currencies, '┃ ◦ Bahasa: ' + languages, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Negara tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

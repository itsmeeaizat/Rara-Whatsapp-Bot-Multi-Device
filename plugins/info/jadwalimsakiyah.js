// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'jadwalimsakiyah', alias: ['imsakiyah', 'imsak'], category: 'info', description: 'Jadwal imsakiyah & sholat', usage: '.jadwalimsakiyah <kota>', example: '.jadwalimsakiyah Jakarta', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama kota!\n\nContoh: .jadwalimsakiyah Jakarta')
    try {
        const res = await axios.get('https://api.aladhan.com/v1/timingsByCity?city=' + encodeURIComponent(text) + '&country=Indonesia&method=20')
        const t = res.data.data.timings
        const d = res.data.data.date
        let lines = ['╭┈❀ *JADWAL IMSAKIYAH*', '┃', '┃ ◦ Kota: ' + text, '┃ ◦ Tanggal: ' + (d.readable || 'N/A'), '┃', '┃ ◦ Imsak: ' + (t.Imsak || 'N/A'), '┃ ◦ Subuh: ' + (t.Fajr || 'N/A'), '┃ ◦ Dzuhur: ' + (t.Dhuhr || 'N/A'), '┃ ◦ Ashar: ' + (t.Asr || 'N/A'), '┃ ◦ Maghrib: ' + (t.Maghrib || 'N/A'), '┃ ◦ Isya: ' + (t.Isha || 'N/A'), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Kota tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

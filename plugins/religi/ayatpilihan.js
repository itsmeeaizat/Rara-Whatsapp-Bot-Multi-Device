// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'ayatpilihan', alias: ['randomayah', 'ayat'], category: 'religi', description: 'Ayat Al-Quran acak', usage: '.ayatpilihan', example: '.ayatpilihan', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const num = Math.floor(Math.random() * 6236) + 1
        const res = await axios.get('https://api.alquran.cloud/v1/ayah/' + num + '/id.indonesian')
        const d = res.data.data
        let lines = ['╭┈❀ *AYAT PILIHAN*', '┃', '┃ ◦ Surah: ' + d.surah.name + ' (' + d.surah.englishName + ')', '┃ ◦ Ayat: ' + d.numberInSurah, '┃', '┃ ◦ Arab: ' + d.text, '┃', '┃ ◦ Arti: ' + (d.translation || d.surah ? 'Lihat di API' : ''), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        return m.reply('Gagal mengambil ayat. Coba lagi nanti.')
    }
}
export { pluginConfig as config, handler }

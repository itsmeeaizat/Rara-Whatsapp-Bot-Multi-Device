// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'covidinfo', alias: ['covid', 'corona'], category: 'info', description: 'Data COVID-19 Indonesia', usage: '.covidinfo', example: '.covidinfo', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://covid19.mathdro.id/api/countries/Indonesia')
        const d = res.data
        let lines = ['╭┈❀ *COVID-19 INDONESIA*', '┃', '┃ ◦ Positif: ' + (d.confirmed?.value?.toLocaleString() || 'N/A'), '┃ ◦ Sembuh: ' + (d.recovered?.value?.toLocaleString() || 'N/A'), '┃ ◦ Meninggal: ' + (d.deaths?.value?.toLocaleString() || 'N/A'), '┃ ◦ Update: ' + (d.lastUpdate || 'N/A').slice(0, 10), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        return m.reply('Data COVID-19 sedang tidak tersedia. API mungkin sudah ditutup.')
    }
}
export { pluginConfig as config, handler }

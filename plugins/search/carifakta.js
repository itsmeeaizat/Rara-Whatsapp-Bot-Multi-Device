// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'carifakta', alias: ['fakta', 'uselessfact'], category: 'search', description: 'Fakta acak menarik', usage: '.carifakta', example: '.carifakta', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
        let lines = ['╭┈❀ *FAKTA ACAK*', '┃', '┃ ◦ ' + res.data.text, '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        const facts = ['Lebah dapat mengenali wajah manusia.', 'Gurita memiliki 3 jantung.', 'Pisang secara botani adalah berry.', 'Jumlah bintang di alam semesta lebih banyak dari butiran pasir di Bumi.', 'Venezuela memiliki 43 kebangsaan berbeda dalam satu negara.']
        let lines = ['╭┈❀ *FAKTA ACAK*', '┃', '┃ ◦ ' + facts[Math.floor(Math.random()*facts.length)], '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    }
}
export { pluginConfig as config, handler }

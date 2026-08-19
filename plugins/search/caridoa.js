// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'caridoa', alias: ['doa', 'doasearch'], category: 'search', description: 'Cari doa harian', usage: '.caridoa <nama doa>', example: '.caridoa sebelum makan', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    try {
        const res = await axios.get('https://doa-doa-api-ahmadramadhan.vercel.app/api')
        const allDoa = res.data || []
        if (!text) {
            const random = allDoa[Math.floor(Math.random() * allDoa.length)]
            let lines = ['╭┈❀ *DOA HARIAN*', '┃', '┃ ◦ ' + random.nama, '┃']
            if (random.doa) lines.push('┃ ◦ Arab: ' + random.doa)
            if (random.latin) lines.push('┃ ◦ Latin: ' + random.latin)
            if (random.terjemahan) lines.push('┃ ◦ Arti: ' + random.terjemahan)
            lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
            return m.reply(lines.join('\n'))
        }
        const filtered = allDoa.filter(d => d.nama && d.nama.toLowerCase().includes(text.toLowerCase()))
        if (!filtered.length) return m.reply('Doa tidak ditemukan untuk: ' + text)
        const d = filtered[0]
        let lines = ['╭┈❀ *DOA*', '┃', '┃ ◦ ' + d.nama, '┃']
        if (d.doa) lines.push('┃ ◦ Arab: ' + d.doa)
        if (d.latin) lines.push('┃ ◦ Latin: ' + d.latin)
        if (d.terjemahan) lines.push('┃ ◦ Arti: ' + d.terjemahan)
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

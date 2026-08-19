// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'cekssl', alias: ['sslcheck'], category: 'cek', description: 'Cek SSL certificate website', usage: '.cekssl <domain>', example: '.cekssl google.com', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim().replace(/^https?:\/\//, '').replace(/\/.*/, '')
    if (!text) return m.reply('Masukkan domain!\n\nContoh: .cekssl google.com')
    try {
        const res = await axios.get('https://ssl-checker.io/api/v1/check/' + text)
        const d = res.data
        let lines = ['╭┈❀ *CEK SSL*', '┃', '┃ ◦ Domain: ' + text, '┃ ◦ Valid: ' + (d.valid ? 'Yes' : 'No'), '┃ ◦ Issuer: ' + (d.issuer || 'N/A'), '┃ ◦ Valid From: ' + (d.valid_from || 'N/A'), '┃ ◦ Valid To: ' + (d.valid_to || 'N/A'), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) {
        try {
            const res2 = await axios.get('https://api.ssllabs.com/api/v3/analyze?host=' + text)
            let lines = ['╭┈❀ *CEK SSL*', '┃', '┃ ◦ Domain: ' + text, '┃ ◦ Status: ' + (res2.data.status || 'Checking...'), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
            return m.reply(lines.join('\n'))
        } catch {
            return m.reply('Gagal cek SSL untuk: ' + text)
        }
    }
}
export { pluginConfig as config, handler }

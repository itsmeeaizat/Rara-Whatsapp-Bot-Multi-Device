// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'youtubestalk', alias: ['ytstalk', 'ytchannel'], category: 'stalker', description: 'Info channel YouTube via Invidious', usage: '.youtubestalk <channel>', example: '.youtubestalk MrBeast', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama channel!\n\nContoh: .youtubestalk MrBeast')
    try {
        const res = await axios.get('https://inv.tux.pizza/api/v1/channels/' + encodeURIComponent(text))
        const d = res.data
        let lines = ['╭┈❀ *YOUTUBE CHANNEL*', '┃', '┃ ◦ Nama: ' + (d.author || 'N/A'), '┃ ◦ Subs: ' + (d.subCount?.toLocaleString() || 'N/A'), '┃ ◦ Total Views: ' + (d.totalViews?.toLocaleString() || 'N/A'), '┃ ◦ Video: ' + (d.videoCount || 'N/A'), '┃', '┃ ◦ Desc: ' + (d.description || 'N/A').slice(0, 200), '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Channel tidak ditemukan: ' + text) }
}
export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = { name: 'angkakebetulan', alias: ['lucky', 'angkahoki'], category: 'primbon', description: 'Angka kebetulan dari nama', usage: '.angkakebetulan <nama>', example: '.angkakebetulan Dinda', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama!\n\nContoh: .angkakebetulan Dinda')
    const letters = text.toLowerCase().replace(/[^a-z]/g, '').split('')
    let total = 0
    letters.forEach(c => { total += (c.charCodeAt(0) - 96) })
    const primary = (total % 9) + 1
    const secondary = (total % 99) + 1
    const unlucky = ((total * 13) % 9) + 1
    let lines = ['╭┈❀ *ANGKA KEBETULAN*', '┃', '┃ ◦ Nama: ' + text, '┃', '┃ ◦ Angka Utama: ' + primary, '┃ ◦ Angka Sekunder: ' + secondary, '┃ ◦ Angka Sial: ' + unlucky, '┃', '┃ ◦ Total Nilai: ' + total, '┃', '┃ ◦ Catatan: Untuk hiburan saja', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
    return m.reply(lines.join('\n'))
}
export { pluginConfig as config, handler }

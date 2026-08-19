// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = { name: 'haribaik', alias: ['goodday', 'harik baik'], category: 'primbon', description: 'Hitung hari baik dari tanggal', usage: '.haribaik <DD/MM/YYYY>', example: '.haribaik 17/08/1945', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan tanggal!\n\nContoh: .haribaik 17/08/1945')
    const parts = text.split('/')
    if (parts.length !== 3) return m.reply('Format: DD/MM/YYYY')
    const day = parseInt(parts[0]), month = parseInt(parts[1]) - 1, year = parseInt(parts[2])
    const date = new Date(year, month, day)
    if (isNaN(date.getTime())) return m.reply('Tanggal tidak valid!')
    const DINA = ['Ahad', 'Senen', 'Selasa', 'Rebo', 'Kemis', 'Jumat', 'Sabtu']
    const dayName = DINA[date.getDay()]
    const score = (date.getDate() + date.getMonth() + date.getFullYear()) % 10
    let rating = 'Biasa'
    if (score >= 7) rating = 'Sangat Baik'
    else if (score >= 5) rating = 'Baik'
    else if (score >= 3) rating = 'Cukup'
    else rating = 'Kurang Baik'
    const activities = ['Menikah', 'Pindah rumah', 'Buka usaha', 'Travel jauh', 'Wiwitan']
    const good = activities.filter((_, i) => (score + i) % 2 === 0)
    let lines = ['╭┈❀ *HARI BAIK*', '┃', '┃ ◦ Tanggal: ' + text, '┃ ◦ Dina: ' + dayName, '┃ ◦ Rating: ' + rating, '┃ ◦ Skor: ' + score + '/10', '┃', '┃ ◦ Aktivitas Baik:']
    if (good.length) good.forEach(a => lines.push('┃   + ' + a))
    else lines.push('┃   + Istirahat saja')
    lines.push('┃', '┃ ◦ Catatan: Untuk hiburan saja', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    return m.reply(lines.join('\n'))
}
export { pluginConfig as config, handler }

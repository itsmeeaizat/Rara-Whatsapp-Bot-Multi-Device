// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = { name: 'weton', alias: ['pasaran', 'neptu'], category: 'primbon', description: 'Hitung weton Jawa dari tanggal lahir', usage: '.weton <DD/MM/YYYY>', example: '.weton 17/08/1945', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
const DINA = ['Ahad', 'Senen', 'Selasa', 'Rebo', 'Kemis', 'Jumat', 'Sabtu']
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']
const NEPTU_DINA = { 'Ahad': 5, 'Senen': 4, 'Selasa': 3, 'Rebo': 7, 'Kemis': 8, 'Jumat': 6, 'Sabtu': 9 }
const NEPTU_PASARAN = { 'Legi': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8 }
const KARAKTER = {
    'Legi': 'Murah hati, perasa, suka menolong. Sering dimanfaatkan orang.',
    'Pahing': 'Tegas, berani, pembenci keculasan. Kadang keras kepala.',
    'Pon': 'Tenang, dewasa, penuh pertimbangan. Pemikir.',
    'Wage': 'Ulet, pekerja keras, hemat. Materialistis.',
    'Kliwon': 'Bijaksana, spiritual, pendiam. Susah ditebak.'
}
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan tanggal lahir!\n\nContoh: .weton 17/08/1945')
    const parts = text.split('/')
    if (parts.length !== 3) return m.reply('Format: DD/MM/YYYY\nContoh: .weton 17/08/1945')
    const day = parseInt(parts[0]), month = parseInt(parts[1]) - 1, year = parseInt(parts[2])
    const date = new Date(year, month, day)
    if (isNaN(date.getTime())) return m.reply('Tanggal tidak valid!')
    const dayName = DINA[date.getDay()]
    const daySinceEpoch = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000) + 1
    const pasaranIdx = ((date.getDate() + Math.floor((date.getTime() - new Date(1900, 0, 1).getTime()) / 86400000)) % 5 + 5) % 5
    const pasaran = PASARAN[pasaranIdx]
    const neptu = (NEPTU_DINA[dayName] || 0) + (NEPTU_PASARAN[pasaran] || 0)
    let lines = ['╭┈❀ *WETON JAWA*', '┃', '┃ ◦ Tanggal: ' + text, '┃ ◦ Dina: ' + dayName, '┃ ◦ Pasaran: ' + pasaran, '┃ ◦ Neptu: ' + neptu, '┃', '┃ ◦ Karakter: ' + (KARAKTER[pasaran] || 'N/A'), '┃', '┃ ◦ Catatan: Untuk hiburan saja', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
    return m.reply(lines.join('\n'))
}
export { pluginConfig as config, handler }

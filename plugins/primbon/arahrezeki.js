// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = { name: 'arahrezeki', alias: ['rezeki', 'arahuntung'], category: 'primbon', description: 'Arah rezeki berdasarkan tanggal lahir', usage: '.arahrezeki <DD/MM/YYYY>', example: '.arahrezeki 17/08/1945', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 3, energi: 0, isEnabled: true }
const ARAH = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut']
const DESK = { 'Utara': 'Rezeki dari arah utara, cocok untuk karir.', 'Timur Laut': 'Rezeki datang dari timur laut, peluang baru.', 'Timur': 'Rezeki dari arah timur, awal yang baru.', 'Tenggara': 'Rezeki dari tenggara, keberuntungan kecil.', 'Selatan': 'Rezeki dari selatan, kestabilan finansial.', 'Barat Daya': 'Rezeki dari barat daya, investasi baik.', 'Barat': 'Rezeki dari barat, keuntungan tak terduga.', 'Barat Laut': 'Rezeki dari barat laut, networking berguna.' }
const COLORS = { 'Utara': 'Putih', 'Timur Laut': 'Orange', 'Timur': 'Merah', 'Tenggara': 'Pink', 'Selatan': 'Hitam', 'Barat Daya': 'Ungu', 'Barat': 'Kuning', 'Barat Laut': 'Biru' }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan tanggal lahir!\n\nContoh: .arahrezeki 17/08/1945')
    const parts = text.split('/')
    if (parts.length !== 3) return m.reply('Format: DD/MM/YYYY')
    const day = parseInt(parts[0]), month = parseInt(parts[1]) - 1, year = parseInt(parts[2])
    const date = new Date(year, month, day)
    if (isNaN(date.getTime())) return m.reply('Tanggal tidak valid!')
    const idx = (date.getDate() + date.getMonth() + date.getFullYear()) % 8
    const arah = ARAH[idx]
    const lucky = ((date.getDate() * 3) % 99) + 1
    let lines = ['╭┈❀ *ARAH REZEKI*', '┃', '┃ ◦ Tanggal: ' + text, '┃ ◦ Arah: ' + arah, '┃ ◦ Warna: ' + (COLORS[arah] || 'N/A'), '┃ ◦ Angka: ' + lucky, '┃', '┃ ◦ ' + (DESK[arah] || ''), '┃', '┃ ◦ Catatan: Untuk hiburan saja', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
    return m.reply(lines.join('\n'))
}
export { pluginConfig as config, handler }

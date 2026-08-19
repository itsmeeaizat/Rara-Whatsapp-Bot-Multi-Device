// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'pulsajam',
    alias: ['jamdunia', 'worldclock', 'time'],
    category: 'info',
    description: 'Cek waktu di berbagai kota dunia',
    usage: '.pulsajam <kota>',
    example: '.pulsajam Tokyo',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const CITIES = {
    jakarta: { tz: 7, label: 'Jakarta (WIB)' },
    tokyo: { tz: 9, label: 'Tokyo (JST)' },
    london: { tz: 0, label: 'London (GMT)' },
    newyork: { tz: -5, label: 'New York (EST)' },
    losangeles: { tz: -8, label: 'Los Angeles (PST)' },
    paris: { tz: 1, label: 'Paris (CET)' },
    dubai: { tz: 4, label: 'Dubai (GST)' },
    seoul: { tz: 9, label: 'Seoul (KST)' },
    singapore: { tz: 8, label: 'Singapore (SGT)' },
    sydney: { tz: 11, label: 'Sydney (AEDT)' },
    istanbul: { tz: 3, label: 'Istanbul (TRT)' },
    cairo: { tz: 2, label: 'Cairo (EET)' },
    moscow: { tz: 3, label: 'Moscow (MSK)' },
    mumbai: { tz: 5.5, label: 'Mumbai (IST)' },
    beijing: { tz: 8, label: 'Beijing (CST)' },
    riyadh: { tz: 3, label: 'Riyadh (AST)' },
    berlin: { tz: 1, label: 'Berlin (CET)' },
    madrid: { tz: 1, label: 'Madrid (CET)' },
    rome: { tz: 1, label: 'Rome (CET)' },
    amsterdam: { tz: 1, label: 'Amsterdam (CET)' },
    toronto: { tz: -5, label: 'Toronto (EST)' },
    mexico: { tz: -6, label: 'Mexico City (CST)' },
    saopaulo: { tz: -3, label: 'Sao Paulo (BRT)' },
    lagos: { tz: 1, label: 'Lagos (WAT)' },
    auckland: { tz: 13, label: 'Auckland (NZDT)' },
}

function getTimeForCity(tzOffset) {
    const now = new Date()
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const cityTime = new Date(utc + (tzOffset * 3600000))
    const dd = String(cityTime.getDate()).padStart(2, '0')
    const mm = String(cityTime.getMonth() + 1).padStart(2, '0')
    const yyyy = cityTime.getFullYear()
    const hh = String(cityTime.getHours()).padStart(2, '0')
    const min = String(cityTime.getMinutes()).padStart(2, '0')
    const ss = String(cityTime.getSeconds()).padStart(2, '0')
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss
}

async function handler(m) {
    const text = (m.text || '').toLowerCase().trim()

    if (!text) {
        const lines = [
            '╭┈❀ *WAKTU DUNIA*',
            '┃',
            '┃ ◦ Jakarta: ' + getTimeForCity(7),
            '┃ ◦ Tokyo: ' + getTimeForCity(9),
            '┃ ◦ London: ' + getTimeForCity(0),
            '┃ ◦ New York: ' + getTimeForCity(-5),
            '┃ ◦ Dubai: ' + getTimeForCity(4),
            '┃ ◦ Seoul: ' + getTimeForCity(9),
            '┃ ◦ Singapore: ' + getTimeForCity(8),
            '┃ ◦ Sydney: ' + getTimeForCity(11),
            '┃',
            '┃ ◦ Ketik: .pulsajam <kota>',
            '┃ ◦ Contoh: .pulsajam Tokyo',
            '┃',
            '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀'
        ]
        return m.reply(lines.join('\n'))
    }

    const city = CITIES[text] || CITIES[text.replace(/\s/g, '')]
    if (!city) {
        const available = Object.keys(CITIES).join(', ')
        return m.reply('Kota tidak ditemukan!\n\nKota tersedia: ' + available)
    }

    const lines = [
        '╭┈❀ *WAKTU DUNIA*',
        '┃',
        '┃ ◦ Kota: ' + city.label,
        '┃ ◦ Waktu: ' + getTimeForCity(city.tz),
        '┃',
        '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀'
    ]
    return m.reply(lines.join('\n'))
}

export { pluginConfig as config, handler }

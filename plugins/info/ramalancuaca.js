// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

import axios from 'axios'

const pluginConfig = {
    name: 'ramalancuaca',
    alias: ['cuaca3hari', 'forecast', 'prakiraancuaca'],
    category: 'info',
    description: 'Prakiraan cuaca 3 hari ke depan berdasarkan kota',
    usage: '.ramalancuaca <kota>',
    example: '.ramalancuaca Jakarta',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const WEATHER_CODES = {
    0: 'Cerah',
    1: 'Cerah Berawan',
    2: 'Berawan',
    3: 'Mendung',
    45: 'Berkabut',
    48: 'Kabut Tebal',
    51: 'Hujan Rintik',
    53: 'Hujan Rintik Sedang',
    55: 'Hujan Rintik Lebat',
    61: 'Hujan Ringan',
    63: 'Hujan Sedang',
    65: 'Hujan Lebat',
    71: 'Salju Ringan',
    73: 'Salju Sedang',
    75: 'Salju Lebat',
    80: 'Hujan Lokal',
    81: 'Hujan Sedang',
    82: 'Hujan Lebat',
    95: 'Badai Petir',
    96: 'Badai Petir + Hujan Es',
    99: 'Badai Petir Hebat',
}

async function handler(m) {
    const text = (m.text || '').trim()

    if (!text) {
        return m.reply('Masukkan nama kota!\n\nContoh: .ramalancuaca Jakarta')
    }

    try {
        // Step 1: Geocode city name to lat/lon
        const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(text) + '&count=1&language=id&format=json')
        const geoData = geoRes.data

        if (!geoData.results || geoData.results.length === 0) {
            return m.reply('Kota tidak ditemukan! Coba nama kota yang lebih spesifik.')
        }

        const city = geoData.results[0]
        const lat = city.latitude
        const lon = city.longitude
        const cityName = city.name + (city.country ? ', ' + city.country : '')

        // Step 2: Get 3-day forecast
        const weatherRes = await axios.get(
            'https://api.open-meteo.com/v1/forecast?' +
            'latitude=' + lat + '&longitude=' + lon +
            '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,wind_speed_10m_max' +
            '&timezone=auto&forecast_days=3'
        )
        const weather = weatherRes.data

        if (!weather.daily) {
            return m.reply('Data cuaca tidak tersedia untuk kota ini.')
        }

        const lines = ['╭┈❀ *PRAKIRAAN CUACA*', '┃', '┃ ◦ Lokasi: ' + cityName, '┃']

        for (let i = 0; i < 3; i++) {
            const date = new Date(weather.daily.time[i])
            const dd = String(date.getDate()).padStart(2, '0')
            const mm = String(date.getMonth() + 1).padStart(2, '0')
            const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
            const dayName = dayNames[date.getDay()]

            const tempMax = weather.daily.temperature_2m_max[i]
            const tempMin = weather.daily.temperature_2m_min[i]
            const precip = weather.daily.precipitation_probability_max ? weather.daily.precipitation_probability_max[i] : 0
            const code = weather.daily.weather_code ? weather.daily.weather_code[i] : 0
            const wind = weather.daily.wind_speed_10m_max ? weather.daily.wind_speed_10m_max[i] : 0
            const weatherDesc = WEATHER_CODES[code] || 'Tidak diketahui'

            lines.push('┃ ◦ ' + dayName + ', ' + dd + '/' + mm)
            lines.push('┃   Cuaca: ' + weatherDesc)
            lines.push('┃   Suhu: ' + tempMin + '-' + tempMax + ' C')
            lines.push('┃   Hujan: ' + precip + '% | Angin: ' + wind + ' km/h')
            if (i < 2) lines.push('┃')
        }

        lines.push('┃')
        lines.push('┃ ◦ Sumber: Open-Meteo API')
        lines.push('╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')

        return m.reply(lines.join('\n'))

    } catch (error) {
        return m.reply('Gagal mengambil data cuaca: ' + (error.message || 'Unknown error'))
    }
}

export { pluginConfig as config, handler }

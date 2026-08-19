// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";

const pluginConfig = {
    name: 'ibukota',
    alias: ['capital', 'ibukotanegara', 'capitals'],
    category: 'info',
    description: 'Informasi ibukota negara di seluruh dunia via API & Database',
    usage: '.ibukota <nama negara>',
    example: '.ibukota Indonesia',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const staticCapitals = {
    'indonesia': { negara: 'Indonesia', ibukota: 'Jakarta (Nusantara - IKN)', benua: 'Asia Tenggara', kode: 'ID' },
    'malaysia': { negara: 'Malaysia', ibukota: 'Kuala Lumpur', benua: 'Asia Tenggara', kode: 'MY' },
    'singapura': { negara: 'Singapura', ibukota: 'Singapura', benua: 'Asia Tenggara', kode: 'SG' },
    'singapore': { negara: 'Singapura', ibukota: 'Singapura', benua: 'Asia Tenggara', kode: 'SG' },
    'jepang': { negara: 'Jepang', ibukota: 'Tokyo', benua: 'Asia Timur', kode: 'JP' },
    'japan': { negara: 'Jepang', ibukota: 'Tokyo', benua: 'Asia Timur', kode: 'JP' },
    'korea selatan': { negara: 'Korea Selatan', ibukota: 'Seoul', benua: 'Asia Timur', kode: 'KR' },
    'south korea': { negara: 'Korea Selatan', ibukota: 'Seoul', benua: 'Asia Timur', kode: 'KR' },
    'korea utara': { negara: 'Korea Utara', ibukota: 'Pyongyang', benua: 'Asia Timur', kode: 'KP' },
    'china': { negara: 'China', ibukota: 'Beijing', benua: 'Asia Timur', kode: 'CN' },
    'tiongkok': { negara: 'China', ibukota: 'Beijing', benua: 'Asia Timur', kode: 'CN' },
    'amerika serikat': { negara: 'Amerika Serikat', ibukota: 'Washington, D.C.', benua: 'Amerika Utara', kode: 'US' },
    'usa': { negara: 'Amerika Serikat', ibukota: 'Washington, D.C.', benua: 'Amerika Utara', kode: 'US' },
    'inggris': { negara: 'Inggris (Britania Raya)', ibukota: 'London', benua: 'Eropa', kode: 'GB' },
    'uk': { negara: 'Inggris (Britania Raya)', ibukota: 'London', benua: 'Eropa', kode: 'GB' },
    'jerman': { negara: 'Jerman', ibukota: 'Berlin', benua: 'Eropa', kode: 'DE' },
    'germany': { negara: 'Jerman', ibukota: 'Berlin', benua: 'Eropa', kode: 'DE' },
    'prancis': { negara: 'Prancis', ibukota: 'Paris', benua: 'Eropa', kode: 'FR' },
    'france': { negara: 'Prancis', ibukota: 'Paris', benua: 'Eropa', kode: 'FR' },
    'arab saudi': { negara: 'Arab Saudi', ibukota: 'Riyadh', benua: 'Timur Tengah', kode: 'SA' },
    'saudi arabia': { negara: 'Arab Saudi', ibukota: 'Riyadh', benua: 'Timur Tengah', kode: 'SA' },
    'palestina': { negara: 'Palestina', ibukota: 'Yerusalem Timur (Al-Quds)', benua: 'Timur Tengah', kode: 'PS' },
    'palestine': { negara: 'Palestina', ibukota: 'Yerusalem Timur (Al-Quds)', benua: 'Timur Tengah', kode: 'PS' },
    'mesir': { negara: 'Mesir', ibukota: 'Kairo', benua: 'Afrika', kode: 'EG' },
    'egypt': { negara: 'Mesir', ibukota: 'Kairo', benua: 'Afrika', kode: 'EG' },
    'brasil': { negara: 'Brasil', ibukota: 'Brasília', benua: 'Amerika Selatan', kode: 'BR' },
    'brazil': { negara: 'Brasil', ibukota: 'Brasília', benua: 'Amerika Selatan', kode: 'BR' },
    'australia': { negara: 'Australia', ibukota: 'Canberra', benua: 'Australia & Oseania', kode: 'AU' },
    'india': { negara: 'India', ibukota: 'New Delhi', benua: 'Asia Selatan', kode: 'IN' },
    'rusia': { negara: 'Rusia', ibukota: 'Moskow', benua: 'Eropa / Asia', kode: 'RU' },
    'russia': { negara: 'Rusia', ibukota: 'Moskow', benua: 'Eropa / Asia', kode: 'RU' },
    'turki': { negara: 'Turki', ibukota: 'Ankara', benua: 'Eropa / Asia', kode: 'TR' },
    'turkey': { negara: 'Turki', ibukota: 'Ankara', benua: 'Eropa / Asia', kode: 'TR' },
    'kanada': { negara: 'Kanada', ibukota: 'Ottawa', benua: 'Amerika Utara', kode: 'CA' },
    'canada': { negara: 'Kanada', ibukota: 'Ottawa', benua: 'Amerika Utara', kode: 'CA' },
    'thailand': { negara: 'Thailand', ibukota: 'Bangkok', benua: 'Asia Tenggara', kode: 'TH' },
    'vietnam': { negara: 'Vietnam', ibukota: 'Hanoi', benua: 'Asia Tenggara', kode: 'VN' },
    'filipina': { negara: 'Filipina', ibukota: 'Manila', benua: 'Asia Tenggara', kode: 'PH' },
    'philippines': { negara: 'Filipina', ibukota: 'Manila', benua: 'Asia Tenggara', kode: 'PH' },
    'italia': { negara: 'Italia', ibukota: 'Roma', benua: 'Eropa', kode: 'IT' },
    'italy': { negara: 'Italia', ibukota: 'Roma', benua: 'Eropa', kode: 'IT' },
    'spanyol': { negara: 'Spanyol', ibukota: 'Madrid', benua: 'Eropa', kode: 'ES' },
    'spain': { negara: 'Spanyol', ibukota: 'Madrid', benua: 'Eropa', kode: 'ES' },
    'belanda': { negara: 'Belanda', ibukota: 'Amsterdam', benua: 'Eropa', kode: 'NL' },
    'netherlands': { negara: 'Belanda', ibukota: 'Amsterdam', benua: 'Eropa', kode: 'NL' }
};

async function handler(m, context = {}) {
    const input = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim();

    if (!input) {
        let usageMsg = `╭┈❀ *INFORMASI IBUKOTA DUNIA*\n`;
        usageMsg += `┃ ◦ Masukkan nama negara untuk mencari ibukotanya.\n`;
        usageMsg += `┃ ◦ Contoh: *.ibukota Indonesia*\n`;
        usageMsg += `┃ ◦ Contoh: *.ibukota Jepang*\n`;
        usageMsg += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return await m.reply(usageMsg);
    }

    let countryData = null;
    let isLive = false;

    // Try Live API first (countriesnow API)
    try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/capital', {
            country: input
        }, { timeout: 7000 });

        if (response.data && !response.data.error && response.data.data) {
            countryData = {
                negara: response.data.data.name,
                ibukota: response.data.data.capital || 'Tidak diketahui',
                kode: response.data.data.iso2 || '-',
                iso3: response.data.data.iso3 || '-'
            };
            isLive = true;
        }
    } catch (e) {
        // Live API failed or country not found via API, fallback to static
    }

    // Static fallback if API didn't return data
    if (!countryData) {
        const key = input.toLowerCase();
        countryData = staticCapitals[key];

        if (!countryData) {
            // Search partial match in staticCapitals
            const matchKey = Object.keys(staticCapitals).find(k => k.includes(key) || key.includes(k));
            if (matchKey) {
                countryData = staticCapitals[matchKey];
            }
        }
    }

    if (!countryData) {
        let notFoundMsg = `╭┈❀ *IBUKOTA TIDAK DITEMUK*\n`;
        notFoundMsg += `┃ ◦ Negara *${input}* tidak ditemukan dalam database atau API.\n`;
        notFoundMsg += `┃ ◦ Pastikan ejaan nama negara benar (contoh: Indonesia, Jepang, Jerman, Arab Saudi).\n`;
        notFoundMsg += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return await m.reply(notFoundMsg);
    }

    let resultText = `╭┈❀ *INFORMASI IBUKOTA DUNIA*\n`;
    resultText += `┃ ◦ Nama Negara: ${countryData.negara}\n`;
    resultText += `┃ ◦ Ibukota: ${countryData.ibukota}\n`;
    if (countryData.benua) resultText += `┃ ◦ Benua / Wilayah: ${countryData.benua}\n`;
    if (countryData.kode) resultText += `┃ ◦ Kode Negara (ISO): ${countryData.kode}\n`;
    resultText += `┃ ◦ Sumber Data: ${isLive ? 'CountriesNow Online API' : 'Database Internal'}\n`;
    resultText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(resultText);
}

export { pluginConfig as config, handler };

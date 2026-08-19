// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";

const pluginConfig = {
    name: 'emas',
    alias: ['hargaemas', 'logammulia', 'goldprice'],
    category: 'info',
    description: 'Informasi harga emas Antam Logam Mulia hari ini',
    usage: '.emas',
    example: '.emas',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const staticFallbackData = {
    tanggal: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    buyback: "Rp 1.285.000 / gram",
    prices: [
        { gram: "0.5 Gram", harga: "Rp 745.000" },
        { gram: "1 Gram", harga: "Rp 1.390.000" },
        { gram: "2 Gram", harga: "Rp 2.720.000" },
        { gram: "3 Gram", harga: "Rp 4.055.000" },
        { gram: "5 Gram", harga: "Rp 6.725.000" },
        { gram: "10 Gram", harga: "Rp 13.395.000" },
        { gram: "25 Gram", harga: "Rp 33.362.000" },
        { gram: "50 Gram", harga: "Rp 66.645.000" },
        { gram: "100 Gram", harga: "Rp 133.212.000" }
    ]
};

async function handler(m) {
    let resultData = null;
    let isLive = false;

    try {
        const response = await axios.get('https://api.goapi.id/harga_emas', {
            timeout: 8000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (response.data && response.data.status === 'success' && response.data.data) {
            resultData = response.data.data;
            isLive = true;
        }
    } catch (e) {
        // Live API failed, fallback will be used
    }

    if (!resultData) {
        resultData = staticFallbackData;
    }

    let text = `╭┈❀ *HARGA EMAS ANTAM LOGAM MULIA*\n`;
    text += `┃ ◦ 📅 Tanggal: ${resultData.tanggal || staticFallbackData.tanggal}\n`;
    text += `┃ ◦ 🔄 Buyback: ${resultData.buyback || staticFallbackData.buyback}\n`;
    
    if (isLive && Array.isArray(resultData.harga)) {
        resultData.harga.forEach(item => {
            text += `┃ ◦ 💰 ${item.gram || item.potongan}: ${item.harga}\n`;
        });
    } else {
        staticFallbackData.prices.forEach(item => {
            text += `┃ ◦ 💰 ${item.gram}: ${item.harga}\n`;
        });
    }

    text += `┃ ◦ ℹ️ Sumber: ${isLive ? 'GoAPI (Live)' : 'Estimasi Pasar Antam (Static)'}\n`;
    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

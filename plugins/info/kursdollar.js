// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";

const pluginConfig = {
    name: 'kursdollar',
    alias: ['kurs', 'usdidr', 'dollar', 'exchange'],
    category: 'info',
    description: 'Informasi nilai tukar USD (Dolar AS) dan mata uang asing ke IDR',
    usage: '.kursdollar [jumlah_usd]',
    example: '.kursdollar 100',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, context = {}) {
    const rawInput = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim();
    let amount = parseFloat(rawInput);
    if (isNaN(amount) || amount <= 0) {
        amount = 1;
    }

    let usdToIdr = 15850;
    let rates = { EUR: 0.92, SGD: 1.34, MYR: 4.42, JPY: 154.5, SAR: 3.75 };
    let isLive = false;
    let lastUpdate = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    try {
        const res = await axios.get('https://open.er-api.com/v6/latest/USD', { timeout: 8000 });
        if (res.data && res.data.rates && res.data.rates.IDR) {
            usdToIdr = res.data.rates.IDR;
            rates = res.data.rates;
            isLive = true;
            if (res.data.time_last_update_utc) {
                lastUpdate = new Date(res.data.time_last_update_utc).toLocaleString('id-ID');
            }
        }
    } catch (e) {
        // Fallback data will be used on error
    }

    const totalIdr = amount * usdToIdr;
    const formattedIdr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 2 }).format(totalIdr);
    const formattedRate = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 2 }).format(usdToIdr);

    let text = `╭┈❀ *KURS MATA UANG TERKINI*\n`;
    text += `┃ ◦ 💵 USD Nominal: $${amount.toLocaleString('en-US')}\n`;
    text += `┃ ◦ 🇮🇩 Hasil Konversi IDR: ${formattedIdr}\n`;
    text += `┃ ◦ 📊 Nilai Tukar (1 USD): ${formattedRate}\n`;
    
    if (rates.EUR && rates.SGD && rates.MYR) {
        text += `┃ ◦ 💶 1 EUR: Rp ${(usdToIdr / rates.EUR).toLocaleString('id-ID', { maximumFractionDigits: 2 })}\n`;
        text += `┃ ◦ 🇸🇬 1 SGD: Rp ${(usdToIdr / rates.SGD).toLocaleString('id-ID', { maximumFractionDigits: 2 })}\n`;
        text += `┃ ◦ 🇲🇾 1 MYR: Rp ${(usdToIdr / rates.MYR).toLocaleString('id-ID', { maximumFractionDigits: 2 })}\n`;
        if (rates.JPY) text += `┃ ◦ 🇯🇵 1 JPY: Rp ${(usdToIdr / rates.JPY).toLocaleString('id-ID', { maximumFractionDigits: 2 })}\n`;
        if (rates.SAR) text += `┃ ◦ 🇸🇦 1 SAR: Rp ${(usdToIdr / rates.SAR).toLocaleString('id-ID', { maximumFractionDigits: 2 })}\n`;
    }

    text += `┃ ◦ 📅 Update: ${lastUpdate}\n`;
    text += `┃ ◦ ℹ️ Status: ${isLive ? 'Live Exchange Rate API' : 'Estimasi (Offline Fallback)'}\n`;
    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

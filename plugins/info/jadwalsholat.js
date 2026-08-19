// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";

const pluginConfig = {
    name: 'jadwalsholat',
    alias: ['sholat', 'jadwalshalat', 'jadwalsalat'],
    category: 'info',
    description: 'Jadwal sholat harian untuk kota-kota di Indonesia',
    usage: '.jadwalsholat <nama kota>',
    example: '.jadwalsholat Jakarta',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const fallbackJadwal = {
    Jakarta: { Imsak: "04:30", Fajr: "04:40", Dhuhr: "12:02", Asr: "15:21", Maghrib: "18:08", Isha: "19:18" }
};

async function handler(m, context = {}) {
    let query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim();
    if (!query) {
        query = 'Jakarta';
    }

    let timings = null;
    let dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let isLive = false;

    try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(query)}&country=Indonesia&method=20`;
        const res = await axios.get(url, { timeout: 8000 });
        if (res.data && res.data.code === 200 && res.data.data && res.data.data.timings) {
            timings = res.data.data.timings;
            isLive = true;
            if (res.data.data.date && res.data.data.date.readable) {
                dateStr = res.data.data.date.readable;
            }
        }
    } catch (e) {
        // Fallback handled below
    }

    if (!timings) {
        timings = fallbackJadwal[query] || fallbackJadwal.Jakarta;
    }

    let text = `╭┈❀ *JADWAL SHOLAT WILAYAH*\n`;
    text += `┃ ◦ 📍 Kota / Wilayah: ${query.charAt(0).toUpperCase() + query.slice(1)}\n`;
    text += `┃ ◦ 📅 Tanggal: ${dateStr}\n`;
    text += `┃ ◦ 🕌 Imsak: ${timings.Imsak || '04:30'}\n`;
    text += `┃ ◦ 🌅 Subuh: ${timings.Fajr || '04:40'}\n`;
    text += `┃ ◦ ☀️ Terbit: ${timings.Sunrise || '05:55'}\n`;
    text += `┃ ◦ 🌤️ Dzuhur: ${timings.Dhuhr || '12:02'}\n`;
    text += `┃ ◦ 🌇 Ashar: ${timings.Asr || '15:21'}\n`;
    text += `┃ ◦ 🌆 Maghrib: ${timings.Maghrib || '18:08'}\n`;
    text += `┃ ◦ 🌙 Isya: ${timings.Isha || '19:18'}\n`;
    text += `┃ ◦ ℹ️ Sumber: ${isLive ? 'Aladhan Kemenag API' : 'Jadwal Standar (Fallback)'}\n`;
    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

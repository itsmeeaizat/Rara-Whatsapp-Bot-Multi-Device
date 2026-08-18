import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "cuaca",
  alias: ["weather", "praktuaca", "infocuaca"],
  category: "info",
  description: "Cek cuaca kota saat ini",
  usage: ".cuaca <nama kota>",
  example: ".cuaca Jakarta",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const KODE_CUACA = {
  0: "Cerah ☀️",
  1: "Sebagian Berawan 🌤️",
  2: "Berawan Sebagian ⛅",
  3: "Mendung ☁️",
  45: "Kabut 🌫️",
  48: "Kabut Beku 🌫️❄️",
  51: "Gerimis Ringan 🌦️",
  53: "Gerimis 🌦️",
  55: "Gerimis Lebat 🌧️",
  61: "Hujan Ringan 🌧️",
  63: "Hujan 🌧️",
  65: "Hujan Lebat 🌧️",
  66: "Hujan Beku ❄️",
  67: "Hujan Beku Lebat ❄️",
  71: "Salju Ringan 🌨️",
  73: "Salju 🌨️",
  75: "Salju Lebat ❄️",
  77: "Butir Salju 🌨️",
  80: "Hujan Lokal 🌦️",
  81: "Hujan Lokal 🌧️",
  82: "Hujan Lokat Lebat ⛈️",
  85: "Salju Lokal 🌨️",
  86: "Salju Lokal Lebat ❄️",
  95: "Badai Petir ⛈️",
  96: "Badai Petir + Hujan Es ⛈️🧊",
  99: "Badai Petir Hebat + Hujan Es ⛈️🧊",
};

async function handler(m, { args }) {
  if (!args[0]) return m.reply(`☁️ *Cek Cuaca*\n\nKetik: *.cuaca <kota>*\nContoh: *.cuaca Jakarta*`);

  const kota = args.join(" ").trim();
  await m.react("⛅");

  try {
    const geoRes = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(kota)}&count=1&language=id&format=json`,
      { timeout: 10000 }
    );

    if (!geoRes.data.results || !geoRes.data.results.length) {
      await m.react("❌");
      return m.reply(`❌ Kota *${kota}* tidak ditemukan.\nCoba nama kota dalam bahasa Inggris, contoh: *.cuaca Tokyo*`);
    }

    const lokasi = geoRes.data.results[0];
    const cuacaRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lokasi.latitude}&longitude=${lokasi.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto&forecast_days=3`,
      { timeout: 10000 }
    );

    const cur = cuacaRes.data.current;
    const kode = KODE_CUACA[cur.weather_code] || "Tidak diketahui 🤔";
    const daily = cuacaRes.data.daily;

    let teks =
      `☁️ *Cuaca di ${lokasi.name}${lokasi.admin1 ? ", " + lokasi.admin1 : ""}${lokasi.country ? ", " + lokasi.country : ""}*\n\n` +
      `> 🌡️ Suhu: *${cur.temperature_2m}°C*\n` +
      `> 🤗 Terasa: *${cur.apparent_temperature}°C*\n` +
      `> 💧 Kelembapan: *${cur.relative_humidity_2m}%*\n` +
      `> 💨 Angin: *${cur.wind_speed_10m} km/h*\n` +
      `> 🌤️ Kondisi: *${kode}*\n\n` +
      `📅 *Prakiraan 3 Hari:*\n`;

    for (let i = 0; i < Math.min(3, daily.time.length); i++) {
      const tgl = new Date(daily.time[i]).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });
      const kondisi = KODE_CUACA[daily.weather_code[i]] || "—";
      teks += `> ${tgl}: ${kondisi} (${daily.temperature_2m_min[i]}°C - ${daily.temperature_2m_max[i]}°C) 🌧️${daily.precipitation_probability_max[i]}%\n`;
    }

    teks += `\n_Sumber: Open-Meteo_`;
    await m.react("✅");
    await m.reply(teks, { contextInfo: saluranCtx() });
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Gagal mengambil data cuaca*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

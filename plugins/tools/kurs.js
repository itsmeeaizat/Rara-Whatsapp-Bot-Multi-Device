// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "kurs",
  alias: ["rate", "kalkulatorkurs", "exchange"],
  category: "tools",
  description: "Cek kurs mata uang dan kalkulator konversi",
  usage: ".kurs [dari] [ke] [jumlah]\nContoh: .kurs USD IDR 100\nKetik .kurs untuk melihat daftar mata uang",
  example: ".kurs USD IDR 100",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const MATA_UANG_POPULER = ["USD", "IDR", "EUR", "JPY", "GBP", "AUD", "SGD", "MYR", "CNY", "KRW", "HKD", "THB", "INR", "SAR", "AED", "CAD", "CHF", "NZD"];

async function handler(m, { args }) {
  await m.react("💱");

  try {
    if (!args[0]) {
      const res = await axios.get("https://api.exchangerate-api.com/v4/latest/USD", { timeout: 10000 });
      const rates = res.data.rates;
      let daftar = MATA_UANG_POPULER.map((code) => `  • 1 USD = ${rates[code]?.toFixed(2) || "N/A"} ${code}`).join("\n");
      await m.react("✅");
      return m.reply(
        `💱 *Kurs Mata Uang (Base: USD)*\n\n${daftar}\n\nKetik: *.kurs <dari> <ke> <jumlah>*\nContoh: *.kurs USD IDR 100*`,
        { contextInfo: saluranCtx() }
      );
    }

    const dari = args[0].toUpperCase();
    const ke = (args[1] || "IDR").toUpperCase();
    const jumlah = parseFloat(args[2]) || 1;

    const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${dari}`, { timeout: 10000 });
    const rate = res.data.rates[ke];

    if (!rate) {
      await m.react("❌");
      return m.reply(`❌ Mata uang *${ke}* tidak ditemukan.\nPastikan kode mata uang benar, contoh: USD, IDR, EUR, JPY`);
    }

    const hasil = (jumlah * rate).toFixed(2);
    const reverseRate = (1 / rate).toFixed(4);

    await m.react("✅");
    await m.reply(
      `💱 *Kurs Konversi*\n\n` +
      `> ${jumlah} ${dari} = *${hasil} ${ke}*\n\n` +
      `> Rate: 1 ${dari} = ${rate.toFixed(4)} ${ke}\n` +
      `> Reverse: 1 ${ke} = ${reverseRate} ${dari}\n\n` +
      `_Sumber: ExchangeRate API | Update: ${new Date().toLocaleDateString("id-ID")}_`,
      { contextInfo: saluranCtx() }
    );
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Gagal mengambil kurs*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "kbbi",
  alias: ["kamus", "defineid", "artikata", "kbbi-online"],
  category: "tools",
  description: "Cari arti kata di KBBI (Kamus Besar Bahasa Indonesia)",
  usage: ".kbbi <kata>",
  example: ".kbbi teknologi",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args }) {
  if (!args[0]) return m.reply(`📖 *KBBI*\n\nKetik: *.kbbi <kata>*\nContoh: *.kbbi teknologi*`);

  const kata = args.join(" ").trim().toLowerCase();
  await m.react("📖");

  try {
    const res = await axios.get(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?kata=${encodeURIComponent(kata)}`, {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (res.data && res.data.status === true && res.data.result) {
      const hasil = res.data.result;
      let teks = `📖 *KBBI — ${kata}*\n\n`;

      if (Array.isArray(hasil)) {
        hasil.forEach((item, i) => {
          teks += `${i + 1}. ${item}\n\n`;
        });
      } else if (typeof hasil === "object" && hasil.arti) {
        const artiList = Array.isArray(hasil.arti) ? hasil.arti : [hasil.arti];
        artiList.forEach((arti, i) => {
          teks += `${i + 1}. ${arti}\n\n`;
        });
      } else if (typeof hasil === "string") {
        teks += `${hasil}\n\n`;
      } else {
        teks += `${JSON.stringify(hasil)}\n\n`;
      }

      teks += `_Sumber: KBBI Daring_`;
      await m.react("✅");
      await m.reply(teks, { contextInfo: saluranCtx() });
    } else {
      await m.react("❌");
      await m.reply(`❌ Kata *${kata}* tidak ditemukan di KBBI.`);
    }
  } catch (e) {
    try {
      const res2 = await axios.get(
        `https://new-kbbi-api.vercel.app/api/kbbi?word=${encodeURIComponent(kata)}`,
        { timeout: 10000 }
      );

      if (res2.data && res2.data.data) {
        const data = res2.data.data;
        let teks = `📖 *KBBI — ${kata}*\n\n`;

        if (Array.isArray(data)) {
          data.forEach((item, i) => {
            teks += `${i + 1}. ${item.arti || item.definition || item}\n\n`;
          });
        } else if (typeof data === "object" && data.arti) {
          const artiList = Array.isArray(data.arti) ? data.arti : [data.arti];
          artiList.forEach((arti, i) => {
            teks += `${i + 1}. ${arti}\n\n`;
          });
        } else if (typeof data === "string") {
          teks += `${data}\n\n`;
        } else {
          teks += `${JSON.stringify(data)}\n\n`;
        }

        teks += `_Sumber: KBBI Daring_`;
        await m.react("✅");
        return m.reply(teks, { contextInfo: saluranCtx() });
      }
    } catch {}

    await m.react("❌");
    await m.reply(`❌ *Gagal mencari kata di KBBI*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

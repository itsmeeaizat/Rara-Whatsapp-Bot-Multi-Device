import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "jadwaltv",
  alias: ["tv", "jadwalTV", "tvschedule", "acaratv"],
  category: "info",
  description: "Jadwal acara TV Indonesia hari ini",
  usage: ".jadwaltv [nama channel]\nContoh: .jadwaltv RCTI\nKetik .jadwaltv untuk melihat daftar channel",
  example: ".jadwaltv SCTV",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const DAFTAR_CHANNEL = [
  "RCTI", "SCTV", "INDOSIAR", "ANTV", "TVONE", "METRO TV",
  "TRANS7", "TRANS TV", "GTV", "MNCTV", "NET TV", "RTV",
  "KOMPAS TV", "TVRI", "DAI TV", "JAK TV"
];

async function handler(m, { args }) {
  await m.react("📺");

  if (!args[0]) {
    let daftar = DAFTAR_CHANNEL.map((c, i) => `${(i + 1).toString().padStart(2, " ")}. ${c}`).join("\n");
    await m.react("✅");
    return m.reply(
      `📺 *Daftar Channel TV*\n\n${daftar}\n\nKetik: *.jadwaltv <nama channel>*\nContoh: *.jadwaltv RCTI*`,
      { contextInfo: saluranCtx() }
    );
  }

  const channel = args.join(" ").toUpperCase().trim();

  try {
    const res = await axios.get(
      `https://api.jolimoli.id/api/tv?channel=${encodeURIComponent(channel)}`,
      { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" } }
    );

    if (res.data && res.data.result) {
      let jadwal = "";
      if (Array.isArray(res.data.result)) {
        jadwal = res.data.result
          .map((item, i) => `${(i + 1)}. ${item.time || item.jam || "—"} - ${item.title || item.acara || item.judul || "—"}`)
          .join("\n");
      } else if (typeof res.data.result === "string") {
        jadwal = res.data.result;
      } else {
        jadwal = JSON.stringify(res.data.result, null, 2);
      }

      await m.react("✅");
      return m.reply(
        `📺 *Jadwal TV — ${channel}*\n\n${jadwal}\n\n_Sumber: Jolimoli API_`,
        { contextInfo: saluranCtx() }
      );
    }

    if (res.data && res.data.data) {
      const items = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
      const jadwal = items
        .map((item, i) => `${(i + 1)}. ${item.jam || item.time || "—"} - ${item.acara || item.title || item.judul || "—"}`)
        .join("\n");

      await m.react("✅");
      return m.reply(
        `📺 *Jadwal TV — ${channel}*\n\n${jadwal}\n\n_Sumber: Jolimoli API_`,
        { contextInfo: saluranCtx() }
      );
    }

    await m.react("❌");
    await m.reply(`❌ Channel *${channel}* tidak ditemukan.\nKetik *.jadwaltv* untuk daftar channel tersedia.`);
  } catch (e) {
    try {
      const res2 = await axios.get(
        `https://api.lolhuman.xyz/api/jadwaltv/${encodeURIComponent(channel)}?apikey=test`,
        { timeout: 10000 }
      );
      if (res2.data && res2.data.result) {
        await m.react("✅");
        return m.reply(
          `📺 *Jadwal TV — ${channel}*\n\n${res2.data.result}\n\n_Sumber: LolHuman API_`,
          { contextInfo: saluranCtx() }
        );
      }
    } catch {}

    await m.react("❌");
    await m.reply(
      `❌ *Gagal mengambil jadwal TV untuk ${channel}*\n\nPastikan nama channel benar.\nDaftar: RCTI, SCTV, INDOSIAR, ANTV, GTV, MNCTV, TRANS7, TRANS TV, NET TV, dll.`
    );
  }
}

export { pluginConfig as config, handler };

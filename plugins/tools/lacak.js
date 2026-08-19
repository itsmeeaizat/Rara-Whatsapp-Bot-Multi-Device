// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "lacak",
  alias: ["resi", "cekresi", "tracking", "track", "cekpaket"],
  category: "tools",
  description: "Lacak resi paket dari berbagai ekspedisi (JNE, J&T, SiCepat, AnterAja, dll)",
  usage: ".lacak <kurir> <nomor resi>\nContoh: .lacak jne 1234567890\nKetik .lacak untuk daftar kurir",
  example: ".lacak jnt 1234567890",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const DAFTAR_KURIR = [
  ["jne", "JNE"],
  ["jnt", "J&T Express"],
  ["sicepat", "SiCepat"],
  ["anteraja", "AnterAja"],
  ["pos", "POS Indonesia"],
  ["wahana", "Wahana"],
  ["tiki", "TIKI"],
  ["lion", "Lion Parcel"],
  ["ninja", "Ninja Express"],
  ["lex", "Lazada Express"],
  ["ide", "ID Express"],
  ["spx", "Shopee Express"],
  ["jet", "Jet Express"],
  ["first", "First Logistics"],
];

async function handler(m, { args }) {
  await m.react("📦");

  if (!args[0]) {
    let daftar = DAFTAR_KURIR.map(([code, name]) => `  • ${code} → ${name}`).join("\n");
    return m.reply(
      `📦 *Lacak Resi*\n\nKetik: *.lacak <kurir> <nomor resi>*\nContoh: *.lacak jne 1234567890*\n\nDaftar kurir:\n${daftar}`,
      { contextInfo: saluranCtx() }
    );
  }

  const kurir = args[0].toLowerCase();
  const resi = args[1]?.trim();

  if (!resi) return m.reply(`❌ Masukkan nomor resi.\nContoh: *.lacak ${kurir} 1234567890*`);

  const kurirValid = DAFTAR_KURIR.find(([code]) => code === kurir);
  if (!kurirValid) return m.reply(`❌ Kurir *${kurir}* tidak ditemukan.\nKetik *.lacak* untuk daftar kurir.`);

  try {
    const res = await axios.get(
      `https://api.binderbyte.com/cek-resi?awb=${encodeURIComponent(resi)}&courier=${kurir}&api_key=test`,
      { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }
    );

    if (res.data && res.data.data && res.data.data.history) {
      const info = res.data.data;
      let teks = `📦 *Lacak Resi ${resi}*\n\n`;
      teks += `> 🚚 Kurir: *${info.courier || kurirValid[1]}*\n`;
      teks += `> 📋 Status: *${info.status || "—"}*\n`;
      teks += `> 📤 Pengirim: *${info.shipper || "—"}*\n`;
      teks += `> 📥 Penerima: *${info.receiver || "—"}*\n`;
      teks += `> 📍 Tujuan: *${info.destination || "—"}*\n\n`;
      teks += `📅 *Riwayat:*\n`;

      const history = Array.isArray(info.history) ? info.history : [info.history];
      history.forEach((h, i) => {
        teks += `${i + 1}. ${h.date || h.time || "—"}\n   ${h.desc || h.status || "—"}\n   ${h.location ? `📍 ${h.location}` : ""}\n\n`;
      });

      await m.react("✅");
      return m.reply(teks, { contextInfo: saluranCtx() });
    }

    const res2 = await axios.get(
      `https://api.cekresi.tech/cek-resi?kurir=${kurir}&resi=${encodeURIComponent(resi)}`,
      { timeout: 10000 }
    );

    if (res2.data && res2.data.data) {
      const info = res2.data.data;
      let teks = `📦 *Lacak Resi ${resi}*\n\n`;
      teks += `> 🚚 Kurir: *${kurirValid[1]}*\n`;
      teks += `> 📋 Status: *${info.status || "—"}*\n\n`;

      if (info.summary) {
        teks += `> 📤 Pengirim: *${info.summary.shipper || "—"}*\n`;
        teks += `> 📥 Penerima: *${info.summary.receiver || "—"}*\n`;
        teks += `> 📍 Tujuan: *${info.summary.destination || "—"}*\n\n`;
      }

      if (info.history && info.history.length) {
        teks += `📅 *Riwayat:*\n`;
        info.history.forEach((h, i) => {
          teks += `${i + 1}. ${h.date || "—"}\n   ${h.desc || h.status || "—"}\n${h.location ? `   📍 ${h.location}\n` : ""}\n`;
        });
      }

      await m.react("✅");
      return m.reply(teks, { contextInfo: saluranCtx() });
    }

    await m.react("❌");
    await m.reply(`❌ Resi *${resi}* tidak ditemukan di ${kurirValid[1]}.\nPeriksa nomor resi atau kurirnya.`);
  } catch (e) {
    await m.react("❌");
    await m.reply(
      `❌ *Gagal melacak resi*\n\nPastikan nomor resi benar dan kurir tepat.\nDaftar kurir: *.lacak*\n\nError: ${e.message || "API sedang sibuk, coba lagi nanti"}`
    );
  }
}

export { pluginConfig as config, handler };

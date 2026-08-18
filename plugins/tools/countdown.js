import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "countdown",
  alias: ["countdown", "hitungmundur", "tminus", "mundur"],
  category: "tools",
  description: "Hitung mundur menuju tanggal tertentu (ultah, event, deadline, dll)",
  usage: ".countdown <dd/mm/yyyy> <nama event>\nContoh: .countdown 25/12/2026 Hari Natal\nKetik .countdown list untuk lihat semua countdown",
  example: ".countdown 17/08/2027 Hari Kemerdekaan",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

function parseTanggal(str) {
  const match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [_, dd, mm, yyyy] = match;
  const tgl = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), 0, 0, 0, 0);
  if (isNaN(tgl.getTime())) return null;
  return tgl;
}

function formatSisa(target) {
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if (diff < 0) diff = 0;

  const detik = Math.floor(diff / 1000);
  const hari = Math.floor(detik / 86400);
  const jam = Math.floor((detik % 86400) / 3600);
  const menit = Math.floor((detik % 3600) / 60);
  const sisa = detik % 60;

  return {
    selesai: diff === 0,
    hari, jam, menit, detik: sisa,
    teks: diff === 0
      ? "Selesai! 🎉"
      : `${hari} hari, ${jam} jam, ${menit} menit, ${sisa} detik`,
  };
}

function formatTanggalID(tgl) {
  return tgl.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function handler(m, { args }) {
  const sub = (args[0] || "").toLowerCase();

  if (sub === "list" || sub === "cek") {
    return m.reply(
      `⏳ *Cara Pakai Countdown*\n\n` +
      `Set: *.countdown <dd/mm/yyyy> <nama event>*\n` +
      `Contoh: *.countdown 25/12/2026 Hari Natal*\n\n` +
      `Bot akan menampilkan hitung mundur real-time menuju tanggal tersebut.\n` +
      `Setiap user bisa punya countdown sendiri dengan cara reply pesan ini untuk mengecek ulang.`
    );
  }

  if (!args[0]) {
    return m.reply(
      `⏳ *Countdown*\n\nKetik: *.countdown <dd/mm/yyyy> <nama event>*\nContoh: *.countdown 25/12/2026 Hari Natal*`
    );
  }

  const tglStr = args[0];
  const namaEvent = args.slice(1).join(" ").trim() || "Event";

  const target = parseTanggal(tglStr);
  if (!target) {
    return m.reply(
      `❌ Format tanggal salah.\nGunakan format: *dd/mm/yyyy*\nContoh: *.countdown 25/12/2026 Hari Natal*`
    );
  }

  const sisa = formatSisa(target);
  const now = new Date();
  const isLewat = target.getTime() < now.getTime();

  let teks;
  if (isLewat) {
    teks =
      `⏳ *Countdown — ${namaEvent}*\n\n` +
      `> 📅 Target: *${formatTanggalID(target)}*\n` +
      `> ✅ Status: *Sudah Lewat!*\n` +
      `> 🎉 Telah berlalu *${sisa.hari} hari*\n\n` +
      `_Event ini sudah terjadi_`;
  } else {
    teks =
      `⏳ *Countdown — ${namaEvent}*\n\n` +
      `> 📅 Target: *${formatTanggalID(target)}*\n` +
      `> ⏱️ Sisa waktu: *${sisa.teks}*\n\n` +
      `> 🗓️ Hari: *${sisa.hari}*\n` +
      `> 🕐 Jam: *${sisa.jam}*\n` +
      `> ⏰ Menit: *${sisa.menit}*\n` +
      `> ⏳ Detik: *${sisa.detik}*\n\n` +
      `_Countdown berjalan real-time_`;
  }

  await m.react("⏳");
  await m.reply(teks, { contextInfo: saluranCtx() });
}

export { pluginConfig as config, handler };

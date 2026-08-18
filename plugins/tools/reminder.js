import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "reminder",
  alias: ["ingatkan", "alarm", "setreminder", "pengingat"],
  category: "tools",
  description: "Set pengingat personal, bot akan mengingatkan kamu sesuai waktu yang ditentukan",
  usage: ".reminder <waktu> <teks>\nContoh waktu: 10m, 1h, 30s, 2h, 1d\nContoh: .reminder 1h sholat zhuhur",
  example: ".reminder 30m matiikan kompor",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

const reminders = new Map();

function parseWaktu(str) {
  const match = str.match(/^(\d+)([smhd])$/i);
  if (!match) return null;
  const angka = parseInt(match[1]);
  const satuan = match[2].toLowerCase();
  const multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return angka * multiplier[satuan];
}

function formatWaktu(ms) {
  const detik = Math.floor(ms / 1000);
  const hari = Math.floor(detik / 86400);
  const jam = Math.floor((detik % 86400) / 3600);
  const menit = Math.floor((detik % 3600) / 60);
  const sisa = detik % 60;
  let parts = [];
  if (hari) parts.push(`${hari} hari`);
  if (jam) parts.push(`${jam} jam`);
  if (menit) parts.push(`${menit} menit`);
  if (sisa) parts.push(`${sisa} detik`);
  return parts.join(" ");
}

async function handler(m, { sock, args }) {
  const sub = (args[0] || "").toLowerCase();

  if (sub === "list" || sub === "cek") {
    const userReminders = [...reminders.entries()].filter(([, r]) => r.chat === m.chat && r.sender === m.sender);
    if (!userReminders.length) return m.reply("📭 Kamu tidak ada reminder aktif.");
    let teks = `📋 *Reminder Aktif (${userReminders.length})*\n\n`;
    userReminders.forEach(([id, r], i) => {
      const sisa = r.fireAt - Date.now();
      teks += `${i + 1}. ${r.text}\n   ⏰ Sisa: ${sisa > 0 ? formatWaktu(sisa) : "segera"}\n   ID: ${id}\n\n`;
    });
    return m.reply(teks, { contextInfo: saluranCtx() });
  }

  if (sub === "cancel" || sub === "hapus") {
    const id = args[1];
    if (!id) return m.reply("❌ Ketik: *.reminder cancel <id>* untuk hapus reminder.");
    if (reminders.has(id)) {
      clearTimeout(reminders.get(id).timer);
      reminders.delete(id);
      await m.react("✅");
      return m.reply(`✅ Reminder *${id}* dihapus.`);
    }
    return m.reply(`❌ Reminder *${id}* tidak ditemukan.`);
  }

  if (!args[0]) {
    return m.reply(
      `⏰ *Reminder*\n\n` +
      `Set: *.reminder <waktu> <teks>*\n` +
      `Cek: *.reminder list*\n` +
      `Hapus: *.reminder cancel <id>*\n\n` +
      `Format waktu:\n` +
      `> 30s = 30 detik\n> 10m = 10 menit\n> 1h = 1 jam\n> 2d = 2 hari\n\n` +
      `Contoh: *.reminder 1h sholat zhuhur*`
    );
  }

  const waktuStr = args[0];
  const ms = parseWaktu(waktuStr);

  if (!ms) {
    return m.reply(
      `❌ Format waktu tidak valid.\nGunakan format: <angka><satuan>\n> s = detik, m = menit, h = jam, d = hari\nContoh: *.reminder 1h sholat zhuhur*`
    );
  }

  const teksReminder = args.slice(1).join(" ").trim();
  if (!teksReminder) return m.reply("❌ Berikan teks pengingat.\nContoh: *.reminder 1h sholat zhuhur*");

  if (ms > 86400000 * 7) return m.reply("❌ Maksimal reminder 7 hari.");

  const id = `rem_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const fireAt = Date.now() + ms;

  const timer = setTimeout(async () => {
    try {
      const mention = { mentionedJid: [m.sender] };
      await sock.sendMessage(m.chat, {
        text: `⏰ *Reminder!*\n\n@${m.sender.split("@")[0]}, pengingat kamu:\n\n*${teksReminder}*\n\n_ID: ${id}_`,
        contextInfo: { ...saluranCtx(), ...mention },
      });
    } catch {}
    reminders.delete(id);
  }, ms);

  reminders.set(id, { chat: m.chat, sender: m.sender, text: teksReminder, fireAt, timer });

  await m.react("⏰");
  await m.reply(
    `⏰ *Reminder Diset!*\n\n` +
    `> 📝 Pengingat: *${teksReminder}*\n` +
    `> ⏱️ Dalam: *${formatWaktu(ms)}*\n` +
    `> 🆔 ID: *${id}*\n\n` +
    `Cek: *.reminder list*\nHapus: *.reminder cancel ${id}*`,
    { contextInfo: saluranCtx() }
  );
}

export { pluginConfig as config, handler };

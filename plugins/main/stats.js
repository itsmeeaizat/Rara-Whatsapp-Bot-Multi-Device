// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import os from "os";
import te from "../../src/lib/rara-error.js";

const pluginConfig = {
  name: "stats",
  alias: ["botstats", "status", "stat"],
  category: "main",
  description: "Menampilkan statistik bot",
  usage: ".stats",
  example: ".stats",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(" ");
}

async function handler(m, { sock, db, uptime, config: botConfig }) {
  try {
    const users = db.db?.data?.users || {};
    const groups = db.db?.data?.groups || {};
    const memUsed = process.memoryUsage();
    const cpuUsage = os.loadavg()[0].toFixed(2);
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const totalUsers = Object.keys(users).length;
    const totalGroups = Object.keys(groups).length;
    const premiumUsers = Object.values(users).filter((u) => u.premium).length;
    const botName = botConfig?.bot?.name || "Rara-AI";
    const version = botConfig?.bot?.version || "1.0.0";

    let txt = `╭─〔 📊 *ʙᴏᴛ sᴛᴀᴛɪsᴛɪᴄs* 〕\n`
    txt += `┃\n`
    txt += `┃ 🤖 *Bot:* ${botName}\n`
    txt += `┃ 🔑 *Versi:* v${version}\n`
    txt += `┃ ⏱️ *Uptime:* ${formatUptime(uptime)}\n`
    txt += `┃\n`
    txt += `┃ 👥 *ᴜsᴇʀs*\n`
    txt += `┃ ➤ Total: ${totalUsers}\n`
    txt += `┃ ➤ Premium: ${premiumUsers}\n`
    txt += `┃ ➤ Groups: ${totalGroups}\n`
    txt += `┃\n`
    txt += `┃ 🖥️ *sʏsᴛᴇᴍ*\n`
    txt += `┃ ➤ Platform: ${os.platform()} ${os.arch()}\n`
    txt += `┃ ➤ Node: ${process.version}\n`
    txt += `┃ ➤ CPU Load: ${cpuUsage}%\n`
    txt += `┃ ➤ RAM: ${formatBytes(usedMem)} / ${formatBytes(totalMem)}\n`
    txt += `┃ ➤ Heap: ${formatBytes(memUsed.heapUsed)} / ${formatBytes(memUsed.heapTotal)}\n`
    txt += `┃\n`
    txt += `┃ _Updated: ${new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta" })}_\n`
    txt += `╰────────────────⬣`

    await m.reply(txt);
  } catch (error) {
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };

import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "shortlink",
  alias: ["shorturl", "urlshort", "tinyurl", "short"],
  category: "tools",
  description: "Pendekkan URL panjang",
  usage: ".shortlink <url>",
  example: ".shortlink https://www.google.com/search?q=very+long+search+query+here",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args }) {
  if (!args[0]) return m.reply(`🔗 *Short Link*\n\nKetik: *.shortlink <url>*\nContoh: *.shortlink https://www.google.com*`);

  let url = args[0];
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  await m.react("🔗");

  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const shortUrl = res.data.trim();

    if (!shortUrl || shortUrl.includes("Error")) {
      throw new Error("URL tidak valid atau tidak bisa dipendekkan");
    }

    await m.react("✅");
    await m.reply(
      `🔗 *Short Link*\n\n` +
      `> Original:\n${url}\n\n` +
      `> Short:\n${shortUrl}\n\n` +
      `_Powered by TinyURL_`,
      { contextInfo: saluranCtx() }
    );
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Gagal memendekkan URL*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

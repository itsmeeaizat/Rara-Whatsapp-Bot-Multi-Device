// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "whois",
  alias: ["domain", "cekdomain", "domaininfo", "lookup"],
  category: "tools",
  description: "Cek informasi domain (WHOIS lookup)",
  usage: ".whois <domain>",
  example: ".whois google.com",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

function formatDate(date) {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return String(date);
  }
}

async function handler(m, { args }) {
  if (!args[0]) return m.reply(`🌐 *WHOIS Lookup*\n\nKetik: *.whois <domain>*\nContoh: *.whois google.com*`);

  let domain = args[0].toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  await m.react("🌐");

  try {
    const res = await axios.get(
      `https://rdap.org/domain/${domain}`,
      { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }
    );

    if (res.data && res.data.ldType === "domain") {
      const d = res.data;
      let registrar = "—";
      let createdDate = "—";
      let updatedDate = "—";
      let expiryDate = "—";

      for (const ev of d.events || []) {
        if (ev.eventAction === "registration") createdDate = ev.eventDate;
        if (ev.eventAction === "last changed") updatedDate = ev.eventDate;
        if (ev.eventAction === "expiration") expiryDate = ev.eventDate;
      }

      for (const ent of d.entities || []) {
        if (ent.roles && ent.roles.includes("registrar")) {
          registrar = ent.vcardArray?.[1]?.find((v) => v[0] === "fn")?.[3] || ent.handle || "—";
        }
      }

      const status = (d.status || []).map((s) => `  • ${s.replace(/^https?:\/\//, "").split("/")[0]}`).join("\n");
      const nameservers = (d.nameservers || []).map((ns) => `  • ${ns.ldhName || ns}`).join("\n");

      let teks = `🌐 *WHOIS — ${domain}*\n\n`;
      teks += `> 📛 Domain: *${d.ldhName || domain}*\n`;
      teks += `> 🏢 Registrar: *${registrar}*\n`;
      teks += `> 📅 Dibuat: *${formatDate(createdDate)}*\n`;
      teks += `> 🔄 Update: *${formatDate(updatedDate)}*\n`;
      teks += `> ⏳ Expired: *${formatDate(expiryDate)}*\n\n`;

      if (status) teks += `📋 *Status:*\n${status}\n\n`;
      if (nameservers) teks += `🔗 *Nameservers:*\n${nameservers}\n\n`;

      teks += `_Sumber: RDAP.org_`;

      await m.react("✅");
      await m.reply(teks, { contextInfo: saluranCtx() });
    } else {
      throw new Error("Domain tidak ditemukan");
    }
  } catch (e) {
    await m.react("❌");
    await m.reply(
      `❌ *Gagal mengambil info domain ${domain}*\n\nPastikan domain valid dan masih aktif.\nContoh: *.whois google.com*`
    );
  }
}

export { pluginConfig as config, handler };

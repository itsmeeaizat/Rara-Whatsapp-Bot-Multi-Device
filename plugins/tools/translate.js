import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "translate",
  alias: ["tr", "terjemah", "translateid"],
  category: "tools",
  description: "Terjemahkan teks ke bahasa lain",
  usage: ".translate <kode_bahasa> <teks>\nContoh kode: en, ja, ko, ar, fr, de, zh, es",
  example: ".translate en halo semuanya",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

const BAHASA_POPULER = {
  en: "English",
  ja: "Japanese (Jepang)",
  ko: "Korean (Korea)",
  zh: "Chinese (Mandarin)",
  ar: "Arabic (Arab)",
  fr: "French (Prancis)",
  de: "German (Jerman)",
  es: "Spanish (Spanyol)",
  ru: "Russian (Rusia)",
  it: "Italian (Italia)",
  pt: "Portuguese (Portugis)",
  nl: "Dutch (Belanda)",
  th: "Thai (Thailand)",
  vi: "Vietnamese (Vietnam)",
  hi: "Hindi",
  tr: "Turkish (Turki)",
  id: "Indonesian (Indonesia)",
  jw: "Javanese (Jawa)",
  su: "Sundanese (Sunda)",
};

async function handler(m, { args }) {
  if (!args[0]) {
    let daftar = Object.entries(BAHASA_POPULER).map(([k, v]) => `  • ${k} → ${v}`).join("\n");
    return m.reply(
      `🌐 *Translate*\n\nKetik: *.translate <kode_bahasa> <teks>*\n\nDaftar bahasa populer:\n${daftar}\n\nContoh: *.translate en halo semuanya*`
    );
  }

  const target = args[0].toLowerCase();
  const teks = args.slice(1).join(" ").trim();

  if (!teks) {
    if (m.quoted && m.quoted.text) {
      return handler(m, { args: [target, m.quoted.text] });
    }
    return m.reply(`❌ Berikan teks yang ingin diterjemahkan.\nContoh: *.translate en halo semuanya*`);
  }

  await m.react("🌐");

  try {
    const res = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(teks)}`,
      { timeout: 15000, headers: { "User-Agent": "Mozilla/5.0" } }
    );

    const hasil = res.data[0].map((x) => x[0]).join("");
    const sumber = res.data[2] || "auto";
    const namaBahasa = BAHASA_POPULER[target] || target;

    await m.react("✅");
    await m.reply(
      `🌐 *Translate Result*\n\n` +
      `> 📝 Original (${sumber}):\n${teks}\n\n` +
      `> ✨ ${namaBahasa}:\n${hasil}\n\n` +
      `_Rara Multi Device_`,
      { contextInfo: saluranCtx() }
    );
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Gagal menerjemahkan*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

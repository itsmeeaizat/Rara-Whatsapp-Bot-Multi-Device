// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "base64",
  alias: ["b64", "encode64", "decode64"],
  category: "tools",
  description: "Encode/Decode Base64 string",
  usage: ".base64 encode <teks>\n.base64 decode <teks base64>",
  example: ".base64 encode halo semuanya",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { args }) {
  const mode = (args[0] || "").toLowerCase();
  const teks = args.slice(1).join(" ").trim();

  if (!mode || !teks) {
    return m.reply(
      `🔤 *Base64 Encoder/Decoder*\n\n` +
      `Encode: *.base64 encode <teks>*\n` +
      `Decode: *.base64 decode <teks base64>*\n\n` +
      `Contoh:\n` +
      `> .base64 encode halo semuanya\n` +
      `> .base64 decode aGFsbyBzZW11YQ==`
    );
  }

  await m.react("🔤");

  try {
    let result;
    if (mode === "encode" || mode === "e") {
      result = Buffer.from(teks, "utf-8").toString("base64");
      await m.react("✅");
      await m.reply(
        `🔤 *Base64 Encode*\n\n` +
        `> 📝 Input:\n\`\`\`${teks}\`\`\`\n\n` +
        `> ✨ Output:\n\`\`\`${result}\`\`\``,
        { contextInfo: saluranCtx() }
      );
    } else if (mode === "decode" || mode === "d") {
      result = Buffer.from(teks, "base64").toString("utf-8");
      if (!result || result === teks) {
        await m.react("❌");
        return m.reply(`❌ String Base64 tidak valid atau tidak bisa di-decode.`);
      }
      await m.react("✅");
      await m.reply(
        `🔤 *Base64 Decode*\n\n` +
        `> 📝 Input:\n\`\`\`${teks}\`\`\`\n\n` +
        `> ✨ Output:\n\`\`\`${result}\`\`\``,
        { contextInfo: saluranCtx() }
      );
    } else {
      await m.react("❌");
      await m.reply(`❌ Mode tidak dikenal. Gunakan *encode* atau *decode*.\nContoh: *.base64 encode halo*`);
    }
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Error*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

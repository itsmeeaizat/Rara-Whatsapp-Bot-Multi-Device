import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "resep",
  alias: ["recipe", "resep_masakan", "masak", "carimasak"],
  category: "info",
  description: "Cari resep masakan Indonesia",
  usage: ".resep <nama makanan>\nKetik .resep untuk resep random",
  example: ".resep nasi goreng",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args }) {
  await m.react("🍳");

  try {
    if (!args[0]) {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", {
        timeout: 10000,
      });

      if (res.data && res.data.meals) {
        const meal = res.data.meals[0];
        return formatResep(m, meal, true);
      }
    }

    const cari = args.join(" ").trim();
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cari)}`,
      { timeout: 10000 }
    );

    if (res.data && res.data.meals && res.data.meals.length > 0) {
      const meal = res.data.meals[0];
      return formatResep(m, meal, false);
    }

    const res2 = await axios.get(
      `https://api.masakapa.tech/api/search?q=${encodeURIComponent(cari)}`,
      { timeout: 10000 }
    );

    if (res2.data && res2.data.results && res2.data.results.length > 0) {
      const item = res2.data.results[0];
      const detailRes = await axios.get(
        `https://api.masakapa.tech/api/recipe/${item.key}`,
        { timeout: 10000 }
      );

      if (detailRes.data && detailRes.data.results) {
        const d = detailRes.data.results;
        let teks = `🍳 *Resep: ${d.title}*\n\n`;
        teks += `> ⏱️ Waktu: *${d.times || "—"}*\n`;
        teks += `> 👥 Porsi: *${d.serving || "—"}*\n`;
        teks += `> ⭐ Tingkat: *${d.dificulty || "—"}*\n\n`;
        teks += `📝 *Bahan:*\n${d.ingredient || "Lihat link di bawah"}\n\n`;
        teks += `👨‍🍳 *Cara Membuat:*\n${d.step || "Lihat link di bawah"}\n\n`;

        if (d.thumb) teks += `📸 Thumbnail: ${d.thumb}\n`;
        if (d.url) teks += `🔗 Detail: ${d.url}\n`;
        teks += `\n_Sumber: MasakApa.tech_`;

        await m.react("✅");
        return m.reply(teks, { contextInfo: saluranCtx() });
      }
    }

    await m.react("❌");
    await m.reply(`❌ Resep *${cari}* tidak ditemukan.\nCoba kata kunci yang lebih umum, contoh: *.resep chicken*, *.resep soup*`);
  } catch (e) {
    await m.react("☢");
    await m.reply(`❌ *Gagal mencari resep*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

async function formatResep(m, meal, isRandom) {
  let bahan = [];
  for (let i = 1; i <= 20; i++) {
    const b = meal[`strIngredient${i}`];
    const t = meal[`strMeasure${i}`];
    if (b && b.trim()) bahan.push(`  • ${b}${t ? ` (${t})` : ""}`);
  }

  let teks = `🍳 *Resep: ${meal.strMeal}*\n\n`;
  teks += `> 🌍 Asal: *${meal.strArea || "—"}*\n`;
  teks += `> 📂 Kategori: *${meal.strCategory || "—"}*\n\n`;
  teks += `📝 *Bahan:*\n${bahan.join("\n")}\n\n`;
  teks += `👨‍🍳 *Cara Membuat:*\n${meal.strInstructions || "Lihat link"}\n`;

  if (meal.strYoutube) teks += `\n▶️ Video: ${meal.strYoutube}\n`;
  if (meal.strSource) teks += `🔗 Source: ${meal.strSource}\n`;
  teks += `\n_Sumber: TheMealDB${isRandom ? " (Random)" : ""}_`;

  await m.react("✅");

  if (meal.strMealThumb) {
    try {
      const imgRes = await axios.get(meal.strMealThumb, { responseType: "arraybuffer", timeout: 10000 });
      const sock = global.sock || m._sock;
      if (sock) {
        return await sock.sendMedia(m.chat, Buffer.from(imgRes.data), teks, m, { type: "image" });
      }
    } catch {}
  }

  await m.reply(teks, { contextInfo: saluranCtx() });
}

export { pluginConfig as config, handler };

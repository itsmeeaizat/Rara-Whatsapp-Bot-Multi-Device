// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from "axios";
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "crypto",
  alias: ["cryptoprice", "kripto", "coin", "tokenprice"],
  category: "info",
  description: "Cek harga cryptocurrency real-time",
  usage: ".crypto [nama koin]\nContoh: .crypto bitcoin\nKetik .crypto untuk melihat top 10",
  example: ".crypto ethereum",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

function formatRupiah(angka) {
  if (angka >= 1e9) return "Rp " + (angka / 1e9).toFixed(2) + " M";
  if (angka >= 1e6) return "Rp " + (angka / 1e6).toFixed(2) + " Jt";
  return "Rp " + angka.toLocaleString("id-ID");
}

function formatUSD(angka) {
  if (angka >= 1e9) return "$" + (angka / 1e9).toFixed(2) + "B";
  if (angka >= 1e6) return "$" + (angka / 1e6).toFixed(2) + "M";
  if (angka >= 1e3) return "$" + (angka / 1e3).toFixed(2) + "K";
  return "$" + angka.toFixed(angka < 1 ? 6 : 2);
}

async function handler(m, { args }) {
  await m.react("₿");

  try {
    if (!args[0]) {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
        { timeout: 15000 }
      );

      let teks = "₿ *Top 10 Crypto by Market Cap*\n\n";
      res.data.forEach((coin, i) => {
        const change = coin.price_change_percentage_24h;
        const arrow = change >= 0 ? "📈" : "📉";
        teks += `${i + 1}. *${coin.symbol.toUpperCase()}* — ${coin.name}\n   ${formatUSD(coin.current_price)} ${arrow} ${change?.toFixed(2)}%\n   Vol: ${formatUSD(coin.total_volume)} | MC: ${formatUSD(coin.market_cap)}\n\n`;
      });
      teks += `_Sumber: CoinGecko | ${new Date().toLocaleString("id-ID")}_\n\nKetik: *.crypto <nama koin>* untuk detail.`;

      await m.react("✅");
      return m.reply(teks, { contextInfo: saluranCtx() });
    }

    const koin = args.join(" ").toLowerCase().trim();
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${koin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      { timeout: 15000 }
    );

    const c = res.data;
    const md = c.market_data;
    const change24h = md.price_change_percentage_24h?.toFixed(2) || "0";
    const change7d = md.price_change_percentage_7d?.toFixed(2) || "0";
    const arrow24 = change24h >= 0 ? "📈" : "📉";
    const arrow7 = change7d >= 0 ? "📈" : "📉";

    const teks =
      `₿ *${c.name} (${c.symbol.toUpperCase()})*\n\n` +
      `> 💰 Harga: *${formatUSD(md.current_price.usd)}*\n` +
      `> 24h: ${arrow24} ${change24h}%\n` +
      `> 7d: ${arrow7} ${change7d}%\n\n` +
      `> 📊 Market Cap: *${formatUSD(md.market_cap.usd)}*\n` +
      `> 📊 Volume 24h: *${formatUSD(md.total_volume.usd)}*\n` +
      `> 🔄 Circulating Supply: ${md.circulating_supply?.toLocaleString("id-ID") || "N/A"} ${c.symbol.toUpperCase()}\n` +
      `> 📈 ATH: ${formatUSD(md.ath.usd)} (${md.ath_change_percentage_usd?.toFixed(1)}%)\n` +
      `> 📉 ATL: ${formatUSD(md.atl.usd)}\n\n` +
      `> Rank: #${c.market_cap_rank || "N/A"}\n` +
      `> Website: ${c.links?.homepage?.[0] || "N/A"}\n\n` +
      `_Sumber: CoinGecko | ${new Date().toLocaleString("id-ID")}_`;

    await m.react("✅");
    await m.reply(teks, { contextInfo: saluranCtx() });
  } catch (e) {
    if (e.response?.status === 404) {
      await m.react("❌");
      return m.reply(`❌ Koin *${args.join(" ")}* tidak ditemukan.\nGunakan nama lengkap koin, contoh: *.crypto bitcoin*, *.crypto ethereum*`);
    }
    await m.react("☢");
    await m.reply(`❌ *Gagal mengambil data crypto*\n\n> ${e.message || "Coba lagi nanti"}`);
  }
}

export { pluginConfig as config, handler };

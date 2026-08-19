// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { getAssetBuffer } from "../../src/lib/rara-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "sc",
    alias: ["script"],
    category: "main",
    description: "Link script bot wa terbaru",
    usage: ".sc",
    example: ".sc",
    isPremium: false,
    isOwner: false,
    isBanned: false,
    isAdmin: false,
    cooldown: 10,
    energi: 0,
    isBotAdmin: false,
    isEnabled: true
}

async function handler(m, { sock }) {
    const botName = config.bot?.name || "Rara-AI"

    const caption =
        `╭─〔 🌾 *sᴏᴜʀᴄᴇ ᴄᴏᴅᴇ* 〕\n` +
        `┃\n` +
        `┃ ➤ Halo kak *${m.pushName}* 👋\n` +
        `┃\n` +
        `┃ _Untuk asli dari bot ini, kamu_\n` +
        `┃ _bisa dapatkan melalui link di bawah,_\n` +
        `┃ _cari kata kunci *Rara Multi Device*_\n` +
        `┃\n` +
        `┃ 🏷 *Bot:* ${botName}\n` +
        `┃ 👨‍💻 *Dev:* Aizat\n` +
        `┃ 🇮🇩 *Made in Indonesia*\n` +
        `┃\n` +
        `┃ _💬 Link akan mengarahkan ke channel_\n` +
        `┃ _Youtube kami_\n` +
        `╰────────────────⬣`

    return await sock.sendMessage(m.chat, {
        image: getAssetBuffer("rara"),
        caption: caption,
        footer: "Rara Multi Device",
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🥐 Youtube Rara",
                    url: "https://www.youtube.com/@example",
                    merchant_url: "https://www.youtube.com/@example"
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🥐 Youtube Rara",
                    url: "https://www.youtube.com/@example",
                    merchant_url: "https://www.youtube.com/@example"
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "🥐 Youtube Danz Nano",
                    url: "https://youtube.com/@example",
                    merchant_url: "https://youtube.com/@example"
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }

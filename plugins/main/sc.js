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
    return await sock.sendMessage(m.chat, {
        image: getAssetBuffer("rara"),
        caption: `🌾 Halo kak *${m.pushName}*
        
Untuk asli dari bot ini, kamu bisa dapatkan melalui link, nanti kamu tinggal cari kata kunci *Rara Multi Device*`,
        footer: "💬 Link ini nanti akan mengarahkan kamu ke channel Youtube kami",
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

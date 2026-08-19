// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'infoeth', alias: ['eth', 'ethereum'], category: 'info', description: 'Harga Ethereum via CoinGecko', usage: '.infoeth', example: '.infoeth', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr,usd&include_24hr_change=true')
        const d = res.data.ethereum
        const change = d.idr_24h_change?.toFixed(2) || 'N/A'
        const arrow = parseFloat(change) >= 0 ? '+' : ''
        let lines = ['╭┈❀ *ETHEREUM (ETH)*', '┃', '┃ ◦ IDR: Rp ' + d.idr.toLocaleString('id-ID'), '┃ ◦ USD: $' + d.usd.toLocaleString('en-US'), '┃ ◦ 24h: ' + arrow + change + '%', '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

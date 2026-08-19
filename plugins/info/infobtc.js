// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'infobtc', alias: ['btc', 'bitcoin'], category: 'info', description: 'Harga Bitcoin via CoinGecko', usage: '.infobtc', example: '.infobtc', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=idr,usd&include_24hr_change=true')
        const d = res.data.bitcoin
        const change = d.idr_24h_change?.toFixed(2) || 'N/A'
        const arrow = parseFloat(change) >= 0 ? '+' : ''
        let lines = ['╭┈❀ *BITCOIN (BTC)*', '┃', '┃ ◦ IDR: Rp ' + d.idr.toLocaleString('id-ID'), '┃ ◦ USD: $' + d.usd.toLocaleString('en-US'), '┃ ◦ 24h: ' + arrow + change + '%', '┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀']
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

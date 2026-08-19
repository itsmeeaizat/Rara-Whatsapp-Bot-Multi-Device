// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import dns from 'dns'
import { promisify } from 'util'
const resolve4 = promisify(dns.resolve4)
const resolveMx = promisify(dns.resolveMx)
const resolveNs = promisify(dns.resolveNs)
const resolveTxt = promisify(dns.resolveTxt)
const pluginConfig = { name: 'cekdns', alias: ['dns', 'dnslookup'], category: 'cek', description: 'DNS lookup untuk domain', usage: '.cekdns <domain>', example: '.cekdns google.com', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim().replace(/^https?:\/\//, '').replace(/\/.*/, '')
    if (!text) return m.reply('Masukkan domain!\n\nContoh: .cekdns google.com')
    let lines = ['╭┈❀ *DNS LOOKUP*', '┃', '┃ ◦ Domain: ' + text, '┃']
    try { const a = await resolve4(text); lines.push('┃ ◦ A: ' + a.join(', ')) } catch { lines.push('┃ ◦ A: N/A') }
    try { const mx = await resolveMx(text); lines.push('┃ ◦ MX: ' + mx.map(r => r.exchange).join(', ')) } catch { lines.push('┃ ◦ MX: N/A') }
    try { const ns = await resolveNs(text); lines.push('┃ ◦ NS: ' + ns.join(', ')) } catch { lines.push('┃ ◦ NS: N/A') }
    try { const txt = await resolveTxt(text); lines.push('┃ ◦ TXT: ' + txt.map(r => r.join('')).slice(0, 3).join(' | ')) } catch { lines.push('┃ ◦ TXT: N/A') }
    lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
    return m.reply(lines.join('\n'))
}
export { pluginConfig as config, handler }

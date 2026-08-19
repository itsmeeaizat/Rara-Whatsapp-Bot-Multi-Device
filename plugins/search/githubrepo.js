// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'githubrepo', alias: ['ghrepo', 'repo'], category: 'search', description: 'Cari repository di GitHub', usage: '.githubrepo <query>', example: '.githubrepo whatsapp bot', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata kunci!\n\nContoh: .githubrepo whatsapp bot')
    try {
        const res = await axios.get('https://api.github.com/search/repositories?q=' + encodeURIComponent(text) + '&sort=stars&per_page=5')
        const items = res.data.items || []
        if (!items.length) return m.reply('Tidak ada hasil untuk: ' + text)
        let lines = ['╭┈❀ *GITHUB REPO*', '┃', '┃ ◦ Query: ' + text, '┃ ◦ Total: ' + res.data.total_count + ' repos', '┃']
        items.forEach((r, i) => {
            lines.push('┃ ◦ ' + (i+1) + '. ' + r.full_name)
            lines.push('┃   Stars: ' + r.stargazers_count + ' | Forks: ' + r.forks_count)
            lines.push('┃   Bahasa: ' + (r.language || 'N/A'))
            if (r.description) lines.push('┃   Desc: ' + r.description.slice(0, 80))
            lines.push('┃   URL: ' + r.html_url)
            if (i < items.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

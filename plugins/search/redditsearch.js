// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'redditsearch', alias: ['reddit', 'rdt'], category: 'search', description: 'Cari post di Reddit', usage: '.redditsearch <query>', example: '.redditsearch programming', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan kata kunci!\n\nContoh: .redditsearch programming')
    try {
        const res = await axios.get('https://www.reddit.com/search.json?q=' + encodeURIComponent(text) + '&limit=5')
        const posts = res.data.data.children || []
        if (!posts.length) return m.reply('Tidak ada hasil untuk: ' + text)
        let lines = ['╭┈❀ *REDDIT SEARCH*', '┃', '┃ ◦ Query: ' + text, '┃']
        posts.forEach((p, i) => {
            const d = p.data
            lines.push('┃ ◦ ' + (i+1) + '. ' + d.title)
            lines.push('┃   r/' + d.subreddit + ' | Score: ' + d.score + ' | Comments: ' + d.num_comments)
            lines.push('┃   URL: https://reddit.com' + d.permalink)
            if (i < posts.length - 1) lines.push('┃')
        })
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

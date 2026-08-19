// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'aitrivia', alias: ['trivia', 'tebaktrivia'], category: 'ai', description: 'Pertanyaan trivia dari Open Trivia DB', usage: '.aitrivia', example: '.aitrivia', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    try {
        const res = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
        const q = res.data.results[0]
        let lines = ['╭┈❀ *TRIVIA*', '┃', '┃ ◦ Category: ' + q.category, '┃ ◦ Difficulty: ' + q.difficulty, '┃', '┃ ◦ ' + q.question]
        if (q.type === 'multiple') {
            const opts = [...q.incorrect_answers, q.correct_answer]
            opts.sort(() => Math.random() - 0.5)
            opts.forEach((o, i) => { lines.push('┃   ' + String.fromCharCode(65+i) + '. ' + o) })
        }
        lines.push('┃', '┃ ◦ Ketik .aitriviaanswer untuk lihat jawaban', '┃ ◦ Jawaban: ||' + q.correct_answer + '||', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

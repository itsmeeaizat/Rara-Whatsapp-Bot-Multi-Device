// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'
const pluginConfig = { name: 'cariresep', alias: ['resep', 'recipe'], category: 'search', description: 'Cari resep makanan via TheMealDB', usage: '.cariresep <nama makanan>', example: '.cariresep chicken', isOwner: false, isPremium: false, isGroup: false, isPrivate: false, cooldown: 5, energi: 0, isEnabled: true }
async function handler(m) {
    const text = (m.text || '').trim()
    if (!text) return m.reply('Masukkan nama makanan!\n\nContoh: .cariresep chicken')
    try {
        const res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(text))
        const meals = res.data.meals
        if (!meals) return m.reply('Tidak ada resep untuk: ' + text)
        const meal = meals[0]
        let lines = ['╭┈❀ *RESEP MAKANAN*', '┃', '┃ ◦ Nama: ' + meal.strMeal, '┃ ◦ Kategori: ' + meal.strCategory, '┃ ◦ Asal: ' + meal.strArea, '┃']
        if (meal.strInstructions) lines.push('┃ ◦ Cara: ' + meal.strInstructions.slice(0, 300) + '...')
        if (meal.strYoutube) lines.push('┃ ◦ Video: ' + meal.strYoutube)
        lines.push('┃', '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')
        return m.reply(lines.join('\n'))
    } catch (e) { return m.reply('Error: ' + e.message) }
}
export { pluginConfig as config, handler }

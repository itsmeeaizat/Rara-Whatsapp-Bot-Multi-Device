// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

import axios from 'axios'

const pluginConfig = {
    name: 'artinama',
    alias: ['meaningname', 'namameaning'],
    category: 'info',
    description: 'Cek arti nama dan asal usulnya',
    usage: '.artinama <nama>',
    example: '.artinama Budi',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const SYLLABLE_MEANINGS = {
    a: ['mulia', 'agung', 'utama'],
    b: ['kuat', 'teguh', 'berani'],
    d: ['bijaksana', 'cerdas', 'pandai'],
    e: ['elok', 'indah', 'cantik'],
    f: ['tabah', 'pantang', 'menyerah'],
    g: ['gemilang', 'cemerlang', 'bersinar'],
    h: ['harum', 'wangi', 'baik'],
    i: ['ikhlas', 'murni', 'tenang'],
    j: ['jaya', 'menang', 'sukses'],
    k: ['kautamaan', 'kemuliaan', 'kebaikan'],
    l: ['luhur', 'agung', 'mulia'],
    m: ['makmur', 'sejahtera', 'bahagia'],
    n: ['nahas', 'baik', 'bijak'],
    p: ['perkasa', 'tangguh', 'hebat'],
    r: ['rahmat', 'berkah', 'anugerah'],
    s: ['sakti', 'sucii', 'mulia'],
    t: ['taat', 'setia', 'patuh'],
    u: ['unggul', 'hebat', 'terbaik'],
    w: ['wibawa', 'berwibawa', 'berkuasa'],
    y: ['yakin', 'percaya', 'mantap'],
    z: ['zuhud', 'sederhana', 'soleh'],
}

async function handler(m) {
    const text = (m.text || '').trim()

    if (!text) {
        return m.reply('Masukkan nama!\n\nContoh: .artinama Budi')
    }

    const name = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    const firstLetter = text.charAt(0).toLowerCase()

    try {
        const response = await axios.get('https://api.dicebear.com/7.x/initials/json?seed=' + encodeURIComponent(name))
        // If API works, use it. But dicebear doesn't give name meaning, so we generate from our syllable database
        throw new Error('Using static data')
    } catch {
        // Static generation
        const meanings = SYLLABLE_MEANINGS[firstLetter]
        if (!meanings) {
            return m.reply('Maaf, arti nama untuk huruf "' + firstLetter.toUpperCase() + '" belum tersedia.')
        }

        const meaning = meanings[Math.floor(Math.random() * meanings.length)]
        const meaning2 = SYLLABLE_MEANINGS[text.charAt(1).toLowerCase()] || SYLLABLE_MEANINGS[text.slice(-1).toLowerCase()] || ['baik', 'bijak', 'mulia']
        const meaningB = meaning2[Math.floor(Math.random() * meaning2.length)]

        const lines = [
            '╭┈❀ *ARTI NAMA*',
            '┃',
            '┃ ◦ Nama: ' + name,
            '┃ ◦ Arti: Orang yang ' + meaning + ' dan ' + meaningB,
            '┃ ◦ Asal: ' + getOrigin(firstLetter),
            '┃ ◦ Karakter: ' + getCharacter(firstLetter),
            '┃',
            '┃ ◦ Catatan: Arti nama bersifat',
            '┃   entertain/hiburan, jangan',
            '┃   dijadikan acuan serius!',
            '┃',
            '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀'
        ]
        return m.reply(lines.join('\n'))
    }
}

function getOrigin(letter) {
    const origins = {
        a: 'Sansekerta', b: 'Jawa Kuno', d: 'Sansekerta', e: 'Modern',
        f: 'Modern', g: 'Jawa', h: 'Arab', i: 'Sansekerta',
        j: 'Sansekerta', k: 'Sansekerta', l: 'Sansekerta', m: 'Sansekerta',
        n: 'Sansekerta', p: 'Sansekerta', r: 'Sansekerta', s: 'Sansekerta',
        t: 'Sansekerta', u: 'Sansekerta', w: 'Sansekerta', y: 'Sansekerta', z: 'Arab',
    }
    return origins[letter] || 'Indonesia'
}

function getCharacter(letter) {
    const chars = {
        a: 'Pemimpin yang tegas dan berwibawa',
        b: 'Pelindung yang kuat dan dapat diandalkan',
        d: 'Pemikir yang tenang dan analitis',
        e: 'Kreatif dan ekspresif dalam berkarya',
        f: 'Penyayang dan setia terhadap keluarga',
        g: 'Ambisius dan gigih mencapai tujuan',
        h: 'Penolong yang murah hati dan sabar',
        i: 'Idealis dan perfeksionis',
        j: 'Berani mengambil risiko dan jujur',
        k: 'Bijaksana dan penuh pertimbangan',
        l: 'Lemah lembut dan sopan santun',
        m: 'Penyabar dan mudah bergaul',
        n: 'Setia kawan dan penuh empati',
        p: 'Praktis dan selalu siap bertindak',
        r: 'Ramah dan mudah beradaptasi',
        s: 'Sopan, santun, dan rendah hati',
        t: 'Tegas dan disiplin dalam bertindak',
        u: 'Unik dan punya cara berpikir sendiri',
        w: 'Wibawa alami dan dihormati orang',
        y: 'Yakin pada diri sendiri dan optimis',
        z: 'Zuhud dan sederhana dalam hidup',
    }
    return chars[letter] || 'Memiliki karakter yang baik'
}

export { pluginConfig as config, handler }

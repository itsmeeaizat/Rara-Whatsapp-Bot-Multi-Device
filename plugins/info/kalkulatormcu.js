// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'kalkulatormcu',
    alias: ['mcu', 'marvel'],
    category: 'info',
    description: 'Timeline dan urutan tonton Marvel Cinematic Universe',
    usage: '.kalkulatormcu',
    example: '.kalkulatormcu',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const MCU_TIMELINE = [
    { phase: 'Phase 1', title: 'Iron Man', year: 2008, order: 1 },
    { phase: 'Phase 1', title: 'The Incredible Hulk', year: 2008, order: 2 },
    { phase: 'Phase 1', title: 'Iron Man 2', year: 2010, order: 3 },
    { phase: 'Phase 1', title: 'Thor', year: 2011, order: 4 },
    { phase: 'Phase 1', title: 'Captain America: The First Avenger', year: 2011, order: 5 },
    { phase: 'Phase 1', title: 'The Avengers', year: 2012, order: 6 },
    { phase: 'Phase 2', title: 'Iron Man 3', year: 2013, order: 7 },
    { phase: 'Phase 2', title: 'Thor: The Dark World', year: 2013, order: 8 },
    { phase: 'Phase 2', title: 'Captain America: The Winter Soldier', year: 2014, order: 9 },
    { phase: 'Phase 2', title: 'Guardians of the Galaxy', year: 2014, order: 10 },
    { phase: 'Phase 2', title: 'Avengers: Age of Ultron', year: 2015, order: 11 },
    { phase: 'Phase 2', title: 'Ant-Man', year: 2015, order: 12 },
    { phase: 'Phase 3', title: 'Captain America: Civil War', year: 2016, order: 13 },
    { phase: 'Phase 3', title: 'Doctor Strange', year: 2016, order: 14 },
    { phase: 'Phase 3', title: 'Spider-Man: Homecoming', year: 2017, order: 15 },
    { phase: 'Phase 3', title: 'Thor: Ragnarok', year: 2017, order: 16 },
    { phase: 'Phase 3', title: 'Black Panther', year: 2018, order: 17 },
    { phase: 'Phase 3', title: 'Avengers: Infinity War', year: 2018, order: 18 },
    { phase: 'Phase 3', title: 'Ant-Man and the Wasp', year: 2018, order: 19 },
    { phase: 'Phase 3', title: 'Captain Marvel', year: 2019, order: 20 },
    { phase: 'Phase 3', title: 'Avengers: Endgame', year: 2019, order: 21 },
    { phase: 'Phase 3', title: 'Spider-Man: Far From Home', year: 2019, order: 22 },
    { phase: 'Phase 4', title: 'Black Widow', year: 2021, order: 23 },
    { phase: 'Phase 4', title: 'Shang-Chi', year: 2021, order: 24 },
    { phase: 'Phase 4', title: 'Eternals', year: 2021, order: 25 },
    { phase: 'Phase 4', title: 'Spider-Man: No Way Home', year: 2021, order: 26 },
    { phase: 'Phase 4', title: 'Doctor Strange in the Multiverse of Madness', year: 2022, order: 27 },
    { phase: 'Phase 4', title: 'Thor: Love and Thunder', year: 2022, order: 28 },
    { phase: 'Phase 4', title: 'Black Panther: Wakanda Forever', year: 2022, order: 29 },
    { phase: 'Phase 5', title: 'Ant-Man and the Wasp: Quantumania', year: 2023, order: 30 },
    { phase: 'Phase 5', title: 'Guardians of the Galaxy Vol. 3', year: 2023, order: 31 },
    { phase: 'Phase 5', title: 'The Marvels', year: 2023, order: 32 },
    { phase: 'Phase 5', title: 'Deadpool & Wolverine', year: 2024, order: 33 },
    { phase: 'Phase 5', title: 'Captain America: Brave New World', year: 2025, order: 34 },
    { phase: 'Phase 6', title: 'Avengers: Doomsday', year: 2026, order: 35 },
    { phase: 'Phase 6', title: 'Avengers: Secret Wars', year: 2027, order: 36 },
]

async function handler(m) {
    const text = (m.text || '').trim()

    if (text && !isNaN(text)) {
        const order = parseInt(text)
        const movie = MCU_TIMELINE.find(mv => mv.order === order)
        if (!movie) return m.reply('Urutan tidak ditemukan! Range 1-' + MCU_TIMELINE.length)

        const lines = [
            '╭┈❀ *MCU TIMELINE*',
            '┃',
            '┃ ◦ Urutan: ' + movie.order,
            '┃ ◦ Judul: ' + movie.title,
            '┃ ◦ Fase: ' + movie.phase,
            '┃ ◦ Tahun: ' + movie.year,
            '┃',
            '╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀'
        ]
        return m.reply(lines.join('\n'))
    }

    const lines = ['╭┈❀ *MCU TIMELINE* (' + MCU_TIMELINE.length + ' film)', '┃']

    let currentPhase = ''
    for (const movie of MCU_TIMELINE) {
        if (movie.phase !== currentPhase) {
            currentPhase = movie.phase
            lines.push('┃')
            lines.push('┃ ◦ ' + currentPhase)
        }
        lines.push('┃   ' + movie.order + '. ' + movie.title + ' (' + movie.year + ')')
    }

    lines.push('┃')
    lines.push('┃ ◦ Ketik .kalkulatormcu <nomor>')
    lines.push('┃ ◦ Contoh: .kalkulatormcu 18')
    lines.push('┃')
    lines.push('╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀')

    return m.reply(lines.join('\n'))
}

export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'timeconv',
    alias: ['konversiwaktu'],
    category: 'tools',
    description: 'Konverter Waktu (ms, s, min, h, day, week, month, year)',
    usage: '.timeconv <value> <from> <to>',
    example: '.timeconv 7200 s h',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

async function handler(m) {
    const text = (m.text || '').trim();
    const args = text.split(/\s+/).filter(Boolean);

    if (args.length < 3) {
        return m.reply(
            `╭┈❀ *TIME CONVERTER*\n` +
            `┃ ◦ Penggunaan: .timeconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: ms, s, min, h, day, week, month, year\n` +
            `┃ ◦ Contoh: .timeconv 7200 s h\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *TIME CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        ms: 0.001,
        s: 1,
        sec: 1,
        min: 60,
        h: 3600,
        hr: 3600,
        day: 86400,
        days: 86400,
        week: 604800,
        weeks: 604800,
        month: 2592000,
        year: 31536000
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *TIME CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilihan: ms, s, min, h, day, week, month, year\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const secondsVal = val * factors[fromUnit];
    const converted = secondsVal / factors[toUnit];

    const result = 
        `╭┈❀ *TIME CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

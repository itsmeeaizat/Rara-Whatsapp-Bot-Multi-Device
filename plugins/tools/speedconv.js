// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'speedconv',
    alias: ['konversikecepatan'],
    category: 'tools',
    description: 'Konverter Kecepatan (m/s, km/h, mph, knot, ft/s)',
    usage: '.speedconv <value> <from> <to>',
    example: '.speedconv 100 kmh ms',
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
            `╭┈❀ *SPEED CONVERTER*\n` +
            `┃ ◦ Penggunaan: .speedconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: ms (m/s), kmh (km/h), mph, knot, fts (ft/s)\n` +
            `┃ ◦ Contoh: .speedconv 100 kmh ms\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    let fromUnit = args[1].toLowerCase().replace('/', '');
    let toUnit = args[2].toLowerCase().replace('/', '');

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *SPEED CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        ms: 1,
        kmh: 1 / 3.6,
        mph: 0.44704,
        knot: 0.514444,
        knots: 0.514444,
        kn: 0.514444,
        fts: 0.3048
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *SPEED CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilihan: ms, kmh, mph, knot, fts\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const msVal = val * factors[fromUnit];
    const converted = msVal / factors[toUnit];

    const result = 
        `╭┈❀ *SPEED CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

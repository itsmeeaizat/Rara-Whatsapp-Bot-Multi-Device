// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'calconvert',
    alias: ['calconv', 'konversikalori'],
    category: 'tools',
    description: 'Konverter Energi/Kalori (cal, kcal, kJ, J)',
    usage: '.calconvert <value> <from> <to>',
    example: '.calconvert 500 kcal kj',
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
            `╭┈❀ *CALORIE CONVERTER*\n` +
            `┃ ◦ Penggunaan: .calconvert <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: cal, kcal, j, kj\n` +
            `┃ ◦ Contoh: .calconvert 500 kcal kj\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *CALORIE CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        j: 1,
        kj: 1000,
        cal: 4.184,
        kcal: 4184
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *CALORIE CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilih dari: cal, kcal, j, kj\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const valueInJoules = val * factors[fromUnit];
    const converted = valueInJoules / factors[toUnit];

    const result = 
        `╭┈❀ *CALORIE CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

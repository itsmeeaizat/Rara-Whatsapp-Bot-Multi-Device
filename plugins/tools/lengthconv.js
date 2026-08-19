// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'lengthconv',
    alias: ['konversipanjang'],
    category: 'tools',
    description: 'Konverter Panjang (m, km, cm, mm, mi, ft, in, yd)',
    usage: '.lengthconv <value> <from> <to>',
    example: '.lengthconv 5 mi km',
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
            `╭┈❀ *LENGTH CONVERTER*\n` +
            `┃ ◦ Penggunaan: .lengthconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: m, km, cm, mm, mi, ft, in, yd\n` +
            `┃ ◦ Contoh: .lengthconv 5 mi km\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *LENGTH CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.344,
        ft: 0.3048,
        in: 0.0254,
        yd: 0.9144
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *LENGTH CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilihan: m, km, cm, mm, mi, ft, in, yd\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const meters = val * factors[fromUnit];
    const converted = meters / factors[toUnit];

    const result = 
        `╭┈❀ *LENGTH CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

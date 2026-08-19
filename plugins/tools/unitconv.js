// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'unitconv',
    alias: ['konversisatuan'],
    category: 'tools',
    description: 'Konverter Satuan Umum (Panjang, Berat, Suhu)',
    usage: '.unitconv <value> <from> <to>',
    example: '.unitconv 10 km mi',
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
            `╭┈❀ *UNIT CONVERTER*\n` +
            `┃ ◦ Penggunaan: .unitconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Contoh: .unitconv 10 km mi\n` +
            `┃ ◦ Panjang: m, km, cm, mm, mi, ft, in\n` +
            `┃ ◦ Berat: kg, g, mg, lb, oz\n` +
            `┃ ◦ Suhu: c, f, k, r\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *UNIT CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const lengthFactors = {
        m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254
    };

    const weightFactors = {
        kg: 1, g: 0.001, mg: 0.000001, lb: 0.45359237, oz: 0.028349523125
    };

    let converted = null;
    let category = '';

    if (lengthFactors[fromUnit] && lengthFactors[toUnit]) {
        category = 'Panjang';
        converted = (val * lengthFactors[fromUnit]) / lengthFactors[toUnit];
    } else if (weightFactors[fromUnit] && weightFactors[toUnit]) {
        category = 'Berat';
        converted = (val * weightFactors[fromUnit]) / weightFactors[toUnit];
    } else if (['c', 'f', 'k', 'r'].includes(fromUnit) && ['c', 'f', 'k', 'r'].includes(toUnit)) {
        category = 'Suhu';
        let tempInC = val;
        if (fromUnit === 'f') tempInC = (val - 32) * (5 / 9);
        else if (fromUnit === 'k') tempInC = val - 273.15;
        else if (fromUnit === 'r') tempInC = val * (5 / 4);

        if (toUnit === 'c') converted = tempInC;
        else if (toUnit === 'f') converted = (tempInC * (9 / 5)) + 32;
        else if (toUnit === 'k') converted = tempInC + 273.15;
        else if (toUnit === 'r') converted = tempInC * (4 / 5);
    }

    if (converted === null) {
        return m.reply(
            `╭┈❀ *UNIT CONVERTER*\n` +
            `┃ ◦ Error: Kombinasi satuan tidak valid atau berbeda kategori!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const result = 
        `╭┈❀ *UNIT CONVERTER*\n` +
        `┃ ◦ Kategori: ${category}\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

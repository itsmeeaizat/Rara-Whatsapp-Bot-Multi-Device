// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'weightconv',
    alias: ['konversiberat'],
    category: 'tools',
    description: 'Konverter Berat (kg, g, mg, lb, oz, ton)',
    usage: '.weightconv <value> <from> <to>',
    example: '.weightconv 100 lb kg',
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
            `╭┈❀ *WEIGHT CONVERTER*\n` +
            `┃ ◦ Penggunaan: .weightconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: kg, g, mg, lb, oz, ton\n` +
            `┃ ◦ Contoh: .weightconv 100 lb kg\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *WEIGHT CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.45359237,
        oz: 0.028349523125,
        ton: 1000
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *WEIGHT CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilihan: kg, g, mg, lb, oz, ton\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const kgVal = val * factors[fromUnit];
    const converted = kgVal / factors[toUnit];

    const result = 
        `╭┈❀ *WEIGHT CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

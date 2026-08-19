// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'tempconv',
    alias: ['konversisuhu'],
    category: 'tools',
    description: 'Konverter Suhu (C, F, K, R)',
    usage: '.tempconv <value> <from> <to>',
    example: '.tempconv 100 c f',
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
            `╭┈❀ *TEMPERATURE CONVERTER*\n` +
            `┃ ◦ Penggunaan: .tempconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: c (Celsius), f (Fahrenheit), k (Kelvin), r (Reaumur)\n` +
            `┃ ◦ Contoh: .tempconv 100 c f\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    const validUnits = ['c', 'f', 'k', 'r'];

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *TEMPERATURE CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
        return m.reply(
            `╭┈❀ *TEMPERATURE CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak valid! Gunakan C, F, K, atau R.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let cel = val;
    if (fromUnit === 'f') cel = (val - 32) * (5 / 9);
    else if (fromUnit === 'k') cel = val - 273.15;
    else if (fromUnit === 'r') cel = val * (5 / 4);

    let res = cel;
    if (toUnit === 'f') res = (cel * 9 / 5) + 32;
    else if (toUnit === 'k') res = cel + 273.15;
    else if (toUnit === 'r') res = cel * 4 / 5;

    const result = 
        `╭┈❀ *TEMPERATURE CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} °${fromUnit.toUpperCase()}\n` +
        `┃ ◦ Hasil Konversi: ${res.toFixed(2)} °${toUnit.toUpperCase()}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'dataconv',
    alias: ['konversidata'],
    category: 'tools',
    description: 'Konverter Ukuran Data (B, KB, MB, GB, TB, PB)',
    usage: '.dataconv <value> <from> <to>',
    example: '.dataconv 1024 mb gb',
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
            `╭┈❀ *DATA SIZE CONVERTER*\n` +
            `┃ ◦ Penggunaan: .dataconv <nilai> <dari> <ke>\n` +
            `┃ ◦ Satuan: b, kb, mb, gb, tb, pb\n` +
            `┃ ◦ Contoh: .dataconv 1024 mb gb\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const val = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[2].toLowerCase();

    if (isNaN(val)) {
        return m.reply(
            `╭┈❀ *DATA SIZE CONVERTER*\n` +
            `┃ ◦ Error: Nilai harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const factors = {
        b: 1,
        kb: 1024,
        mb: Math.pow(1024, 2),
        gb: Math.pow(1024, 3),
        tb: Math.pow(1024, 4),
        pb: Math.pow(1024, 5)
    };

    if (!factors[fromUnit] || !factors[toUnit]) {
        return m.reply(
            `╭┈❀ *DATA SIZE CONVERTER*\n` +
            `┃ ◦ Error: Satuan tidak dikenal!\n` +
            `┃ ◦ Pilihan: b, kb, mb, gb, tb, pb\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const bytesVal = val * factors[fromUnit];
    const converted = bytesVal / factors[toUnit];

    const result = 
        `╭┈❀ *DATA SIZE CONVERTER*\n` +
        `┃ ◦ Nilai Awal: ${val} ${fromUnit.toUpperCase()}\n` +
        `┃ ◦ Hasil Konversi: ${converted.toFixed(4)} ${toUnit.toUpperCase()}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

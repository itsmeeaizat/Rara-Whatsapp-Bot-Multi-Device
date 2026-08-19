// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'bodyfat',
    alias: ['bfcalc', 'persenlemak'],
    category: 'tools',
    description: 'Kalkulator Persentase Lemak Tubuh',
    usage: '.bodyfat <gender> <waist_cm> <hip_cm> <neck_cm> <height_cm>',
    example: '.bodyfat pria 80 0 38 175',
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

    if (args.length < 4) {
        return m.reply(
            `╭┈❀ *BODY FAT CALCULATOR*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Pria: .bodyfat pria <pinggang> <leher> <tinggi>\n` +
            `┃ ◦ Wanita: .bodyfat wanita <pinggang> <pinggul> <leher> <tinggi>\n` +
            `┃ ◦ Contoh: .bodyfat pria 80 38 175\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const genderInput = args[0].toLowerCase();
    const isMale = ['pria', 'p', 'male', 'm'].includes(genderInput);
    const isFemale = ['wanita', 'w', 'female', 'f'].includes(genderInput);

    if (!isMale && !isFemale) {
        return m.reply(
            `╭┈❀ *BODY FAT CALCULATOR*\n` +
            `┃ ◦ Error: Gender harus 'pria' atau 'wanita'!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let waist = 0, hip = 0, neck = 0, height = 0;

    if (isMale) {
        if (args.length >= 4 && isNaN(parseFloat(args[3]))) {
            waist = parseFloat(args[1]);
            neck = parseFloat(args[2]);
            height = parseFloat(args[3]);
        } else if (args.length >= 5) {
            waist = parseFloat(args[1]);
            hip = parseFloat(args[2]);
            neck = parseFloat(args[3]);
            height = parseFloat(args[4]);
        } else {
            waist = parseFloat(args[1]);
            neck = parseFloat(args[2]);
            height = parseFloat(args[3]);
        }
    } else {
        if (args.length < 5) {
            return m.reply(
                `╭┈❀ *BODY FAT CALCULATOR*\n` +
                `┃ ◦ Untuk wanita sertakan pinggul:\n` +
                `┃ ◦ .bodyfat wanita <pinggang> <pinggul> <leher> <tinggi>\n` +
                `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
            );
        }
        waist = parseFloat(args[1]);
        hip = parseFloat(args[2]);
        neck = parseFloat(args[3]);
        height = parseFloat(args[4]);
    }

    if (isNaN(waist) || isNaN(neck) || isNaN(height) || waist <= 0 || neck <= 0 || height <= 0) {
        return m.reply(
            `╭┈❀ *BODY FAT CALCULATOR*\n` +
            `┃ ◦ Error: Semua ukuran harus berupa angka positif!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let bodyFat = 0;
    if (isMale) {
        if (waist - neck <= 0) {
            return m.reply(
                `╭┈❀ *BODY FAT CALCULATOR*\n` +
                `┃ ◦ Error: Ukuran pinggang harus lebih besar dari leher!\n` +
                `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
            );
        }
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        if (waist + hip - neck <= 0) {
            return m.reply(
                `╭┈❀ *BODY FAT CALCULATOR*\n` +
                `┃ ◦ Error: Ukuran tidak valid untuk perhitungan!\n` +
                `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
            );
        }
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    let category = '';
    if (isMale) {
        if (bodyFat < 6) category = 'Essential fat';
        else if (bodyFat < 14) category = 'Athletes';
        else if (bodyFat < 18) category = 'Fitness';
        else if (bodyFat < 25) category = 'Average';
        else category = 'Obese';
    } else {
        if (bodyFat < 14) category = 'Essential fat';
        else if (bodyFat < 21) category = 'Athletes';
        else if (bodyFat < 25) category = 'Fitness';
        else if (bodyFat < 32) category = 'Average';
        else category = 'Obese';
    }

    const result = 
        `╭┈❀ *BODY FAT CALCULATOR*\n` +
        `┃ ◦ Gender: ${isMale ? 'Pria' : 'Wanita'}\n` +
        `┃ ◦ Lingkar Pinggang: ${waist} cm\n` +
        (isFemale ? `┃ ◦ Lingkar Pinggul: ${hip} cm\n` : '') +
        `┃ ◦ Lingkar Leher: ${neck} cm\n` +
        `┃ ◦ Tinggi Badan: ${height} cm\n` +
        `┃ ◦ Persentase Lemak Tubuh: ${bodyFat.toFixed(1)}%\n` +
        `┃ ◦ Kategori: ${category}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

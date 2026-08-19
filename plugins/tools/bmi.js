// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'bmi',
    alias: ['bmicalc', 'bodymassindex'],
    category: 'tools',
    description: 'Kalkulator Body Mass Index (BMI)',
    usage: '.bmi <weight_kg> <height_cm>',
    example: '.bmi 70 175',
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

    if (args.length < 2) {
        return m.reply(
            `╭┈❀ *BMI CALCULATOR*\n` +
            `┃ ◦ Penggunaan: .bmi <berat_kg> <tinggi_cm>\n` +
            `┃ ◦ Contoh: .bmi 70 175\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const weight = parseFloat(args[0]);
    const height = parseFloat(args[1]);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return m.reply(
            `╭┈❀ *BMI CALCULATOR*\n` +
            `┃ ◦ Error: Berat dan tinggi harus berupa angka positif!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) {
        category = 'Kekurangan berat badan (Underweight)';
    } else if (bmi < 25.0) {
        category = 'Normal (Healthy weight)';
    } else if (bmi < 30.0) {
        category = 'Kelebihan berat badan (Overweight)';
    } else {
        category = 'Obesitas (Obesity)';
    }

    const result = 
        `╭┈❀ *BMI CALCULATOR*\n` +
        `┃ ◦ Berat Badan: ${weight} kg\n` +
        `┃ ◦ Tinggi Badan: ${height} cm\n` +
        `┃ ◦ Nilai BMI: ${bmi.toFixed(2)}\n` +
        `┃ ◦ Kategori: ${category}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

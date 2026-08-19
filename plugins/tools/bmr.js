// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'bmr',
    alias: ['bmrcalc'],
    category: 'tools',
    description: 'Kalkulator Basal Metabolic Rate (BMR)',
    usage: '.bmr <weight> <height> <age> <gender>',
    example: '.bmr 70 170 25 pria',
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
            `╭┈❀ *BMR CALCULATOR*\n` +
            `┃ ◦ Penggunaan: .bmr <berat_kg> <tinggi_cm> <umur> <gender>\n` +
            `┃ ◦ Gender: pria/male atau wanita/female\n` +
            `┃ ◦ Contoh: .bmr 70 170 25 pria\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const weight = parseFloat(args[0]);
    const height = parseFloat(args[1]);
    const age = parseInt(args[2], 10);
    const genderInput = args[3].toLowerCase();

    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        return m.reply(
            `╭┈❀ *BMR CALCULATOR*\n` +
            `┃ ◦ Error: Berat, tinggi, dan umur harus angka positif!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const isMale = ['pria', 'p', 'male', 'm', 'laki'].includes(genderInput);
    const isFemale = ['wanita', 'w', 'female', 'f', 'perempuan'].includes(genderInput);

    if (!isMale && !isFemale) {
        return m.reply(
            `╭┈❀ *BMR CALCULATOR*\n` +
            `┃ ◦ Error: Gender harus 'pria' atau 'wanita'!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += isMale ? 5 : -161;

    const sedentary = bmr * 1.2;
    const moderate = bmr * 1.55;
    const active = bmr * 1.725;

    const result = 
        `╭┈❀ *BMR CALCULATOR*\n` +
        `┃ ◦ Berat Badan: ${weight} kg\n` +
        `┃ ◦ Tinggi Badan: ${height} cm\n` +
        `┃ ◦ Umur: ${age} tahun\n` +
        `┃ ◦ Gender: ${isMale ? 'Pria' : 'Wanita'}\n` +
        `┃ ◦ BMR: ${bmr.toFixed(2)} kcal/hari\n` +
        `┃ ◦ Sedentary: ${sedentary.toFixed(2)} kcal/hari\n` +
        `┃ ◦ Moderat: ${moderate.toFixed(2)} kcal/hari\n` +
        `┃ ◦ Aktif: ${active.toFixed(2)} kcal/hari\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

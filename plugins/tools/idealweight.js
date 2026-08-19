// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'idealweight',
    alias: ['beratideal', 'bbideal'],
    category: 'tools',
    description: 'Kalkulator Berat Badan Ideal',
    usage: '.idealweight <height_cm>',
    example: '.idealweight 170',
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
    const height = parseFloat(text);

    if (isNaN(height) || height <= 0) {
        return m.reply(
            `╭┈❀ *IDEAL WEIGHT CALCULATOR*\n` +
            `┃ ◦ Penggunaan: .idealweight <tinggi_cm>\n` +
            `┃ ◦ Contoh: .idealweight 170\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const brocaMale = (height - 100) - ((height - 100) * 0.10);
    const brocaFemale = (height - 100) - ((height - 100) * 0.15);

    const heightInInches = height / 2.54;
    const devineMale = 50 + 2.3 * (heightInInches - 60);
    const devineFemale = 45.5 + 2.3 * (heightInInches - 60);

    const result = 
        `╭┈❀ *IDEAL WEIGHT CALCULATOR*\n` +
        `┃ ◦ Tinggi Badan: ${height} cm\n` +
        `┃ ◦ Broca Pria: ${Math.max(0, brocaMale).toFixed(2)} kg\n` +
        `┃ ◦ Broca Wanita: ${Math.max(0, brocaFemale).toFixed(2)} kg\n` +
        `┃ ◦ Devine Pria: ${Math.max(0, devineMale).toFixed(2)} kg\n` +
        `┃ ◦ Devine Wanita: ${Math.max(0, devineFemale).toFixed(2)} kg\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

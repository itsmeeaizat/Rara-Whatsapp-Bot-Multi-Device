// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'koin',
    alias: ['flipcoin', 'coin', 'lempar-koin'],
    category: 'fun',
    description: 'Lempar koin untuk menentukan Gambar atau Angka',
    usage: '.koin',
    example: '.koin',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const sides = [
    '🪙 Gambar (Garuda)',
    '🪙 Angka (1000)'
];

async function handler(m) {
    const result = sides[Math.floor(Math.random() * sides.length)];
    const response = `╭┈❀ *LEMPAR KOIN*\n┃ ◦ Hasil Lemparan: ${result}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

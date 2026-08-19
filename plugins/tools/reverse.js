// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'reverse',
    alias: ['baliktext', 'reversetext'],
    category: 'tools',
    description: 'Pembalik Teks (Karakter dan Kata)',
    usage: '.reverse <text>',
    example: '.reverse Halo Dunia',
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

    if (!text) {
        return m.reply(
            `╭┈❀ *TEXT REVERSER*\n` +
            `┃ ◦ Penggunaan: .reverse <teks>\n` +
            `┃ ◦ Contoh: .reverse Halo Dunia\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const reverseChars = text.split('').reverse().join('');
    const reverseWords = text.split(/\s+/).reverse().join(' ');

    const result = 
        `╭┈❀ *TEXT REVERSER*\n` +
        `┃ ◦ Input: ${text}\n` +
        `┃ ◦ Balik Karakter: ${reverseChars}\n` +
        `┃ ◦ Balik Kata: ${reverseWords}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

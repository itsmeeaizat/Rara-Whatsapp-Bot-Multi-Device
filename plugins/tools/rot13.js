// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'rot13',
    alias: ['rot13cipher'],
    category: 'tools',
    description: 'ROT13 Cipher Encrypt & Decrypt',
    usage: '.rot13 <text>',
    example: '.rot13 Hello World',
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
            `╭┈❀ *ROT13 CIPHER*\n` +
            `┃ ◦ Penggunaan: .rot13 <teks>\n` +
            `┃ ◦ Contoh: .rot13 Hello World\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const converted = text.replace(/[a-zA-Z]/g, (char) => {
        const input = char.charCodeAt(0);
        const base = input <= 90 ? 65 : 97;
        return String.fromCharCode(((input - base + 13) % 26) + base);
    });

    const result = 
        `╭┈❀ *ROT13 CIPHER*\n` +
        `┃ ◦ Input: ${text}\n` +
        `┃ ◦ Hasil: ${converted}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

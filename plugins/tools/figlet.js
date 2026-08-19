// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import figlet from 'figlet';

const pluginConfig = {
    name: 'figlet',
    alias: ['asciiart', 'figlettext'],
    category: 'tools',
    description: 'Generator ASCII Art Text menggunakan Figlet',
    usage: '.figlet <text>',
    example: '.figlet Rara',
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
            `╭┈❀ *FIGLET ASCII ART*\n` +
            `┃ ◦ Penggunaan: .figlet <teks>\n` +
            `┃ ◦ Contoh: .figlet Rara\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    if (text.length > 20) {
        return m.reply(
            `╭┈❀ *FIGLET ASCII ART*\n` +
            `┃ ◦ Error: Teks terlalu panjang! Maksimal 20 karakter.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const asciiArt = figlet.textSync(text);
        const result = 
            `╭┈❀ *FIGLET ASCII ART*\n` +
            `┃ ◦ Teks: ${text}\n` +
            `\`\`\`\n` + asciiArt + `\n\`\`\`\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        await m.reply(result);
    } catch (e) {
        return m.reply(
            `╭┈❀ *FIGLET ASCII ART*\n` +
            `┃ ◦ Error: Gagal membuat ASCII art (${e.message})\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'charcount',
    alias: ['hitungkarakter', 'wordcount', 'tekscount'],
    category: 'tools',
    description: 'Hitung Karakter, Kata, Kalimat, dan Paragraf',
    usage: '.charcount <text>',
    example: '.charcount Hello world! Ini adalah contoh.',
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
            `╭┈❀ *CHARACTER & WORD COUNTER*\n` +
            `┃ ◦ Penggunaan: .charcount <teks>\n` +
            `┃ ◦ Contoh: .charcount Hello world!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const totalChars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    const result = 
        `╭┈❀ *CHARACTER & WORD COUNTER*\n` +
        `┃ ◦ Total Karakter: ${totalChars}\n` +
        `┃ ◦ Tanpa Spasi: ${charsNoSpaces}\n` +
        `┃ ◦ Total Kata: ${words}\n` +
        `┃ ◦ Total Kalimat: ${sentences}\n` +
        `┃ ◦ Total Paragraf: ${paragraphs}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

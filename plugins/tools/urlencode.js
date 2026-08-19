// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'urlencode',
    alias: ['urldecode', 'urlcomponent'],
    category: 'tools',
    description: 'URL Encode dan Decode',
    usage: '.urlencode <text> atau .urlencode decode <text>',
    example: '.urlencode Hello World!',
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
            `╭┈❀ *URL ENCODER DECODER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Encode: .urlencode <teks>\n` +
            `┃ ◦ Decode: .urlencode decode <teks_encoded>\n` +
            `┃ ◦ Contoh: .urlencode Hello World!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const isDecode = text.toLowerCase().startsWith('decode ');
    const inputStr = isDecode ? text.substring(7).trim() : (text.toLowerCase().startsWith('encode ') ? text.substring(7).trim() : text);

    if (!inputStr) {
        return m.reply(
            `╭┈❀ *URL ENCODER DECODER*\n` +
            `┃ ◦ Error: Masukkan teks yang ingin diproses!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let outputStr = '';
    let modeLabel = isDecode ? 'Decode' : 'Encode';

    try {
        if (isDecode) {
            outputStr = decodeURIComponent(inputStr);
        } else {
            outputStr = encodeURIComponent(inputStr);
        }
    } catch (e) {
        return m.reply(
            `╭┈❀ *URL ENCODER DECODER*\n` +
            `┃ ◦ Error: Gagal memproses teks URL (${e.message})!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const result = 
        `╭┈❀ *URL ENCODER DECODER*\n` +
        `┃ ◦ Mode: ${modeLabel}\n` +
        `┃ ◦ Input: ${inputStr}\n` +
        `┃ ◦ Hasil: ${outputStr}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

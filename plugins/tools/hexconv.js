// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'hexconv',
    alias: ['hex', 'text2hex', 'hex2text'],
    category: 'tools',
    description: 'Konverter Teks ke Hex dan Sebaliknya',
    usage: '.hexconv <text> atau .hexconv decode <hex>',
    example: '.hexconv Hello',
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
            `╭┈❀ *HEX CONVERTER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Encode: .hexconv <teks>\n` +
            `┃ ◦ Decode: .hexconv decode <kode_hex>\n` +
            `┃ ◦ Contoh: .hexconv Hello\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const isDecode = text.toLowerCase().startsWith('decode ');
    const inputStr = isDecode ? text.substring(7).trim() : (text.toLowerCase().startsWith('encode ') ? text.substring(7).trim() : text);

    if (!inputStr) {
        return m.reply(
            `╭┈❀ *HEX CONVERTER*\n` +
            `┃ ◦ Error: Masukkan input yang valid!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let outputStr = '';
    let modeLabel = isDecode ? 'Decode' : 'Encode';

    if (isDecode) {
        const cleanHex = inputStr.replace(/[^0-9a-fA-F]/g, '');
        try {
            outputStr = Buffer.from(cleanHex, 'hex').toString('utf8');
        } catch (e) {
            outputStr = 'Error saat decoding hex.';
        }
    } else {
        outputStr = Buffer.from(inputStr, 'utf8').toString('hex');
    }

    const result = 
        `╭┈❀ *HEX CONVERTER*\n` +
        `┃ ◦ Mode: ${modeLabel}\n` +
        `┃ ◦ Input: ${inputStr}\n` +
        `┃ ◦ Hasil: ${outputStr}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

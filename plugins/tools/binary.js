// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'binary',
    alias: ['binaconv', 'text2binary', 'binary2text'],
    category: 'tools',
    description: 'Konverter Teks ke Biner dan Sebaliknya',
    usage: '.binary <text> atau .binary decode <binary>',
    example: '.binary Hello',
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
            `╭┈❀ *BINARY CONVERTER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Encode: .binary <teks>\n` +
            `┃ ◦ Decode: .binary decode <kode_biner>\n` +
            `┃ ◦ Contoh: .binary Hello\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const isDecode = text.toLowerCase().startsWith('decode ');
    const inputStr = isDecode ? text.substring(7).trim() : (text.toLowerCase().startsWith('encode ') ? text.substring(7).trim() : text);

    if (!inputStr) {
        return m.reply(
            `╭┈❀ *BINARY CONVERTER*\n` +
            `┃ ◦ Error: Masukkan input yang valid!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let outputStr = '';
    let modeLabel = isDecode ? 'Decode' : 'Encode';

    if (isDecode) {
        const cleanBinary = inputStr.replace(/[^01\s]/g, '');
        const tokens = cleanBinary.includes(' ') ? cleanBinary.split(/\s+/) : cleanBinary.match(/.{1,8}/g) || [];
        try {
            outputStr = tokens.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        } catch (e) {
            outputStr = 'Error saat decoding biner.';
        }
    } else {
        outputStr = inputStr.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    }

    const result = 
        `╭┈❀ *BINARY CONVERTER*\n` +
        `┃ ◦ Mode: ${modeLabel}\n` +
        `┃ ◦ Input: ${inputStr}\n` +
        `┃ ◦ Hasil: ${outputStr}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

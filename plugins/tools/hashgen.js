// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import CryptoJS from 'crypto-js';

const pluginConfig = {
    name: 'hashgen',
    alias: ['hash', 'makehash'],
    category: 'tools',
    description: 'Generator Hash (MD5, SHA1, SHA256, SHA512, RIPEMD160)',
    usage: '.hashgen <algorithm> <text> atau .hashgen <text>',
    example: '.hashgen sha256 hello world',
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
            `╭┈❀ *HASH GENERATOR*\n` +
            `┃ ◦ Penggunaan: .hashgen <algoritma> <teks> atau .hashgen <teks>\n` +
            `┃ ◦ Algoritma: md5, sha1, sha256, sha512, ripemd160\n` +
            `┃ ◦ Contoh: .hashgen sha256 hello world\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const firstWord = text.split(/\s+/)[0].toLowerCase();
    const algos = ['md5', 'sha1', 'sha256', 'sha512', 'ripemd160'];

    let algo = '';
    let inputStr = text;

    if (algos.includes(firstWord)) {
        algo = firstWord;
        inputStr = text.substring(firstWord.length).trim();
    }

    if (!inputStr) {
        return m.reply(
            `╭┈❀ *HASH GENERATOR*\n` +
            `┃ ◦ Error: Masukkan teks yang ingin dihash!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let result = '';

    if (algo === 'md5') {
        result = `┃ ◦ MD5: ${CryptoJS.MD5(inputStr).toString()}`;
    } else if (algo === 'sha1') {
        result = `┃ ◦ SHA1: ${CryptoJS.SHA1(inputStr).toString()}`;
    } else if (algo === 'sha256') {
        result = `┃ ◦ SHA256: ${CryptoJS.SHA256(inputStr).toString()}`;
    } else if (algo === 'sha512') {
        result = `┃ ◦ SHA512: ${CryptoJS.SHA512(inputStr).toString()}`;
    } else if (algo === 'ripemd160') {
        result = `┃ ◦ RIPEMD160: ${CryptoJS.RIPEMD160(inputStr).toString()}`;
    } else {
        result = 
            `┃ ◦ MD5: ${CryptoJS.MD5(inputStr).toString()}\n` +
            `┃ ◦ SHA1: ${CryptoJS.SHA1(inputStr).toString()}\n` +
            `┃ ◦ SHA256: ${CryptoJS.SHA256(inputStr).toString()}\n` +
            `┃ ◦ SHA512: ${CryptoJS.SHA512(inputStr).toString()}`;
    }

    const output = 
        `╭┈❀ *HASH GENERATOR*\n` +
        `┃ ◦ Teks Input: ${inputStr}\n` +
        result + '\n' +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(output);
}

export { pluginConfig as config, handler };

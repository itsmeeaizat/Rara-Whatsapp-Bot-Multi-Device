// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'morse',
    alias: ['morsecode', 'text2morse', 'morse2text'],
    category: 'tools',
    description: 'Konverter Kode Morse dan Sebaliknya',
    usage: '.morse <text> atau .morse decode <morse>',
    example: '.morse SOS',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

async function handler(m) {
    const text = (m.text || '').trim();

    if (!text) {
        return m.reply(
            `╭┈❀ *MORSE CODE CONVERTER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Encode: .morse <teks>\n` +
            `┃ ◦ Decode: .morse decode <kode_morse>\n` +
            `┃ ◦ Contoh: .morse SOS\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const isDecode = text.toLowerCase().startsWith('decode ');
    const inputStr = isDecode ? text.substring(7).trim() : (text.toLowerCase().startsWith('encode ') ? text.substring(7).trim() : text);

    if (!inputStr) {
        return m.reply(
            `╭┈❀ *MORSE CODE CONVERTER*\n` +
            `┃ ◦ Error: Masukkan input yang valid!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let outputStr = '';
    let modeLabel = isDecode ? 'Decode' : 'Encode';

    if (isDecode) {
        const words = inputStr.split(/\s+\/\s+|\s{3,}/);
        outputStr = words.map(word => {
            return word.split(/\s+/).map(code => REVERSE_MORSE[code] || '?').join('');
        }).join(' ');
    } else {
        const words = inputStr.toUpperCase().split(/\s+/);
        outputStr = words.map(word => {
            return word.split('').map(char => MORSE_MAP[char] || '').filter(Boolean).join(' ');
        }).join(' / ');
    }

    const result = 
        `╭┈❀ *MORSE CODE CONVERTER*\n` +
        `┃ ◦ Mode: ${modeLabel}\n` +
        `┃ ◦ Input: ${inputStr}\n` +
        `┃ ◦ Hasil: ${outputStr}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

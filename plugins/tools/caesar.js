// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'caesar',
    alias: ['caesarcipher'],
    category: 'tools',
    description: 'Caesar Cipher Encrypt & Decrypt',
    usage: '.caesar <shift> <text> atau .caesar decode <shift> <text>',
    example: '.caesar 3 Hello World',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

function caesarCipher(str, shift) {
    const s = ((shift % 26) + 26) % 26;
    return str.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26) + base);
    });
}

async function handler(m) {
    const text = (m.text || '').trim();
    const args = text.split(/\s+/).filter(Boolean);

    if (args.length < 2) {
        return m.reply(
            `╭┈❀ *CAESAR CIPHER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Encrypt: .caesar <shift> <teks>\n` +
            `┃ ◦ Decrypt: .caesar decode <shift> <teks>\n` +
            `┃ ◦ Contoh: .caesar 3 Hello World\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let isDecode = false;
    let shiftIndex = 0;

    if (args[0].toLowerCase() === 'decode' || args[0].toLowerCase() === 'decrypt') {
        isDecode = true;
        shiftIndex = 1;
    }

    if (args.length <= shiftIndex + 1) {
        return m.reply(
            `╭┈❀ *CAESAR CIPHER*\n` +
            `┃ ◦ Error: Sertakan nilai shift dan teks!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const shiftVal = parseInt(args[shiftIndex], 10);
    if (isNaN(shiftVal)) {
        return m.reply(
            `╭┈❀ *CAESAR CIPHER*\n` +
            `┃ ◦ Error: Nilai shift harus berupa angka!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const inputStr = args.slice(shiftIndex + 1).join(' ');
    const effectiveShift = isDecode ? -shiftVal : shiftVal;
    const outputStr = caesarCipher(inputStr, effectiveShift);

    const result = 
        `╭┈❀ *CAESAR CIPHER*\n` +
        `┃ ◦ Mode: ${isDecode ? 'Decrypt' : 'Encrypt'}\n` +
        `┃ ◦ Shift: ${shiftVal}\n` +
        `┃ ◦ Input: ${inputStr}\n` +
        `┃ ◦ Hasil: ${outputStr}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

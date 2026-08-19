// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import crypto from 'crypto';

const pluginConfig = {
    name: 'randompass',
    alias: ['passgen', 'genpass'],
    category: 'tools',
    description: 'Random password generator dengan panjang kustom',
    usage: '.randompass <length>',
    example: '.randompass 16',
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
    let length = parseInt(text, 10);

    if (isNaN(length) || length < 4) {
        length = 12;
    } else if (length > 64) {
        length = 64;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|-={}[];:,.<>?';
    let password = '';
    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        password += chars[bytes[i] % chars.length];
    }

    const result = 
        `╭┈❀ *RANDOM PASSWORD GENERATOR*\n` +
        `┃ ◦ Panjang: ${length} karakter\n` +
        `┃ ◦ Password: ${password}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

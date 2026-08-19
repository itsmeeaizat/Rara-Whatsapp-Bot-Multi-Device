// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import crypto from 'crypto';

const pluginConfig = {
    name: 'uuidgen',
    alias: ['uuid', 'generateuuid'],
    category: 'tools',
    description: 'Generator UUID v4',
    usage: '.uuidgen [count]',
    example: '.uuidgen 3',
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
    let count = parseInt(text, 10);

    if (isNaN(count) || count < 1) {
        count = 1;
    } else if (count > 10) {
        count = 10;
    }

    const uuids = [];
    for (let i = 0; i < count; i++) {
        if (typeof crypto.randomUUID === 'function') {
            uuids.push(crypto.randomUUID());
        } else {
            uuids.push('10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
                (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16)
            ));
        }
    }

    const uuidLines = uuids.map((id, index) => `┃ ◦ UUID ${index + 1}: ${id}`).join('\n');

    const result = 
        `╭┈❀ *UUID V4 GENERATOR*\n` +
        `┃ ◦ Jumlah: ${count}\n` +
        uuidLines + '\n' +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

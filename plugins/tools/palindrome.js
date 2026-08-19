// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'palindrome',
    alias: ['cekpalindrome'],
    category: 'tools',
    description: 'Pemeriksa Teks Palindrome',
    usage: '.palindrome <text>',
    example: '.palindrome Kasur ini rusak',
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
            `╭┈❀ *PALINDROME CHECKER*\n` +
            `┃ ◦ Penggunaan: .palindrome <teks>\n` +
            `┃ ◦ Contoh: .palindrome Kasur ini rusak\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const cleanStr = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    const isPalindrome = cleanStr.length > 0 && cleanStr === reversedStr;

    const result = 
        `╭┈❀ *PALINDROME CHECKER*\n` +
        `┃ ◦ Input: ${text}\n` +
        `┃ ◦ Teks Bersih: ${cleanStr}\n` +
        `┃ ◦ Status: ${isPalindrome ? 'Palindrome (Ya)' : 'Bukan Palindrome (Tidak)'}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

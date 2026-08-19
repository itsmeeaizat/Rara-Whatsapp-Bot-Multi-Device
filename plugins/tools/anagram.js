// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'anagram',
    alias: ['cekanagram'],
    category: 'tools',
    description: 'Pemeriksa dan Generator Anagram',
    usage: '.anagram <word1> | <word2> atau .anagram <word>',
    example: '.anagram listen | silent',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

function getPermutations(str) {
    if (str.length <= 1) return [str];
    const permutations = new Set();
    const smallerPerms = getPermutations(str.slice(1));
    const firstChar = str[0];

    for (const perm of smallerPerms) {
        for (let i = 0; i <= perm.length; i++) {
            permutations.add(perm.slice(0, i) + firstChar + perm.slice(i));
        }
    }
    return Array.from(permutations);
}

async function handler(m) {
    const text = (m.text || '').trim();

    if (!text) {
        return m.reply(
            `╭┈❀ *ANAGRAM CHECKER*\n` +
            `┃ ◦ Penggunaan:\n` +
            `┃ ◦ Cek 2 kata: .anagram <kata1> | <kata2>\n` +
            `┃ ◦ Acak kata: .anagram <kata>\n` +
            `┃ ◦ Contoh: .anagram listen | silent\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    if (text.includes('|')) {
        const parts = text.split('|').map(p => p.trim());
        const word1 = parts[0];
        const word2 = parts[1] || '';

        const clean1 = word1.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
        const clean2 = word2.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');

        const isAnagram = clean1.length > 0 && clean1 === clean2;

        const result = 
            `╭┈❀ *ANAGRAM CHECKER*\n` +
            `┃ ◦ Kata 1: ${word1}\n` +
            `┃ ◦ Kata 2: ${word2}\n` +
            `┃ ◦ Status: ${isAnagram ? 'Anagram (Ya)' : 'Bukan Anagram (Tidak)'}\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        return m.reply(result);
    } else {
        const word = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (word.length > 6) {
            return m.reply(
                `╭┈❀ *ANAGRAM GENERATOR*\n` +
                `┃ ◦ Error: Kata terlalu panjang untuk variasi (maks 6 huruf)!\n` +
                `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
            );
        }

        const perms = getPermutations(word).filter(p => p !== word).slice(0, 10);

        const result = 
            `╭┈❀ *ANAGRAM GENERATOR*\n` +
            `┃ ◦ Kata Awal: ${text}\n` +
            `┃ ◦ Variasi Anagram (${perms.length}):\n` +
            perms.map(p => `┃ ◦ - ${p}`).join('\n') + '\n' +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        return m.reply(result);
    }
}

export { pluginConfig as config, handler };

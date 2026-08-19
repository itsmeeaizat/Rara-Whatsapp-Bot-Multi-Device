// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'lorem',
    alias: ['loremipsum'],
    category: 'tools',
    description: 'Generator Teks Lorem Ipsum',
    usage: '.lorem <count>',
    example: '.lorem 30',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

async function handler(m) {
    const text = (m.text || '').trim();
    let wordCount = parseInt(text, 10);

    if (isNaN(wordCount) || wordCount < 1) {
        wordCount = 30;
    } else if (wordCount > 300) {
        wordCount = 300;
    }

    const resultWords = [];
    for (let i = 0; i < wordCount; i++) {
        const word = LOREM_WORDS[i % LOREM_WORDS.length];
        resultWords.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }

    const loremText = resultWords.join(' ') + '.';

    const result = 
        `╭┈❀ *LOREM IPSUM GENERATOR*\n` +
        `┃ ◦ Jumlah Kata: ${wordCount}\n` +
        `┃ ◦ Teks: ${loremText}\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

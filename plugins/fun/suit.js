// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'suit',
    alias: ['rps', 'gajahsemut', 'pkn'],
    category: 'fun',
    description: 'Bermain suit batu kertas gunting melawan bot',
    usage: '.suit <batu/kertas/gunting>',
    example: '.suit batu',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const choices = ['batu', 'kertas', 'gunting'];
const emojis = {
    batu: '🪨 Batu',
    kertas: '📄 Kertas',
    gunting: '✂️ Gunting'
};

async function handler(m) {
    const text = m.text?.trim().toLowerCase();
    
    if (!text || !choices.includes(text)) {
        const response = `╭┈❀ *SUIT GAME*\n┃ ◦ Pilih salah satu: batu, kertas, atau gunting\n┃ ◦ Contoh: .suit batu\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    
    if (text === botChoice) {
        result = 'Hasil Seri! 🤝';
    } else if (
        (text === 'batu' && botChoice === 'gunting') ||
        (text === 'gunting' && botChoice === 'kertas') ||
        (text === 'kertas' && botChoice === 'batu')
    ) {
        result = 'Kamu Menang! 🎉';
    } else {
        result = 'Kamu Kalah! 😢';
    }
    
    const response = `╭┈❀ *SUIT GAME*\n┃ ◦ Kamu: ${emojis[text]}\n┃ ◦ Bot: ${emojis[botChoice]}\n┃ ◦ Hasil: ${result}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

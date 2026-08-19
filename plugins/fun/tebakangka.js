// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'tebakangka',
    alias: ['guessnumber', 'tebakno'],
    category: 'fun',
    description: 'Game tebak angka acak 1-100',
    usage: '.tebakangka <angka>',
    example: '.tebakangka 50',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const sessions = new Map();

async function handler(m) {
    const userId = m.sender;
    const text = m.text?.trim() || '';
    
    if (!sessions.has(userId)) {
        const target = Math.floor(Math.random() * 100) + 1;
        sessions.set(userId, { target, attempts: 0 });
        
        if (!text) {
            const response = `╭┈❀ *TEBAK ANGKA*\n┃ ◦ Game Tebak Angka (1 - 100) Dimulai!\n┃ ◦ Jawab dengan: .tebakangka <angka>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return m.reply(response);
        }
    }
    
    const session = sessions.get(userId);
    
    if (!text) {
        const response = `╭┈❀ *TEBAK ANGKA*\n┃ ◦ Game Aktif! Angka rahasia antara 1 - 100.\n┃ ◦ Percobaan berjalan: ${session.attempts}x\n┃ ◦ Jawab dengan: .tebakangka <angka>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const inputLower = text.toLowerCase();
    
    if (inputLower === 'nyerah' || inputLower === 'pass') {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK ANGKA*\n┃ ◦ Kamu menyerah!\n┃ ◦ Angka rahasianya adalah: ${session.target}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const guess = parseInt(text);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        return m.reply(`╭┈❀ *TEBAK ANGKA*\n┃ ◦ Harap masukkan angka valid antara 1 - 100!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
    }
    
    session.attempts += 1;
    
    if (guess === session.target) {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK ANGKA*\n┃ ◦ Selamat! Tebakan kamu BENAR! 🎉\n┃ ◦ Angka Rahasia: ${guess}\n┃ ◦ Total Percobaan: ${session.attempts}x\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const hint = guess < session.target ? 'Tebakan terlalu KECIL! ⬆️' : 'Tebakan terlalu BESAR! ⬇️';
    const response = `╭┈❀ *TEBAK ANGKA*\n┃ ◦ ${hint}\n┃ ◦ Percobaan: ke-${session.attempts}\n┃ ◦ Ketik: .tebakangka nyerah (untuk menyerah)\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    return m.reply(response);
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'slot',
    alias: ['jackpot', 'slots'],
    category: 'fun',
    description: 'Bermain mesin slot acak',
    usage: '.slot',
    example: '.slot',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const items = ['🍇', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍒', '🍓', '🔔', '💎', '7️⃣'];

async function handler(m) {
    const r1 = items[Math.floor(Math.random() * items.length)];
    const r2 = items[Math.floor(Math.random() * items.length)];
    const r3 = items[Math.floor(Math.random() * items.length)];
    
    let status = '';
    if (r1 === r2 && r2 === r3) {
        status = 'JACKPOT BESAR! 🎉💎';
    } else if (r1 === r2 || r1 === r3 || r2 === r3) {
        status = 'Hampir Menang! 😃 (2 Sejajar)';
    } else {
        status = 'Coba Lagi! 😢 (Tidak Ada Yang Cocok)';
    }
    
    const response = `╭┈❀ *SLOT MACHINE*\n┃ ◦ [ ${r1} | ${r2} | ${r3} ]\n┃ ◦ Status: ${status}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

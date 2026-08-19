// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'dadu',
    alias: ['dice', 'rolldice'],
    category: 'fun',
    description: 'Lempar dadu acak 1-6',
    usage: '.dadu [jumlah]',
    example: '.dadu 3',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const diceEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];

async function handler(m) {
    const text = m.text?.trim();
    let count = 1;
    
    if (text) {
        const parsed = parseInt(text);
        if (!isNaN(parsed) && parsed > 0) {
            count = Math.min(parsed, 5); // maksimal 5 dadu
        }
    }
    
    const rolls = [];
    let total = 0;
    
    for (let i = 0; i < count; i++) {
        const val = Math.floor(Math.random() * 6) + 1;
        rolls.push(`🎲 ${val} (${diceEmojis[val - 1]})`);
        total += val;
    }
    
    const response = `╭┈❀ *LEMPAR DADU*\n┃ ◦ Hasil Lemparan: ${rolls.join(' | ')}\n┃ ◦ Total Nilai: ${total}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'tebakwarna',
    alias: ['guesscolor', 'hexcolor', 'warna'],
    category: 'fun',
    description: 'Game menebak nama warna berdasarkan kode Hex',
    usage: '.tebakwarna <jawaban>',
    example: '.tebakwarna merah',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const colors = [
    { hex: '#FF0000', name: 'merah', hint: 'Warna primer, seperti cabai/darah (5 huruf)' },
    { hex: '#00FF00', name: 'hijau', hint: 'Warna daun / rumput (5 huruf)' },
    { hex: '#0000FF', name: 'biru', hint: 'Warna langit / laut (4 huruf)' },
    { hex: '#FFFF00', name: 'kuning', hint: 'Warna pisang matang / matahari (6 huruf)' },
    { hex: '#FFA500', name: 'oranye', hint: 'Warna jeruk / wortel (6 huruf)' },
    { hex: '#800080', name: 'ungu', hint: 'Warna terong / buah anggur (4 huruf)' },
    { hex: '#FFC0CB', name: 'merah muda', hint: 'Warna bunga mawar muda / pink (10 huruf)' },
    { hex: '#000000', name: 'hitam', hint: 'Warna malam / arang (5 huruf)' },
    { hex: '#FFFFFF', name: 'putih', hint: 'Warna awan / susu (5 huruf)' },
    { hex: '#808080', name: 'abu-abu', hint: 'Campuran hitam dan putih (7 huruf)' },
    { hex: '#A52A2A', name: 'cokelat', hint: 'Warna kayu / tanah / kopi (7 huruf)' },
    { hex: '#00FFFF', name: 'sian', hint: 'Warna biru terang / cyan (4 huruf)' },
    { hex: '#FF00FF', name: 'magenta', hint: 'Warna fuchsia / merah keunguan (7 huruf)' },
    { hex: '#E6E6FA', name: 'lavender', hint: 'Warna bunga lavender / ungu muda (8 huruf)' },
    { hex: '#FFD700', name: 'emas', hint: 'Warna logam mulia / berkilau (4 huruf)' },
    { hex: '#C0C0C0', name: 'perak', hint: 'Warna logam perhiasan (5 huruf)' },
    { hex: '#008080', name: 'teal', hint: 'Warna hijau kebiruan (4 huruf)' },
    { hex: '#4B0082', name: 'nila', hint: 'Warna pelangi antara biru dan ungu (4 huruf)' },
    { hex: '#008000', name: 'hijau tua', hint: 'Warna daun pekat (10 huruf)' },
    { hex: '#800000', name: 'marun', hint: 'Warna merah tua kehitaman (5 huruf)' },
    { hex: '#000080', name: 'biru dongker', hint: 'Warna navy / biru tua (12 huruf)' },
    { hex: '#FA8072', name: 'salmon', hint: 'Warna daging ikan salmon (6 huruf)' },
    { hex: '#F0E68C', name: 'kaki', hint: 'Warna krem kekuningan / khaki (4 huruf)' },
    { hex: '#40E0D0', name: 'pirus', hint: 'Warna batu pirus / turquoise (5 huruf)' },
    { hex: '#DC143C', name: 'kirmizi', hint: 'Warna merah tua terang / crimson (7 huruf)' },
    { hex: '#FF7F50', name: 'koral', hint: 'Warna terumbu karang / coral (5 huruf)' },
    { hex: '#87CEEB', name: 'biru langit', hint: 'Warna sky blue (11 huruf)' },
    { hex: '#228B22', name: 'hijau hutan', hint: 'Warna forest green (11 huruf)' },
    { hex: '#DAA520', name: 'emas tua', hint: 'Warna goldenrod (8 huruf)' },
    { hex: '#B22222', name: 'bata', hint: 'Warna batu bata (4 huruf)' },
    { hex: '#FF69B4', name: 'merah muda terang', hint: 'Warna hot pink (17 huruf)' },
    { hex: '#708090', name: 'abu-abu batu', hint: 'Warna slate gray (12 huruf)' },
    { hex: '#556B2F', name: 'zaitun', hint: 'Warna olive green (6 huruf)' },
    { hex: '#8B4513', name: 'cokelat pelana', hint: 'Warna saddle brown (14 huruf)' },
    { hex: '#2E8B57', name: 'hijau laut', hint: 'Warna sea green (10 huruf)' }
];

const sessions = new Map();

async function handler(m) {
    const userId = m.sender;
    const text = m.text?.trim() || '';
    
    if (!sessions.has(userId)) {
        const item = colors[Math.floor(Math.random() * colors.length)];
        sessions.set(userId, { color: item, attempts: 0 });
        
        if (!text) {
            const response = `╭┈❀ *TEBAK WARNA*\n┃ ◦ Kode Hex: ${item.hex}\n┃ ◦ Petunjuk: ${item.hint}\n┃ ◦ Ketik: .tebakwarna <nama warna>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return m.reply(response);
        }
    }
    
    const session = sessions.get(userId);
    
    if (!text) {
        const response = `╭┈❀ *TEBAK WARNA*\n┃ ◦ Kode Hex: ${session.color.hex}\n┃ ◦ Petunjuk: ${session.color.hint}\n┃ ◦ Ketik: .tebakwarna <nama warna>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const input = text.toLowerCase();
    
    if (input === 'nyerah' || input === 'pass') {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK WARNA*\n┃ ◦ Kamu menyerah!\n┃ ◦ Kode Hex: ${session.color.hex}\n┃ ◦ Jawabannya: ${session.color.name}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    if (input === session.color.name.toLowerCase()) {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK WARNA*\n┃ ◦ Selamat! Jawaban kamu BENAR! 🎉\n┃ ◦ Kode Hex: ${session.color.hex}\n┃ ◦ Warna: ${session.color.name}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    session.attempts += 1;
    const response = `╭┈❀ *TEBAK WARNA*\n┃ ◦ Jawaban kamu SALAH! ❌\n┃ ◦ Kode Hex: ${session.color.hex}\n┃ ◦ Percobaan: ke-${session.attempts}\n┃ ◦ Ketik: .tebakwarna nyerah (untuk menyerah)\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    return m.reply(response);
}

export { pluginConfig as config, handler };

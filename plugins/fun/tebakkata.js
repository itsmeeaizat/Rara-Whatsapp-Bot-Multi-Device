// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'tebakkata',
    alias: ['scramble', 'susunkata'],
    category: 'fun',
    description: 'Game menyusun kata acak menjadi kata yang benar',
    usage: '.tebakkata <jawaban>',
    example: '.tebakkata',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const wordList = [
    { word: 'KOMPUTER', hint: 'Perangkat elektronik untuk mengolah data' },
    { word: 'INTERNET', hint: 'Jaringan global yang menghubungkan komputer' },
    { word: 'KEYBOARD', hint: 'Papan ketik untuk memasukkan karakter' },
    { word: 'HANDPHONE', hint: 'Telepon genggam nirkabel' },
    { word: 'MATAHARI', hint: 'Bintang pusat tata surya kita' },
    { word: 'INDONESIA', hint: 'Negara kepulauan terbesar di dunia' },
    { word: 'PANCASILA', hint: 'Dasar negara Republik Indonesia' },
    { word: 'MONAS', hint: 'Monumen nasional di Jakarta' },
    { word: 'KAPAL', hint: 'Kendaraan transportasi di atas air' },
    { word: 'PESAWAT', hint: 'Kendaraan transportasi di udara' },
    { word: 'SEKOLAH', hint: 'Tempat menuntut ilmu bagi siswa' },
    { word: 'PERPUSTAKAAN', hint: 'Tempat menyimpan dan membaca koleksi buku' },
    { word: 'SEPATU', hint: 'Alas kaki untuk melindungi kaki' },
    { word: 'KACAMATA', hint: 'Lensa pembantu penglihatan mata' },
    { word: 'TELEVISI', hint: 'Media elektronik penampil gambar dan suara' },
    { word: 'HARIMAU', hint: 'Kucing besar pemakan daging bermotif garis' },
    { word: 'LUMBA', hint: 'Mamalia cerdas yang hidup di laut' },
    { word: 'CENDERAWASIH', hint: 'Burung indah khas dari Papua' },
    { word: 'GITAR', hint: 'Alat musik petik bergagang' },
    { word: 'PIANO', hint: 'Alat musik tuts tekan' },
    { word: 'ANGKLUNG', hint: 'Alat musik tradisional bambu' },
    { word: 'BATIK', hint: 'Kain bergambar bergaya khas Indonesia' },
    { word: 'RENDANG', hint: 'Masakan daging khas Minangkabau' },
    { word: 'GADO', hint: 'Makanan sayuran dengan bumbu kacang' },
    { word: 'SAMUDRA', hint: 'Lautan yang sangat luas' },
    { word: 'GUNUNG', hint: 'Daratan menonjol tinggi dari permukaan' },
    { word: 'PELANGI', hint: 'Lengkung warna indah di langit' },
    { word: 'BINTANG', hint: 'Benda langit yang memancarkan cahaya' },
    { word: 'ASTRONOT', hint: 'Orang yang menjelajahi ruang angkasa' },
    { word: 'ROKET', hint: 'Wahana pendorong cepat ke luar angkasa' },
    { word: 'KALENDER', hint: 'Penunjuk tanggal, hari, dan bulan' },
    { word: 'DOMPET', hint: 'Wadah menyimpan uang dan kartu' },
    { word: 'PAYUNG', hint: 'Pelindung dari hujan dan panas' },
    { word: 'JEMBATAN', hint: 'Struktur penghubung dua daratan' },
    { word: 'JENDELA', hint: 'Lubang angin dan cahaya di dinding' },
    { word: 'STASIUN', hint: 'Tempat pemberhentian kereta api' },
    { word: 'BANDARA', hint: 'Tempat pendaratan pesawat terbang' },
    { word: 'PELABUHAN', hint: 'Tempat bersandar kapal laut' },
    { word: 'PRAMUKA', hint: 'Organisasi kepanduan pemuda' },
    { word: 'DOMBA', hint: 'Hewan berkaki empat penghasil wol' }
];

function scrambleWord(word) {
    const arr = word.split('');
    let scrambled = word;
    let attempts = 0;
    while (scrambled === word && attempts < 10 && word.length > 1) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        scrambled = arr.join('');
        attempts++;
    }
    return scrambled;
}

const sessions = new Map();

async function handler(m) {
    const userId = m.sender;
    const text = m.text?.trim() || '';
    
    if (!sessions.has(userId)) {
        const item = wordList[Math.floor(Math.random() * wordList.length)];
        const scrambled = scrambleWord(item.word);
        sessions.set(userId, { word: item.word, scrambled, hint: item.hint, attempts: 0 });
        
        if (!text) {
            const response = `╭┈❀ *TEBAK KATA*\n┃ ◦ Kata Acak: *${scrambled}*\n┃ ◦ Petunjuk: ${item.hint}\n┃ ◦ Jawab dengan: .tebakkata <jawaban>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return m.reply(response);
        }
    }
    
    const session = sessions.get(userId);
    
    if (!text) {
        const response = `╭┈❀ *TEBAK KATA*\n┃ ◦ Kata Acak: *${session.scrambled}*\n┃ ◦ Petunjuk: ${session.hint}\n┃ ◦ Jawab dengan: .tebakkata <jawaban>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const inputLower = text.toLowerCase();
    
    if (inputLower === 'nyerah' || inputLower === 'pass') {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK KATA*\n┃ ◦ Kamu menyerah!\n┃ ◦ Kata yang benar: *${session.word}*\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    if (text.toUpperCase() === session.word) {
        sessions.delete(userId);
        const response = `╭┈❀ *TEBAK KATA*\n┃ ◦ Selamat! Jawaban kamu BENAR! 🎉\n┃ ◦ Kata: *${session.word}*\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    session.attempts += 1;
    const response = `╭┈❀ *TEBAK KATA*\n┃ ◦ Jawaban kamu SALAH! ❌\n┃ ◦ Kata Acak: *${session.scrambled}*\n┃ ◦ Percobaan: ke-${session.attempts}\n┃ ◦ Ketik: .tebakkata nyerah (untuk menyerah)\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    return m.reply(response);
}

export { pluginConfig as config, handler };

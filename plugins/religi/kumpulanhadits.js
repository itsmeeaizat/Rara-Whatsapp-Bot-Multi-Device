// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'

const pluginConfig = {
    name: 'kumpulanhadits',
    alias: ['hadits', 'hadis', 'kumpulan-hadits'],
    category: 'religi',
    description: 'Kumpulan hadits shahih (Bukhari, Muslim, Abu Daud, dll.)',
    usage: '.kumpulanhadits [bukhari/muslim]',
    example: '.kumpulanhadits bukhari',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const staticHadiths = [
    { book: 'Shahih Bukhari', number: 1, arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', translation: 'Sesungguhnya setiap amalan tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan.' },
    { book: 'Shahih Bukhari', number: 13, arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', translation: 'Tidak sempurna iman salah seorang di antara kalian hingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri.' },
    { book: 'Shahih Muslim', number: 43, arabic: 'الدِّينُ النَّصِيحَةُ', translation: 'Agama itu adalah nasihat.' },
    { book: 'Shahih Muslim', number: 223, arabic: 'الطَّهُورُ شَطْرُ الإِيمَانِ', translation: 'Kebersihan itu adalah sebagian dari iman.' },
    { book: 'Shahih Bukhari', number: 6018, arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', translation: 'Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.' },
    { book: 'Shahih Muslim', number: 2564, arabic: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ', translation: 'Sesungguhnya Allah tidak melihat kepada rupa dan harta kalian, tetapi Dia melihat kepada hati dan amalan kalian.' },
    { book: 'Sunan Abu Daud', number: 4799, arabic: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا', translation: 'Orang mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya.' },
    { book: 'Sunan Tirmidzi', number: 1987, arabic: 'اتَّقِ اللَّهِ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ', translation: 'Bertakwalah kepada Allah di mana pun engkau berada, iringilah keburukan dengan kebaikan niscaya akan menghapuskannya, dan pergaulilah manusia dengan akhlak yang baik.' }
]

async function handler(m) {
    const query = m.args.join(' ').trim().toLowerCase();
    
    let bookParam = 'bukhari';
    if (query.includes('muslim')) {
        bookParam = 'muslim';
    } else if (query.includes('bukhari')) {
        bookParam = 'bukhari';
    } else {
        const books = ['bukhari', 'muslim'];
        bookParam = books[Math.floor(Math.random() * books.length)];
    }

    let hadithData = null;

    try {
        const randomNo = Math.floor(Math.random() * 50) + 1;
        const url = `https://api.hadith.gading.dev/books/${bookParam}/${randomNo}`;
        const res = await axios.get(url, { timeout: 4000 });
        if (res.data && res.data.data && res.data.data.contents) {
            hadithData = {
                book: res.data.data.name || `Shahih ${bookParam}`,
                number: res.data.data.contents.number || randomNo,
                arabic: res.data.data.contents.arab || res.data.data.contents.arabic,
                translation: res.data.data.contents.id || res.data.data.contents.translation
            };
        }
    } catch (e) {
        // Fallback to static
    }

    if (!hadithData) {
        if (query) {
            const filtered = staticHadiths.filter(h => h.book.toLowerCase().includes(query));
            if (filtered.length > 0) {
                hadithData = filtered[Math.floor(Math.random() * filtered.length)];
            }
        }
        if (!hadithData) {
            hadithData = staticHadiths[Math.floor(Math.random() * staticHadiths.length)];
        }
    }

    const title = `HADITS PILIHAN - ${hadithData.book.toUpperCase()}`;
    const response = [
        `╭┈❀ *${title}*`,
        `┃ ◦ Kitab: ${hadithData.book}`,
        `┃ ◦ Nomor Hadits: ${hadithData.number}`,
        `┃ ◦ `,
        `┃ ◦ Arab:`,
        `┃ ◦ ${hadithData.arabic}`,
        `┃ ◦ `,
        `┃ ◦ Terjemahan:`,
        `┃ ◦ ${hadithData.translation}`,
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
    ].join('\n');

    await m.reply(response);
}

export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'bahasa',
    alias: ['language', 'bahasadunia', 'langinfo'],
    category: 'info',
    description: 'Informasi bahasa di dunia (penutur, salam, sistem tulis, contoh frasa)',
    usage: '.bahasa <nama bahasa>',
    example: '.bahasa Jepang',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const bahasaData = [
    {
        key: 'indonesia',
        nama: 'Bahasa Indonesia',
        native: 'Bahasa Indonesia',
        penutur: '~200-270 Juta jiwa',
        salam: 'Halo / Selamat Pagi / Selamat Siang',
        sistemTulis: 'Latin (Alphabet)',
        rumpun: 'Austronesia (Melayik)',
        wilayah: 'Indonesia',
        frasa: 'Terima kasih, Sampai jumpa, Apa kabar?'
    },
    {
        key: 'inggris',
        nama: 'Bahasa Inggris',
        native: 'English',
        penutur: '~1.5 Miliar jiwa (termasuk penutur kedua)',
        salam: 'Hello / Hi / Good morning',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Jermanik)',
        wilayah: 'Britania Raya, AS, Australia, Kanada, Selandia Baru',
        frasa: 'Thank you, How are you?, Goodbye'
    },
    {
        key: 'jepang',
        nama: 'Bahasa Jepang',
        native: '日本語 (Nihongo)',
        penutur: '~125 Juta jiwa',
        salam: 'Konnichiwa (こんにちは)',
        sistemTulis: 'Kanji, Hiragana, Katakana',
        rumpun: 'Japonic',
        wilayah: 'Jepang',
        frasa: 'Arigatou gozaimasu (Terima kasih), Sayonara (Sampai jumpa)'
    },
    {
        key: 'mandarin',
        nama: 'Bahasa Mandarin / China',
        native: '中文 (Zhōngwén) / 普通话',
        penutur: '~1.1 Miliar jiwa',
        salam: 'Nǐ hǎo (你好)',
        sistemTulis: 'Aksara Han (Sederhana & Tradisional)',
        rumpun: 'Sino-Tibet',
        wilayah: 'China, Taiwan, Singapura',
        frasa: 'Xièxiè (Terima kasih), Zàijiàn (Sampai jumpa)'
    },
    {
        key: 'arab',
        nama: 'Bahasa Arab',
        native: 'العربية (Al-ʿArabiyyah)',
        penutur: '~370 Juta jiwa',
        salam: 'Marhaban (مرحبا) / Assalamu Alaikum',
        sistemTulis: 'Aksara Arab (Abjad)',
        rumpun: 'Afroasiatik (Semitik)',
        wilayah: 'Timur Tengah & Afrika Utara (22 negara resmi)',
        frasa: 'Shukran (Terima kasih), Ma\'as salama (Selamat tinggal)'
    },
    {
        key: 'spanyol',
        nama: 'Bahasa Spanyol',
        native: 'Español / Castellano',
        penutur: '~550 Juta jiwa',
        salam: 'Hola / Buenos días',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Romance)',
        wilayah: 'Spanyol, Meksiko, Amerika Latin',
        frasa: 'Gracias (Terima kasih), ¿Cómo estás? (Apa kabar?)'
    },
    {
        key: 'prancis',
        nama: 'Bahasa Prancis',
        native: 'Français',
        penutur: '~320 Juta jiwa',
        salam: 'Bonjour / Salut',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Romance)',
        wilayah: 'Prancis, Kanada (Quebec), Belgia, Swiss, Afrika',
        frasa: 'Merci (Terima kasih), Au revoir (Sampai jumpa)'
    },
    {
        key: 'jerman',
        nama: 'Bahasa Jerman',
        native: 'Deutsch',
        penutur: '~130 Juta jiwa',
        salam: 'Hallo / Guten Tag',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Jermanik)',
        wilayah: 'Jerman, Austria, Swiss, Liechtenstein',
        frasa: 'Danke (Terima kasih), Auf Wiedersehen (Sampai jumpa)'
    },
    {
        key: 'rusia',
        nama: 'Bahasa Rusia',
        native: 'Русский язык (Russkiy yazyk)',
        penutur: '~258 Juta jiwa',
        salam: 'Privet (Привет) / Zdravstvuyte (Здравствуйте)',
        sistemTulis: 'Sirilik (Cyrillic)',
        rumpun: 'Indo-Eropa (Slavia)',
        wilayah: 'Rusia, Belarusia, Kazakhstan, Kirgizstan',
        frasa: 'Spasibo (Terima kasih), Do svidaniya (Sampai jumpa)'
    },
    {
        key: 'korea',
        nama: 'Bahasa Korea',
        native: '한국어 (Hangug-eo)',
        penutur: '~80 Juta jiwa',
        salam: 'Annyeonghaseyo (안녕하세요)',
        sistemTulis: 'Hangul (한글)',
        rumpun: 'Koreanic',
        wilayah: 'Korea Selatan, Korea Utara',
        frasa: 'Gamsahamnida (Terima kasih), Annyeong (Selamat tinggal)'
    },
    {
        key: 'hindi',
        nama: 'Bahasa Hindi',
        native: 'हिन्दी (Hindī)',
        penutur: '~600 Juta jiwa',
        salam: 'Namaste (नमस्ते)',
        sistemTulis: 'Devanagari',
        rumpun: 'Indo-Eropa (Indo-Aria)',
        wilayah: 'India',
        frasa: 'Dhanyavaad (Terima kasih), Aap kaise hain? (Apa kabar?)'
    },
    {
        key: 'portugis',
        nama: 'Bahasa Portugis',
        native: 'Português',
        penutur: '~260 Juta jiwa',
        salam: 'Olá / Bom dia',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Romance)',
        wilayah: 'Brasil, Portugal, Angola, Mozambik',
        frasa: 'Obrigado (Terima kasih), Tchau (Sampai jumpa)'
    },
    {
        key: 'italia',
        nama: 'Bahasa Italia',
        native: 'Italiano',
        penutur: '~85 Juta jiwa',
        salam: 'Ciao / Buongiorno',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Romance)',
        wilayah: 'Italia, Swiss, San Marino',
        frasa: 'Grazie (Terima kasih), Arrivederci (Sampai jumpa)'
    },
    {
        key: 'belanda',
        nama: 'Bahasa Belanda',
        native: 'Nederlands',
        penutur: '~28 Juta jiwa',
        salam: 'Hallo / Goedemorgen',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Jermanik)',
        wilayah: 'Belanda, Belgia (Flandria), Suriname',
        frasa: 'Dank u (Terima kasih), Tot ziens (Sampai jumpa)'
    },
    {
        key: 'jawa',
        nama: 'Bahasa Jawa',
        native: 'Basa Jawa (ꦧꦱꦗꦮ)',
        penutur: '~80 Juta jiwa',
        salam: 'Sugeng enjang / Sugeng rawuh',
        sistemTulis: 'Latin & Aksara Jawa (Hanacaraka)',
        rumpun: 'Austronesia (Jawa)',
        wilayah: 'Indonesia (Jawa Tengah, DIY, Jawa Timur, Lampung)',
        frasa: 'Matur nuwun (Terima kasih), Piye kabare? (Apa kabar?)'
    },
    {
        key: 'sunda',
        nama: 'Bahasa Sunda',
        native: 'Basa Sunda (ᮘᮞ ᮞᮥᮔ᮪ᮓ)',
        penutur: '~42 Juta jiwa',
        salam: 'Wilujeng sumping / Wilujeng enjing',
        sistemTulis: 'Latin & Aksara Sunda',
        rumpun: 'Austronesia (Sunda)',
        wilayah: 'Indonesia (Jawa Barat & Banten)',
        frasa: 'Hatur nuhun (Terima kasih), Kumaha damang? (Apa kabar?)'
    },
    {
        key: 'tagalog',
        nama: 'Bahasa Tagalog / Filipino',
        native: 'Wikang Tagalog',
        penutur: '~100 Juta jiwa',
        salam: 'Kamusta / Magandang araw',
        sistemTulis: 'Latin & Baybayin',
        rumpun: 'Austronesia (Filipina)',
        wilayah: 'Filipina',
        frasa: 'Salamat (Terima kasih), Paalam (Sampai jumpa)'
    },
    {
        key: 'thai',
        nama: 'Bahasa Thailand',
        native: 'ภาษาไทย (Phasa Thai)',
        penutur: '~60 Juta jiwa',
        salam: 'Sawatdee (สวัสดี)',
        sistemTulis: 'Aksara Thai',
        rumpun: 'Kra-Dai',
        wilayah: 'Thailand',
        frasa: 'Khob khun (Terima kasih), Laew phob kan (Sampai jumpa)'
    },
    {
        key: 'vietnam',
        nama: 'Bahasa Vietnam',
        native: 'Tiếng Việt',
        penutur: '~85 Juta jiwa',
        salam: 'Xin chào',
        sistemTulis: 'Latin (Chữ Quốc ngữ dengan diakritik)',
        rumpun: 'Austroasiatik (Vietik)',
        wilayah: 'Vietnam',
        frasa: 'Cảm ơn (Terima kasih), Tạm biệt (Sampai jumpa)'
    },
    {
        key: 'turki',
        nama: 'Bahasa Turki',
        native: 'Türkçe',
        penutur: '~88 Juta jiwa',
        salam: 'Merhaba / Günaydın',
        sistemTulis: 'Latin',
        rumpun: 'Turkik',
        wilayah: 'Turki, Siprus Utara',
        frasa: 'Teşekkür ederim (Terima kasih), Hoşça kal (Sampai jumpa)'
    },
    {
        key: 'swahili',
        nama: 'Bahasa Swahili',
        native: 'Kiswahili',
        penutur: '~100-150 Juta jiwa',
        salam: 'Jambo / Habari',
        sistemTulis: 'Latin',
        rumpun: 'Niger-Kordofanian (Bantu)',
        wilayah: 'Tanzania, Kenya, Uganda, Rwanda',
        frasa: 'Asante (Terima kasih), Kwaheri (Sampai jumpa)'
    },
    {
        key: 'urdu',
        nama: 'Bahasa Urdu',
        native: 'اُردُو (Urdū)',
        penutur: '~230 Juta jiwa',
        salam: 'Assalamu Alaikum / Adaab',
        sistemTulis: 'Aksara Perso-Arab (Nasta\'liq)',
        rumpun: 'Indo-Eropa (Indo-Aria)',
        wilayah: 'Pakistan, India',
        frasa: 'Shukriya (Terima kasih), Khuda Hafiz (Sampai jumpa)'
    },
    {
        key: 'persia',
        nama: 'Bahasa Persia / Farsi',
        native: 'فارسی (Fārsī)',
        penutur: '~110 Juta jiwa',
        salam: 'Salam (سلام) / Dorood',
        sistemTulis: 'Aksara Perso-Arab',
        rumpun: 'Indo-Eropa (Iranik)',
        wilayah: 'Iran, Afganistan (Dari), Tajikistan (Tajik)',
        frasa: 'Mamnun / Tashakkor (Terima kasih), Khoda hafez (Sampai jumpa)'
    },
    {
        key: 'yunani',
        nama: 'Bahasa Yunani',
        native: 'Ελληνικά (Elliniká)',
        penutur: '~13 Juta jiwa',
        salam: 'Yassas (Γεια σας) / Kalimera',
        sistemTulis: 'Aksara Yunani (Greek Alphabet)',
        rumpun: 'Indo-Eropa (Hellenik)',
        wilayah: 'Yunani, Siprus',
        frasa: 'Efcharisto (Terima kasih), Antio (Sampai jumpa)'
    },
    {
        key: 'polandia',
        nama: 'Bahasa Polandia',
        native: 'Język polski',
        penutur: '~50 Juta jiwa',
        salam: 'Cześć / Dzień dobry',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Slavia Barat)',
        wilayah: 'Polandia',
        frasa: 'Dziękuję (Terima kasih), Do widzenia (Sampai jumpa)'
    },
    {
        key: 'romania',
        nama: 'Bahasa Romania',
        native: 'Limba română',
        penutur: '~25 Juta jiwa',
        salam: 'Bună ziua / Salut',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Romance Timur)',
        wilayah: 'Romania, Moldova',
        frasa: 'Mulțumesc (Terima kasih), La revedere (Sampai jumpa)'
    },
    {
        key: 'swedia',
        nama: 'Bahasa Swedia',
        native: 'Svenska',
        penutur: '~10 Juta jiwa',
        salam: 'Hej / God dag',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Skandinavia)',
        wilayah: 'Swedia, Finlandia',
        frasa: 'Tack (Terima kasih), Hej då (Sampai jumpa)'
    },
    {
        key: 'finlandia',
        nama: 'Bahasa Finlandia',
        native: 'Suomi',
        penutur: '~5.5 Juta jiwa',
        salam: 'Hei / Hyvää päivää',
        sistemTulis: 'Latin',
        rumpun: 'Uralik (Finno-Ugrik)',
        wilayah: 'Finlandia',
        frasa: 'Kiitos (Terima kasih), Näkemiin (Sampai jumpa)'
    },
    {
        key: 'denmark',
        nama: 'Bahasa Denmark',
        native: 'Dansk',
        penutur: '~6 Juta jiwa',
        salam: 'Hej / Goddag',
        sistemTulis: 'Latin',
        rumpun: 'Indo-Eropa (Skandinavia)',
        wilayah: 'Denmark, Kepulauan Faroe, Greenland',
        frasa: 'Tak (Terima kasih), Farvel (Sampai jumpa)'
    },
    {
        key: 'hungaria',
        nama: 'Bahasa Hungaria',
        native: 'Magyar nyelv',
        penutur: '~13 Juta jiwa',
        salam: 'Szia / Jó napot',
        sistemTulis: 'Latin',
        rumpun: 'Uralik (Ugrik)',
        wilayah: 'Hungaria',
        frasa: 'Köszönöm (Terima kasih), Viszontlátásra (Sampai jumpa)'
    }
];

async function handler(m, context = {}) {
    try {
        const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

        if (!query) {
            let listMsg = `╭┈❀ *INFORMASI BAHASA DUNIA*\n`;
            listMsg += `┃ ◦ Masukkan nama bahasa yang ingin anda ketahui.\n`;
            listMsg += `┃ ◦ Contoh: *.bahasa Jepang*\n`;
            listMsg += `┃ ◦ Contoh: *.bahasa Arab*\n`;
            listMsg += `┃ ◦ Daftar Bahasa Tersedia (30+):\n`;
            bahasaData.forEach((b, idx) => {
                listMsg += `┃   ${idx + 1}. ${b.nama} (${b.native})\n`;
            });
            listMsg += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(listMsg);
        }

        const match = bahasaData.find(b =>
            b.key === query ||
            b.nama.toLowerCase().includes(query) ||
            b.native.toLowerCase().includes(query)
        );

        if (!match) {
            let notFound = `╭┈❀ *BAHASA TIDAK DITEMUK*\n`;
            notFound += `┃ ◦ Bahasa *${query}* belum tersedia dalam daftar.\n`;
            notFound += `┃ ◦ Coba bahasa lain seperti: Indonesia, Inggris, Jepang, Mandarin, Arab, Jerman, Sunda, Jawa.\n`;
            notFound += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(notFound);
        }

        let resultMsg = `╭┈❀ *INFORMASI BAHASA - ${match.nama.toUpperCase()}*\n`;
        resultMsg += `┃ ◦ Nama Penutur Asli: ${match.native}\n`;
        resultMsg += `┃ ◦ Salam / Ucapan Halo: ${match.salam}\n`;
        resultMsg += `┃ ◦ Jumlah Penutur: ${match.penutur}\n`;
        resultMsg += `┃ ◦ Rumpun Bahasa: ${match.rumpun}\n`;
        resultMsg += `┃ ◦ Sistem Penulisan: ${match.sistemTulis}\n`;
        resultMsg += `┃ ◦ Wilayah Penutur Utama: ${match.wilayah}\n`;
        resultMsg += `┃ ◦ Contoh Frasa Sehari-hari: ${match.frasa}\n`;
        resultMsg += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        await m.reply(resultMsg);
    } catch (err) {
        let errText = `╭┈❀ *ERROR BAHASA INFO*\n`;
        errText += `┃ ◦ Gagal memproses informasi bahasa.\n`;
        errText += `┃ ◦ Pesan: ${err.message || err}\n`;
        errText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        await m.reply(errText);
    }
}

export { pluginConfig as config, handler };

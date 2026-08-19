// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'shioinfo',
    alias: ['shio', 'chinesezodiac', 'ramalanshio'],
    category: 'info',
    description: 'Informasi lengkap 12 Shio Cina berdasarkan tahun atau nama hewan',
    usage: '.shioinfo <tahun / nama shio>',
    example: '.shioinfo 1998',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const shioList = [
    {
        key: 'tikus',
        nama: 'Tikus (Rat)',
        elemen: 'Air 🌊',
        tahun: '1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032',
        sifat: 'Cerdas, cekatan, hemat, persuasif, pekerja keras',
        kelebihan: 'Cepat beradaptasi, berwawasan luas, hemat',
        kelemahan: 'Suka mengkritik, kadang licik, terlalu kalkulatif',
        cocok: 'Kerbau, Monyet, Naga',
        hindari: 'Kuda',
        deskripsi: 'Shio Tikus melambangkan kecerdasan dan kemampuan bertahan hidup yang tinggi. Mereka sangat pintar mencari peluang dalam situasi apa pun.'
    },
    {
        key: 'kerbau',
        nama: 'Kerbau (Ox)',
        elemen: 'Tanah 🪵',
        tahun: '1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033',
        sifat: 'Tekun, jujur, sabar, patuh, keras kepala',
        kelebihan: 'Setia, dapat diandalkan, sangat tekun',
        kelemahan: 'Pendiam, kaku, sulit menerima masukan',
        cocok: 'Tikus, Ular, Ayam',
        hindari: 'Kambing',
        deskripsi: 'Shio Kerbau dikenal sebagai sosok pekerja keras yang sangat tangguh dan konsisten. Mereka memegang teguh komitmen dan prinsip.'
    },
    {
        key: 'macan',
        nama: 'Macan (Tiger)',
        elemen: 'Kayu 🌲',
        tahun: '1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034',
        sifat: 'Pemberani, kompetitif, karismatik, independen',
        kelebihan: 'Jiwa pemenang, berani membela kebenaran, percaya diri',
        kelemahan: 'Emosional, impulsif, tidak sabaran',
        cocok: 'Kuda, Anjing, Babi',
        hindari: 'Monyet',
        deskripsi: 'Shio Macan adalah sosok pemimpin alami yang penuh keberanian dan pesona. Mereka menyukai tantangan dan bertindak tanpa ragu.'
    },
    {
        key: 'kelinci',
        nama: 'Kelinci (Rabbit)',
        elemen: 'Kayu 🌲',
        tahun: '1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035',
        sifat: 'Lembut, anggun, waspada, diplomatis, pemalu',
        kelebihan: 'Penyejuk suasana, artistik, sangat sopan',
        kelemahan: 'Mudah cemas, menghindari konfrontasi',
        cocok: 'Kambing, Anjing, Babi',
        hindari: 'Ayam',
        deskripsi: 'Shio Kelinci melambangkan kedamaian, keanggunan, dan keberuntungan. Mereka memiliki intuisi halus dan kepekaan seni yang tinggi.'
    },
    {
        key: 'naga',
        nama: 'Naga (Dragon)',
        elemen: 'Tanah 🪵',
        tahun: '1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036',
        sifat: 'Enerjik, ambisius, karismatik, megah, dominan',
        kelebihan: 'Kreatif, penuh vitalitas, pemimpin alami',
        kelemahan: 'Sombong, perfeksionis, sulit dikendalikan',
        cocok: 'Tikus, Monyet, Ayam',
        hindari: 'Anjing',
        deskripsi: 'Shio Naga melambangkan kekuatan tertinggi dan kehormatan. Orang ber-shio Naga biasanya memiliki aura pemikat dan impian besar.'
    },
    {
        key: 'ular',
        nama: 'Ular (Snake)',
        elemen: 'Api 🔥',
        tahun: '1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037',
        sifat: 'Bijaksana, misterius, intuitif, anggun, cemburuan',
        kelebihan: 'Pemikir mendalam, tenang, memiliki firasat kuat',
        kelemahan: 'Pendendam, tidak mudah percaya, posesis',
        cocok: 'Kerbau, Ayam',
        hindari: 'Babi',
        deskripsi: 'Shio Ular dikenal sebagai simbol kebijaksanaan dan misteri. Mereka selalu berpikir matang sebelum melangkah.'
    },
    {
        key: 'kuda',
        nama: 'Kuda (Horse)',
        elemen: 'Api 🔥',
        tahun: '1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038',
        sifat: 'Aktif, energik, mandiri, humoris, tidak sabaran',
        kelebihan: 'Komunikatif, ceria, berjiwa bebas',
        kelemahan: 'Bosan pada rutinitas, terburu-buru',
        cocok: 'Macan, Kambing, Anjing',
        hindari: 'Tikus',
        deskripsi: 'Shio Kuda menyukai kebebasan dan pergerakan cepat. Mereka sangat ramah, penuh energi, serta mandiri.'
    },
    {
        key: 'kambing',
        nama: 'Kambing (Goat)',
        elemen: 'Tanah 🪵',
        tahun: '1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039',
        sifat: 'Penyayang, simpatik, artistik, lembut, pemaaf',
        kelebihan: 'Empati tinggi, kreatif, suka kedamaian',
        kelemahan: 'Pesimis, ragu-ragu, terlalu bergantung',
        cocok: 'Kelinci, Kuda, Babi',
        hindari: 'Kerbau',
        deskripsi: 'Shio Kambing melambangkan kelembutan hati dan jiwa seni. Mereka sangat peduli terhadap perasaan orang lain.'
    },
    {
        key: 'monyet',
        nama: 'Monyet (Monkey)',
        elemen: 'Logam ⚔️',
        tahun: '1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040',
        sifat: 'Cerdas, humoris, cerdik, inovatif, jahil',
        kelebihan: 'Cepat memecahkan masalah, fleksibel, lincah',
        kelemahan: 'Kadang jahil, terlalu percaya diri, oportunis',
        cocok: 'Tikus, Naga',
        hindari: 'Macan',
        deskripsi: 'Shio Monyet memiliki otak encer dan selera humor yang tinggi. Mereka sangat cerdik mengatasai berbagai kendala.'
    },
    {
        key: 'ayam',
        nama: 'Ayam (Rooster)',
        elemen: 'Logam ⚔️',
        tahun: '1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041',
        sifat: 'Disiplin, teliti, berani berbicara, perfeksionis',
        kelebihan: 'Tepat waktu, terorganisir, jujur',
        kelemahan: 'Suka pamer, kritis, egois',
        cocok: 'Kerbau, Ular, Naga',
        hindari: 'Kelinci',
        deskripsi: 'Shio Ayam adalah sosok yang rapi, teratur, dan percaya diri. Mereka sangat rajin dan tidak segan mengutarakan pendapat.'
    },
    {
        key: 'anjing',
        nama: 'Anjing (Dog)',
        elemen: 'Tanah 🪵',
        tahun: '1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042',
        sifat: 'Setia, jujur, protektif, adil, waspada',
        kelebihan: 'Sangat setia, sahabat sejati, penuh integritas',
        kelemahan: 'Mudah cemas, agak sinis, berprasangka',
        cocok: 'Macan, Kuda, Kelinci',
        hindari: 'Naga',
        deskripsi: 'Shio Anjing melambangkan kesetiaan dan kejujuran tanpa batas. Mereka senantiasa melindungi orang-orang yang dicintainya.'
    },
    {
        key: 'babi',
        nama: 'Babi (Pig)',
        elemen: 'Air 🌊',
        tahun: '1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043',
        sifat: 'Jujur, dermawan, toleran, ceria, pemurah',
        kelebihan: 'Suka menolong, tidak dendam, penyayang',
        kelemahan: 'Mudah percaya orang, terlalu naif',
        cocok: 'Kambing, Kelinci, Macan',
        hindari: 'Ular',
        deskripsi: 'Shio Babi melambangkan kebahagiaan, kemakmuran, dan ketulusan hati. Mereka sosok sahabat yang hangat dan ikhlas.'
    }
];

async function handler(m, context = {}) {
    try {
        const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

        if (!query) {
            let listText = `╭┈❀ *INFORMASI SHIO CINA*\n`;
            listText += `┃ ◦ Masukkan tahun lahir atau nama shio.\n`;
            listText += `┃ ◦ Contoh tahun: *.shioinfo 1998*\n`;
            listText += `┃ ◦ Contoh nama: *.shioinfo naga*\n`;
            listText += `┃ ◦ Daftar 12 Shio:\n`;
            shioList.forEach(s => {
                listText += `┃   • ${s.nama}\n`;
            });
            listText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(listText);
        }

        let selectedShio = null;

        // Check if query is a number/year
        const numYear = parseInt(query);
        if (!isNaN(numYear) && numYear > 1800 && numYear < 2100) {
            let index = (numYear - 4) % 12;
            if (index < 0) index += 12;
            selectedShio = shioList[index];
        } else {
            // Find by key or name search
            selectedShio = shioList.find(s =>
                s.key === query ||
                s.nama.toLowerCase().includes(query)
            );
        }

        if (!selectedShio) {
            let notFound = `╭┈❀ *SHIO TIDAK DITEMUK*\n`;
            notFound += `┃ ◦ Data shio atau tahun *${query}* tidak ditemukan.\n`;
            notFound += `┃ ◦ Masukkan tahun valid (contoh: 2000) atau nama shio (contoh: naga, tikus).\n`;
            notFound += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(notFound);
        }

        let replyText = `╭┈❀ *INFO SHIO - ${selectedShio.nama.toUpperCase()}*\n`;
        replyText += `┃ ◦ Elemen Utama: ${selectedShio.elemen}\n`;
        replyText += `┃ ◦ Contoh Tahun Lahir: ${selectedShio.tahun}\n`;
        replyText += `┃ ◦ Karakter & Sifat: ${selectedShio.sifat}\n`;
        replyText += `┃ ◦ Kelebihan: ${selectedShio.kelebihan}\n`;
        replyText += `┃ ◦ Kelemahan: ${selectedShio.kelemahan}\n`;
        replyText += `┃ ◦ Shio Sangat Cocok: ${selectedShio.cocok}\n`;
        replyText += `┃ ◦ Shio Perlu Diwaspadai: ${selectedShio.hindari}\n`;
        replyText += `┃ ◦ Ringkasan: ${selectedShio.deskripsi}\n`;
        replyText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        await m.reply(replyText);
    } catch (err) {
        let errText = `╭┈❀ *ERROR SHIO INFO*\n`;
        errText += `┃ ◦ Gagal memproses informasi shio.\n`;
        errText += `┃ ◦ Pesan: ${err.message || err}\n`;
        errText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        await m.reply(errText);
    }
}

export { pluginConfig as config, handler };

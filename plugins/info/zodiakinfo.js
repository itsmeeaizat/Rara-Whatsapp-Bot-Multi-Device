// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'zodiakinfo',
    alias: ['zodiak', 'zodiac', 'infozodiak'],
    category: 'info',
    description: 'Informasi lengkap 12 zodiak (tanggal, sifat, elemen, kecocokan)',
    usage: '.zodiakinfo <nama zodiak>',
    example: '.zodiakinfo aries',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const zodiakData = {
    aries: {
        nama: 'Aries',
        tanggal: '21 Maret - 19 April',
        elemen: 'Api 🔥',
        planet: 'Mars 🔴',
        sifat: 'Pemberani, penuh semangat, percaya diri, antusias, impulsif',
        kekuatan: 'Kepemimpinan alami, jujur, berani mengambil risiko',
        kelemahan: 'Tidak sabar, mudah marah, agak agresif',
        pasangan: 'Leo, Sagittarius, Gemini',
        deskripsi: 'Aries adalah lambang keberanian dan inisiatif. Sebagai zodiak pertama, mereka selalu bersemangat memulai hal baru dan tidak takut menghadapi tantangan.'
    },
    taurus: {
        nama: 'Taurus',
        tanggal: '20 April - 20 Mei',
        elemen: 'Tanah 🪵',
        planet: 'Venus 💖',
        sifat: 'Setia, sabar, praktis, stabil, keras kepala',
        kekuatan: 'Handal, dapat dipercaya, pekerja keras, estetis',
        kelemahan: 'Keras kepala, posesif, sulit menerima perubahan',
        pasangan: 'Virgo, Capricorn, Cancer',
        deskripsi: 'Taurus mengutamakan kenyamanan, stabilitas, dan keindahan. Mereka sangat gigih meraih tujuan dan setia dalam hubungan.'
    },
    gemini: {
        nama: 'Gemini',
        tanggal: '21 Mei - 20 Juni',
        elemen: 'Udara 💨',
        planet: 'Merkurius 🪶',
        sifat: 'Komunikatif, cerdas, adaptif, ingin tahu, tidak konsisten',
        kekuatan: 'Pandai berbicara, wawasan luas, cepat belajar',
        kelemahan: 'Gampang bosan, ragu-ragu, permukaan',
        pasangan: 'Libra, Aquarius, Aries',
        deskripsi: 'Gemini adalah sosok sosial yang cerdas dan berjiwa muda. Mereka menyukai obrolan mendalam dan memiliki rasa ingin tahu yang tinggi.'
    },
    cancer: {
        nama: 'Cancer',
        tanggal: '21 Juni - 22 Juli',
        elemen: 'Air 🌊',
        planet: 'Bulan 🌙',
        sifat: 'Penyayang, intuitif, protektif, sensitif, emosional',
        kekuatan: 'Empati tinggi, setia pada keluarga, imajinatif',
        kelemahan: 'Suasana hati berubah-ubah, sensitif berlebihan',
        pasangan: 'Scorpio, Pisces, Taurus',
        deskripsi: 'Cancer memiliki naluri mengayomi yang kuat dan intuisi tajam. Mereka sangat menghargai ikatan emosional dan rumah.'
    },
    leo: {
        nama: 'Leo',
        tanggal: '23 Juli - 22 Agustus',
        elemen: 'Api 🔥',
        planet: 'Matahari ☀️',
        sifat: 'Karismatik, pemurah, percaya diri, dominan, setia',
        kekuatan: 'Kreatif, jiwa pemimpin, humoris, hangat',
        kelemahan: 'Suka dipuji, agak egois, dominan',
        pasangan: 'Aries, Sagittarius, Gemini',
        deskripsi: 'Leo dilahirkan sebagai pemimpin yang penuh aura dan kehangatan. Mereka suka menjadi pusat perhatian dan sangat protektif terhadap orang tersayang.'
    },
    virgo: {
        nama: 'Virgo',
        tanggal: '23 Agustus - 22 September',
        elemen: 'Tanah 🪵',
        planet: 'Merkurius 🪶',
        sifat: 'Perfeksionis, analitis, teliti, rendah hati, peka',
        kekuatan: 'Pekerja keras, terorganisir, penyelesai masalah',
        kelemahan: 'Terlalu kritis, mudah cemas, perfeksionis',
        pasangan: 'Taurus, Capricorn, Cancer',
        deskripsi: 'Virgo adalah sosok yang sangat detail, analitis, dan suka membantu orang lain. Mereka mengutamakan kerapian dan efisiensi.'
    },
    libra: {
        nama: 'Libra',
        tanggal: '23 September - 22 Oktober',
        elemen: 'Udara 💨',
        planet: 'Venus 💖',
        sifat: 'Diplomatis, adil, ramah, artistik, ragu-ragu',
        kekuatan: 'Penengah yang baik, kooperatif, adil',
        kelemahan: 'Gampang bimbang, tidak suka konflik, terlalu kompromi',
        pasangan: 'Gemini, Aquarius, Leo',
        deskripsi: 'Libra sangat menyukai kedamaian, keharmonisan, dan keindahan. Mereka selalu berusaha bersikap adil dan menyenangkan orang sekitar.'
    },
    scorpio: {
        nama: 'Scorpio',
        tanggal: '23 Oktober - 21 November',
        elemen: 'Air 🌊',
        planet: 'Pluto & Mars 💥',
        sifat: 'Intens, misterius, setia, ambisius, cemburuan',
        kekuatan: 'Tekad kuat, setia, sangat fokus, intuitif',
        kelemahan: 'Pendendam, tidak mudah percaya, cemburuan',
        pasangan: 'Cancer, Pisces, Virgo',
        deskripsi: 'Scorpio terkenal dengan kedalaman emosi, intuisi tajam, dan keteguhan tekad. Sekali berkomitmen, mereka sangat setia.'
    },
    sagittarius: {
        nama: 'Sagittarius',
        tanggal: '22 November - 21 Desember',
        elemen: 'Api 🔥',
        planet: 'Jupiter 🪐',
        sifat: 'Jiwa bebas, optimis, jujur, suka petualangan',
        kekuatan: 'Filsufis, humoris, antusias, berpandangan luas',
        kelemahan: 'Kurang diplomatis, tidak sabaran, ceroboh',
        pasangan: 'Aries, Leo, Aquarius',
        deskripsi: 'Sagittarius adalah penjelajah sejati yang mencintai kebebasan dan kebenaran. Mereka selalu melihat sisi positif kehidupan.'
    },
    capricorn: {
        nama: 'Capricorn',
        tanggal: '22 Desember - 19 Januari',
        elemen: 'Tanah 🪵',
        planet: 'Saturnus 🪐',
        sifat: 'Disiplin, ambisius, bertanggung jawab, realistis',
        kekuatan: 'Penyabar, bijaksana, tekun, terstruktur',
        kelemahan: 'Agak dingin, terlalu serius, pesimis',
        pasangan: 'Taurus, Virgo, Scorpio',
        deskripsi: 'Capricorn adalah sosok pekerja keras yang fokus pada tujuan jangka panjang. Mereka sangat bertanggung jawab dan dapat diandalkan.'
    },
    aquarius: {
        nama: 'Aquarius',
        tanggal: '20 Januari - 18 Februari',
        elemen: 'Udara 💨',
        planet: 'Uranus ⚡',
        sifat: 'Inovatif, independen, humanis, unik, agak tertutup',
        kekuatan: 'Pemikir visioner, orisinil, adil, progresif',
        kelemahan: 'Emosi terpisah, emosional tak terduga, keras kepala',
        pasangan: 'Gemini, Libra, Sagittarius',
        deskripsi: 'Aquarius adalah pemikir visioner yang unik dan peduli pada kemanusiaan. Mereka tidak takut menjadi berbeda dari orang lain.'
    },
    pisces: {
        nama: 'Pisces',
        tanggal: '19 Februari - 20 Maret',
        elemen: 'Air 🌊',
        planet: 'Neptunus 🔱',
        sifat: 'Empatis, imajinatif, artistik, lembut, idealis',
        kekuatan: 'Penuh kasih, intuisi tinggi, penyayang, artistik',
        kelemahan: 'Mudah dipengaruhi, suka melarikan diri dari realita',
        pasangan: 'Cancer, Scorpio, Taurus',
        deskripsi: 'Pisces adalah jiwa yang sangat peka dan imajinatif. Mereka memiliki rasa empati mendalam dan seni kreatif yang tinggi.'
    }
};

async function handler(m, context = {}) {
    try {
        const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

        if (!query) {
            let listText = `╭┈❀ *INFORMASI ZODIAK*\n`;
            listText += `┃ ◦ Silakan masukkan nama zodiak yang ingin dicari.\n`;
            listText += `┃ ◦ contoh: *.zodiakinfo aries*\n`;
            listText += `┃ ◦ Daftar Zodiak:\n`;
            Object.keys(zodiakData).forEach(key => {
                listText += `┃   • ${zodiakData[key].nama} (${zodiakData[key].tanggal})\n`;
            });
            listText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(listText);
        }

        const z = zodiakData[query];
        if (!z) {
            let notFound = `╭┈❀ *ZODIAK TIDAK DITEMUK*\n`;
            notFound += `┃ ◦ Zodiak *${query}* tidak ada dalam daftar.\n`;
            notFound += `┃ ◦ Pilihan: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.\n`;
            notFound += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(notFound);
        }

        let replyText = `╭┈❀ *INFO ZODIAK - ${z.nama.toUpperCase()}*\n`;
        replyText += `┃ ◦ Rentang Tanggal: ${z.tanggal}\n`;
        replyText += `┃ ◦ Elemen: ${z.elemen}\n`;
        replyText += `┃ ◦ Planet Pelindung: ${z.planet}\n`;
        replyText += `┃ ◦ Sifat Karakter: ${z.sifat}\n`;
        replyText += `┃ ◦ Kelebihan: ${z.kekuatan}\n`;
        replyText += `┃ ◦ Kelemahan: ${z.kelemahan}\n`;
        replyText += `┃ ◦ Pasangan Cocok: ${z.pasangan}\n`;
        replyText += `┃ ◦ Deskripsi: ${z.deskripsi}\n`;
        replyText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        await m.reply(replyText);
    } catch (err) {
        let errText = `╭┈❀ *ERROR ZODIAK INFO*\n`;
        errText += `┃ ◦ Terjadi kesalahan saat memproses informasi zodiak.\n`;
        errText += `┃ ◦ Pesan: ${err.message || err}\n`;
        errText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        await m.reply(errText);
    }
}

export { pluginConfig as config, handler };

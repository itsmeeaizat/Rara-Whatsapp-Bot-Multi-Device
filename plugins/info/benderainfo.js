// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'benderainfo',
    alias: ['bendera', 'flaginfo', 'maknabendera'],
    category: 'info',
    description: 'Informasi arti dan makna simbol warna bendera negara-negara di dunia',
    usage: '.benderainfo <nama negara>',
    example: '.benderainfo Indonesia',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const benderaDatabase = [
    {
        key: 'indonesia',
        negara: 'Indonesia 🇮🇩',
        sebutan: 'Sang Saka Merah Putih',
        merah: 'Keberanian, raga, dan darah pahlawan perjuangan',
        putih: 'Kesucian, kebenaran, niat murni, dan jiwa manusia',
        sejarah: 'Terinspirasi dari panji Kerajaan Majapahit abad ke-13 yang memiliki warna merah dan putih.',
        tambahan: 'Pertama kali dikibarkan secara resmi saat Proklamasi Kemerdekaan 17 Agustus 1945.'
    },
    {
        key: 'malaysia',
        negara: 'Malaysia 🇲🇾',
        sebutan: 'Jalur Gemilang',
        merah: 'Keberanian menghadapi berbagai cabaran',
        putih: 'Kesucian hati dan keikhlasan rakyat',
        biru: 'Perpaduan rakyat yang berbilang kaum',
        kuning: 'Warna Diraja Raja-Raja Melayu',
        lambang: 'Bulan sabit (Islam) & Bintang 14 bucu (Persekutuan 13 negeri + Wilayah Persekutuan)',
        sejarah: 'Pertama kali dikibarkan pada 16 September 1963.'
    },
    {
        key: 'singapura',
        negara: 'Singapura 🇸🇬',
        sebutan: 'National Flag of Singapore',
        merah: 'Persaudaraan universal dan kesaksamaan manusia',
        putih: 'Kesucian dan kebaikan yang abadi',
        lambang: 'Bulan sabit (Negara muda yang sedang naik) & 5 Bintang (Demokrasi, Keamanan, Kemajuan, Keadilan, Kesaksamaan)',
        sejarah: 'Diadopsi pada 3 Desember 1959 saat Singapura mendapat pemerintahan sendiri.'
    },
    {
        key: 'jepang',
        negara: 'Jepang 🇯🇵',
        sebutan: 'Nisshōki / Hinomaru (Lingkaran Matahari)',
        putih: 'Kejujuran, kesucian, dan kedamaian',
        merah: 'Matahari terbit (simbol kemakmuran dan energi)',
        sejarah: 'Jepang dikenal sebagai "Negeri Matahari Terbit". Bendera Hinomaru secara resmi disahkan pada tahun 1999.'
    },
    {
        key: 'korea selatan',
        negara: 'Korea Selatan 🇰🇷',
        sebutan: 'Taegeukgi',
        putih: 'Kedamaian, kebersihan, dan kesucian bangsa Korea',
        lambang: 'Lingkaran Taegeuk (Yin & Yang - keseimbangan alam) dan 4 Trigram (Langit, Bumi, Air, Api)',
        sejarah: 'Pertama kali dirancang pada tahun 1882 oleh Raja Gojong dari Dinasti Joseon.'
    },
    {
        key: 'amerika serikat',
        negara: 'Amerika Serikat 🇺🇸',
        sebutan: 'The Stars and Stripes / Old Glory',
        merah: 'Keberanian dan ketahanan',
        putih: 'Kesucian dan kepolosan',
        biru: 'Kewaspadaan, ketekunan, dan keadilan',
        garis: '13 garis horizontal melambangkan 13 koloni awal',
        bintang: '50 bintang putih melambangkan 50 negara bagian saat ini',
        sejarah: 'Pertama kali diperkenalkan pada tahun 1777.'
    },
    {
        key: 'inggris',
        negara: 'Inggris / Britania Raya 🇬🇧',
        sebutan: 'Union Jack / Union Flag',
        lambang: 'Gabungan 3 salib pelindung: Salib St. George (Inggris), Salib St. Andrew (Skotlandia), dan Salib St. Patrick (Irlandia Utara).',
        sejarah: 'Dirancang pertama kali pada 1606 setelah penyatuan mahkota Inggris dan Skotlandia.'
    },
    {
        key: 'jerman',
        negara: 'Jerman 🇩🇪',
        sebutan: 'Bundesflagge',
        hitam: 'Kegelapan perbudakan dan masa lalu',
        merah: 'Perjuangan berdarah demi kebebasan',
        kuning: 'Cahaya emas kemerdekaan dan masa depan',
        sejarah: 'Warna ini berasal dari seragam tentara sukarelawan Lützow Free Corps pada Perang Napoleon (1813).'
    },
    {
        key: 'prancis',
        negara: 'Prancis 🇫🇷',
        sebutan: 'Drapeau Tricolore',
        biru: 'Kebebasan (Liberté) dan kota Paris',
        putih: 'Kesucian, monarki, dan keadilan',
        merah: 'Persaudaraan (Fraternité) dan keberanian rakyat',
        sejarah: 'Lahir saat Revolusi Prancis pada tahun 1789.'
    },
    {
        key: 'arab saudi',
        negara: 'Arab Saudi 🇸🇦',
        sebutan: 'Rāyat al-Islām',
        hijau: 'Warna tradisional Islam dan kemakmuran',
        tulisan: 'Kalimat Syahadat "Lā ilāha illallāh Muḥammadur rasūlullāh"',
        pedang: 'Simbol Keadilan dan ketegasan Raja Abdulaziz Al Saud',
        sejarah: 'Bendera ini tidak pernah dikibarkan setengah tiang karena memuat kalimat syahadat.'
    },
    {
        key: 'palestina',
        negara: 'Palestina 🇵🇸',
        sebutan: 'Bendera Pembebasan Palestina',
        hitam: 'Dinasti Abbasiyah',
        putih: 'Dinasti Umayyah',
        hijau: 'Dinasti Fatimiyah',
        merah: 'Dinasti Hashemite dan darah pahlawan perjuangan',
        sejarah: 'Dirancang pada Pemberontakan Arab 1916 melawan Kesultanan Utsmaniyah.'
    },
    {
        key: 'brasil',
        negara: 'Brasil 🇧🇷',
        sebutan: 'A Auriverde',
        hijau: 'Hutan hujan Amazon yang subur dan dinasti Braganza',
        kuning: 'Kekayaan mineral dan emas Brasil',
        biru: 'Langit malam Rio de Janeiro saat Proklamasi Republik (15 Nov 1889)',
        tulisan: '"Ordem e Progresso" (Ketertiban dan Kemajuan)',
        bintang: '27 bintang melambangkan 26 negara bagian + 1 Distrik Federal'
    },
    {
        key: 'australia',
        negara: 'Australia 🇦🇺',
        sebutan: 'Australian National Flag',
        biru: 'Latar biru melambangkan benua yang dikelilingi lautan',
        unionjack: 'Hubungan sejarah dengan Britania Raya',
        bintangbesar: 'Bintang Persemakmuran 7 bucu (6 negara bagian + wilayah)',
        bintangkecil: 'Rasi bintang Salib Selatan (Southern Cross)'
    },
    {
        key: 'india',
        negara: 'India 🇮🇳',
        sebutan: 'Tiranga (Tiga Warna)',
        oranye: 'Keberanian dan pengorbanan',
        putih: 'Kedamaian, kejujuran, dan kebenaran',
        hijau: 'Kemakmuran, kepercayaan, dan kesuburan',
        roda: 'Roda Ashoka Chakra 24 jari-jari (kemajuan dan hukum kebenaran Dharma)'
    },
    {
        key: 'china',
        negara: 'China 🇨🇳',
        sebutan: 'Wǔ Xīng Hóng Qí (Bendera Merah Lima Bintang)',
        merah: 'Revolusi komunis rakyat China',
        bintangbesar: 'Partai Komunis China (CPC)',
        bintangkecil: '4 kelas sosial rakyat yang bersatu (Pekerja, Petani, Borjuis Kecil, Kapitalis Nasional)'
    },
    {
        key: 'italia',
        negara: 'Italia 🇮🇹',
        sebutan: 'Il Tricolore',
        hijau: 'Dataran dan perbukitan Italia yang hijau',
        putih: 'Salju Pegunungan Alpen dan kesucian',
        merah: 'Darah perjuangan unifikasi Italia (Risorgimento)'
    },
    {
        key: 'spanyol',
        negara: 'Spanyol 🇪🇸',
        sebutan: 'La Rojigualda',
        merah: 'Keberanian dan vitalitas',
        kuning: 'Kekayaan dan sinar matahari Spanyol',
        lambang: 'Lambang Kerajaan Spanyol dan Pilar Herkules dengan semboyan "Plus Ultra"'
    },
    {
        key: 'kanada',
        negara: 'Kanada 🇨🇦',
        sebutan: 'Maple Leaf Flag / L\'Unijambiste',
        merah: 'Pengorbanan tentara Kanada pada Perang Dunia I',
        putih: 'Wilayah utara Kanada yang bersalju',
        lambang: 'Daun Mapel merah 11 poin sebagai simbol kebudayaan dan alam Kanada'
    },
    {
        key: 'belanda',
        negara: 'Belanda 🇳🇱',
        sebutan: 'Statenvlag',
        merah: 'Keberanian rakyat Belanda',
        putih: 'Kedamaian dan kesucian',
        biru: 'Keteguhan dan kesetiaan pada negara',
        sejarah: 'Dahulu warna merahnya adalah oranye (Prinsenvlag) kehormatan Willem van Oranje.'
    },
    {
        key: 'rusia',
        negara: 'Rusia 🇷🇺',
        sebutan: 'Trikolor Rusia',
        putih: 'Kedamaian, kesucian, dan kesempurnaan',
        biru: 'Kesetiaan, iman, dan keteguhan',
        merah: 'Keberanian, cinta, dan kekuatan bangsa Rusia'
    },
    {
        key: 'mesir',
        negara: 'Mesir 🇪🇬',
        sebutan: 'Bendera Mesir',
        merah: 'Masa sebelum Revolusi 1952 dan pengorbanan rakyat',
        putih: 'Revolusi tanpa pertumpahan darah yang mengakhiri monarki',
        hitam: 'Akhir dari penjajahan dan penindasan Inggris',
        lambang: 'Elang Saladin berwarna emas di tengah bendera'
    },
    {
        key: 'argentina',
        negara: 'Argentina 🇦🇷',
        sebutan: 'Bandera Oficial de Ceremonia',
        birumuda: 'Langit cerah dan kebebasan',
        putih: 'Perak dan kesucian (Argentina berasal dari kata "Argentum" - Perak)',
        lambang: 'Matahari Mei (Sol de Mayo) simbol kemerdekaan dari Kekaisaran Spanyol'
    },
    {
        key: 'turki',
        negara: 'Turki 🇹🇷',
        sebutan: 'Al Bayrak (Bendera Merah)',
        merah: 'Darah pahlawan Perang Kemerdekaan Turki',
        lambang: 'Bulan Sabit dan Bintang putih melambangkan sejarah Islam dan keagungan bangsa Turki'
    },
    {
        key: 'meksiko',
        negara: 'Meksiko 🇲🇽',
        sebutan: 'Bandera de México',
        hijau: 'Harapan dan gerakan kemerdekaan',
        putih: 'Persatuan dan kesucian agama',
        merah: 'Darah pahlawan nasional',
        lambang: 'Elang Aztek memakan ular di atas pohon kaktus di tengah bendera'
    },
    {
        key: 'thailand',
        negara: 'Thailand 🇹🇭',
        sebutan: 'Thong Trairong (Bendera Tiga Warna)',
        merah: 'Bangsa dan darah rakyat',
        putih: 'Agama Buddha (kesucian)',
        biru: 'Institusi Kerajaan Thailand'
    }
];

async function handler(m, context = {}) {
    try {
        const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

        if (!query) {
            let listText = `╭┈❀ *INFORMASI BENDERA NEGARA*\n`;
            listText += `┃ ◦ Masukkan nama negara yang ingin diketahui makna benderanya.\n`;
            listText += `┃ ◦ Contoh: *.benderainfo Indonesia*\n`;
            listText += `┃ ◦ Daftar Negara Tersedia:\n`;
            benderaDatabase.forEach((b, idx) => {
                listText += `┃   ${idx + 1}. ${b.negara}\n`;
            });
            listText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(listText);
        }

        const match = benderaDatabase.find(b =>
            b.key === query ||
            b.negara.toLowerCase().includes(query)
        );

        if (!match) {
            let notFound = `╭┈❀ *NEGARA TIDAK DITEMUK*\n`;
            notFound += `┃ ◦ Data bendera untuk *${query}* belum tersedia dalam database.\n`;
            notFound += `┃ ◦ Coba nama negara lain seperti: Indonesia, Malaysia, Jepang, Palestina, Jerman, Amerika Serikat.\n`;
            notFound += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return await m.reply(notFound);
        }

        let replyText = `╭┈❀ *MAKNA BENDERA - ${match.negara.toUpperCase()}*\n`;
        if (match.sebutan) replyText += `┃ ◦ Julukan Bendera: ${match.sebutan}\n`;
        if (match.merah) replyText += `┃ ◦ Merah: ${match.merah}\n`;
        if (match.putih) replyText += `┃ ◦ Putih: ${match.putih}\n`;
        if (match.biru) replyText += `┃ ◦ Biru: ${match.biru}\n`;
        if (match.birumuda) replyText += `┃ ◦ Biru Muda: ${match.birumuda}\n`;
        if (match.kuning) replyText += `┃ ◦ Kuning/Emas: ${match.kuning}\n`;
        if (match.hijau) replyText += `┃ ◦ Hijau: ${match.hijau}\n`;
        if (match.hitam) replyText += `┃ ◦ Hitam: ${match.hitam}\n`;
        if (match.oranye) replyText += `┃ ◦ Oranye: ${match.oranye}\n`;
        if (match.garis) replyText += `┃ ◦ Garis/Polis: ${match.garis}\n`;
        if (match.bintang) replyText += `┃ ◦ Simbol Bintang: ${match.bintang}\n`;
        if (match.lambang) replyText += `┃ ◦ Lambang / Emblem: ${match.lambang}\n`;
        if (match.tulisan) replyText += `┃ ◦ Teks Semboyan: ${match.tulisan}\n`;
        if (match.sejarah) replyText += `┃ ◦ Sejarah Singkat: ${match.sejarah}\n`;
        if (match.tambahan) replyText += `┃ ◦ Catatan: ${match.tambahan}\n`;
        replyText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

        await m.reply(replyText);
    } catch (err) {
        let errText = `╭┈❀ *ERROR BENDERA INFO*\n`;
        errText += `┃ ◦ Terjadi kesalahan saat membaca data bendera.\n`;
        errText += `┃ ◦ Pesan: ${err.message || err}\n`;
        errText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        await m.reply(errText);
    }
}

export { pluginConfig as config, handler };

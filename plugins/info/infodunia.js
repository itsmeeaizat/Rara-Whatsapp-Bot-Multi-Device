// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'infodunia',
    alias: ['countryinfo', 'infonegara', 'worldinfo'],
    category: 'info',
    description: 'Informasi profil, statistik, dan fakta negara-negara di dunia',
    usage: '.infodunia <nama negara>',
    example: '.infodunia Jepang',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const countries = [
    {
        nama: "Indonesia",
        bendera: "🇮🇩",
        ibukota: "Nusantara / Jakarta",
        benua: "Asia Tenggara",
        populasi: "278 Juta Jiwa",
        bahasa: "Bahasa Indonesia",
        mataUang: "Rupiah (IDR)",
        ikon: "Candi Borobudur, Monas, Komodo",
        fakta: "Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau."
    },
    {
        nama: "Jepang",
        bendera: "🇯🇵",
        ibukota: "Tokyo",
        benua: "Asia Timur",
        populasi: "125 Juta Jiwa",
        bahasa: "Jepang",
        mataUang: "Yen (JPY)",
        ikon: "Gunung Fuji, Tokoh Anime, Sakura",
        fakta: "Memiliki rata-rata angka harapan hidup tertinggi di dunia."
    },
    {
        nama: "Arab Saudi",
        bendera: "🇸🇦",
        ibukota: "Riyadh",
        benua: "Timur Tengah / Asia Barat",
        populasi: "36 Juta Jiwa",
        bahasa: "Arab",
        mataUang: "Riyal (SAR)",
        ikon: "Ka'bah di Makkah, Masjid Nabawi",
        fakta: "Pusat ziarah terbesar umat Islam dunia di Makkah dan Madinah."
    },
    {
        nama: "Palestina",
        bendera: "🇵🇸",
        ibukota: "Yerusalem (Al-Quds)",
        benua: "Timur Tengah",
        populasi: "5.4 Juta Jiwa",
        bahasa: "Arab",
        mataUang: "Shekel / Dinar / Dolar",
        ikon: "Masjid Al-Aqsa, Kubah Shakhrah",
        fakta: "Memiliki warisan sejarah keagamaan tua bagi tiga agama samawi."
    },
    {
        nama: "Amerika Serikat",
        bendera: "🇺🇸",
        ibukota: "Washington D.C.",
        benua: "Amerika Utara",
        populasi: "335 Juta Jiwa",
        bahasa: "Inggris",
        mataUang: "Dolar AS (USD)",
        ikon: "Patung Liberty, Grand Canyon, Hollywood",
        fakta: "Memiliki ekonomi terbesar di dunia berdasarkan PDB nominal."
    },
    {
        nama: "Jerman",
        bendera: "🇩🇪",
        ibukota: "Berlin",
        benua: "Eropa Barat",
        populasi: "84 Juta Jiwa",
        bahasa: "Jerman",
        mataUang: "Euro (EUR)",
        ikon: "Gerbang Brandenburg, Kastil Neuschwanstein",
        fakta: "Pelopor industri otomotif kelas dunia seperti Mercedes-Benz dan BMW."
    },
    {
        nama: "Inggris",
        bendera: "🇬🇧",
        ibukota: "London",
        benua: "Eropa Barat",
        populasi: "67 Juta Jiwa",
        bahasa: "Inggris",
        mataUang: "Poundsterling (GBP)",
        ikon: "Big Ben, Istana Buckingham, London Eye",
        fakta: "Rumah bagi Liga Utama Inggris (Premier League) dan bahasa internasional utama."
    },
    {
        nama: "Prancis",
        bendera: "🇫🇷",
        ibukota: "Paris",
        benua: "Eropa Barat",
        populasi: "68 Juta Jiwa",
        bahasa: "Prancis",
        mataUang: "Euro (EUR)",
        ikon: "Menara Eiffel, Museum Louvre",
        fakta: "Negara paling banyak dikunjungi wisatawan asing di seluruh dunia."
    },
    {
        nama: "Korea Selatan",
        bendera: "🇰🇷",
        ibukota: "Seoul",
        benua: "Asia Timur",
        populasi: "51 Juta Jiwa",
        bahasa: "Korea",
        mataUang: "Won (KRW)",
        ikon: "N Seoul Tower, Istana Gyeongbokgung, K-Pop",
        fakta: "Pusat industri teknologi canggih dan budaya pop hallyu global."
    },
    {
        nama: "Turki",
        bendera: "🇹🇷",
        ibukota: "Ankara",
        benua: "Eurasia (Eropa & Asia)",
        populasi: "85 Juta Jiwa",
        bahasa: "Turki",
        mataUang: "Lira Turki (TRY)",
        ikon: "Hagia Sophia, Balon Udara Cappadocia",
        fakta: "Kota terbesarnya, Istanbul, berada di dua benua sekaligus."
    },
    {
        nama: "Mesir",
        bendera: "🇪🇬",
        ibukota: "Kairo",
        benua: "Afrika Utara",
        populasi: "110 Juta Jiwa",
        bahasa: "Arab",
        mataUang: "Pound Mesir (EGP)",
        ikon: "Piramida Giza, Patung Sphinx, Sungai Nil",
        fakta: "Memiliki salah satu peradaban tertua yang tercatat di sejarah manusia."
    },
    {
        nama: "Brasil",
        bendera: "🇧🇷",
        ibukota: "Brasilia",
        benua: "Amerika Selatan",
        populasi: "215 Juta Jiwa",
        bahasa: "Portugis",
        mataUang: "Real Brasil (BRL)",
        ikon: "Patung Kristus Penebus, Hutan Amazon",
        fakta: "Pemegang rekor gelar juara Piala Dunia FIFA terbanyak (5 kali)."
    },
    {
        nama: "Rusia",
        bendera: "🇷🇺",
        ibukota: "Moskow",
        benua: "Eurasia",
        populasi: "144 Juta Jiwa",
        bahasa: "Rusia",
        mataUang: "Ruble (RUB)",
        ikon: "Kremlin, Katedral St. Basil",
        fakta: "Negara terluas di dunia yang mencakup 1/8 luas daratan bumi."
    },
    {
        nama: "China",
        bendera: "🇨🇳",
        ibukota: "Beijing",
        benua: "Asia Timur",
        populasi: "1.4 Miliar Jiwa",
        bahasa: "Mandarin",
        mataUang: "Yuan / Renminbi (CNY)",
        ikon: "Tembok Besar China, Kota Terlarang",
        fakta: "Memiliki struktur bangunan terpanjang di dunia yaitu Tembok Besar China."
    },
    {
        nama: "India",
        bendera: "🇮🇳",
        ibukota: "New Delhi",
        benua: "Asia Selatan",
        populasi: "1.42 Miliar Jiwa",
        bahasa: "Hindi & Inggris",
        mataUang: "Rupee India (INR)",
        ikon: "Taj Mahal, Sungai Gangga",
        fakta: "Negara dengan jumlah penduduk terbanyak di dunia saat ini."
    },
    {
        nama: "Australia",
        bendera: "🇦🇺",
        ibukota: "Canberra",
        benua: "Australia / Oceania",
        populasi: "26 Juta Jiwa",
        bahasa: "Inggris",
        mataUang: "Dolar Australia (AUD)",
        ikon: "Sydney Opera House, Kanguru, Koala",
        fakta: "Satu-satunya negara yang juga sekaligus sebuah benua penuh."
    }
];

async function handler(m, context = {}) {
    const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

    if (!query) {
        let listText = `╭┈❀ *PROFIL NEGARA DUNIA*\n`;
        listText += `┃ ◦ 📌 Gunakan: .infodunia <nama negara>\n`;
        listText += `┃ ◦ 🌐 Daftar negara tersedia:\n`;
        countries.forEach((c) => {
            listText += `┃ ◦ ${c.bendera} *${c.nama}* (Ibu kota: ${c.ibukota})\n`;
        });
        listText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return await m.reply(listText);
    }

    const found = countries.find(c => c.nama.toLowerCase().includes(query) || c.ibukota.toLowerCase().includes(query));

    if (!found) {
        let errText = `╭┈❀ *PROFIL NEGARA DUNIA*\n`;
        errText += `┃ ◦ ⚠️ Negara "${query}" tidak ditemukan dalam database.\n`;
        errText += `┃ ◦ 💡 Contoh pencarian: .infodunia Jepang, .infodunia Arab Saudi\n`;
        errText += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return await m.reply(errText);
    }

    let text = `╭┈❀ *PROFIL NEGARA DUNIA*\n`;
    text += `┃ ◦ ${found.bendera} Negara: *${found.nama}*\n`;
    text += `┃ ◦ 🏛️ Ibu Kota: ${found.ibukota}\n`;
    text += `┃ ◦ 🌍 Benua: ${found.benua}\n`;
    text += `┃ ◦ 👥 Estimasi Populasi: ${found.populasi}\n`;
    text += `┃ ◦ 🗣️ Bahasa Resmi: ${found.bahasa}\n`;
    text += `┃ ◦ 💵 Mata Uang: ${found.mataUang}\n`;
    text += `┃ ◦ 🏙️ Ikon Utama: ${found.ikon}\n`;
    text += `┃ ◦ 💡 Fakta Singkat: ${found.fakta}\n`;
    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

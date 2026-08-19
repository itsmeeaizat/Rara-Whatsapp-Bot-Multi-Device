// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'harinasional',
    alias: ['haripenting', 'dayindonesia', 'peringatannasional'],
    category: 'info',
    description: 'Daftar hari nasional dan peringatan penting di Indonesia',
    usage: '.harinasional [bulan]',
    example: '.harinasional Agustus',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const nationalDays = [
    { tanggal: "1 Januari", nama: "Tahun Baru Masehi", bulan: "januari" },
    { tanggal: "25 Januari", nama: "Hari Gizi dan Makanan Nasional", bulan: "januari" },
    { tanggal: "9 Februari", nama: "Hari Pers Nasional (HPN)", bulan: "februari" },
    { tanggal: "21 Februari", nama: "Hari Peduli Sampah Nasional", bulan: "februari" },
    { tanggal: "9 Maret", nama: "Hari Musik Nasional", bulan: "maret" },
    { tanggal: "30 Maret", nama: "Hari Film Nasional", bulan: "maret" },
    { tanggal: "1 April", nama: "Hari Penyiaran Nasional", bulan: "april" },
    { tanggal: "21 April", nama: "Hari Kartini", bulan: "april" },
    { tanggal: "22 April", nama: "Hari Bumi", bulan: "april" },
    { tanggal: "1 Mei", nama: "Hari Buruh Internasional (May Day)", bulan: "mei" },
    { tanggal: "2 Mei", nama: "Hari Pendidikan Nasional (Hardiknas)", bulan: "mei" },
    { tanggal: "20 Mei", nama: "Hari Kebangkitan Nasional (Harkitnas)", bulan: "mei" },
    { tanggal: "1 Juni", nama: "Hari Lahir Pancasila", bulan: "juni" },
    { tanggal: "24 Juni", nama: "Hari Bidan Nasional", bulan: "juni" },
    { tanggal: "1 Juli", nama: "Hari Bhayangkara (Kepolisian)", bulan: "juli" },
    { tanggal: "22 Juli", nama: "Hari Kejaksaan Nasional", bulan: "juli" },
    { tanggal: "23 Juli", nama: "Hari Anak Nasional", bulan: "juli" },
    { tanggal: "17 Agustus", nama: "Hari Proklamasi Kemerdekaan RI", bulan: "agustus" },
    { tanggal: "18 Agustus", nama: "Hari Konstitusi Republik Indonesia", bulan: "agustus" },
    { tanggal: "1 September", nama: "Hari Polisi Wanita (Polwan)", bulan: "september" },
    { tanggal: "9 September", nama: "Hari Olahraga Nasional (HAORNAS)", bulan: "september" },
    { tanggal: "28 September", nama: "Hari Kereta Api Nasional", bulan: "september" },
    { tanggal: "30 September", nama: "Hari Peringatan G30S/PKI", bulan: "september" },
    { tanggal: "1 Oktober", nama: "Hari Kesaktian Pancasila", bulan: "oktober" },
    { tanggal: "2 Oktober", nama: "Hari Batik Nasional", bulan: "oktober" },
    { tanggal: "5 Oktober", nama: "Hari Tentara Nasional Indonesia (TNI)", bulan: "oktober" },
    { tanggal: "28 Oktober", nama: "Hari Sumpah Pemuda", bulan: "oktober" },
    { tanggal: "10 November", nama: "Hari Pahlawan", bulan: "november" },
    { tanggal: "12 November", nama: "Hari Kesehatan Nasional", bulan: "november" },
    { tanggal: "25 November", nama: "Hari Guru Nasional (PGRI)", bulan: "november" },
    { tanggal: "1 Desember", nama: "Hari AIDS Sedunia", bulan: "desember" },
    { tanggal: "12 Desember", nama: "Hari Belanja Online Nasional (Harbolnas)", bulan: "desember" },
    { tanggal: "22 Desember", nama: "Hari Ibu Nasional", bulan: "desember" }
];

async function handler(m, context = {}) {
    const query = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim().toLowerCase();

    let filtered = nationalDays;
    let subtitle = "Semua Hari Penting";

    if (query) {
        const matching = nationalDays.filter(d => d.bulan.includes(query) || d.tanggal.toLowerCase().includes(query) || d.nama.toLowerCase().includes(query));
        if (matching.length > 0) {
            filtered = matching;
            subtitle = `Kategori / Filter: "${query}"`;
        }
    }

    let text = `╭┈❀ *HARI NASIONAL DAN PERINGATAN INDONESIA*\n`;
    text += `┃ ◦ 📌 Filter: ${subtitle}\n`;
    text += `┃ ◦ 📊 Total Ditemukan: ${filtered.length} Hari Peringatan\n`;
    
    filtered.slice(0, 25).forEach((item) => {
        text += `┃ ◦ 📅 *${item.tanggal}*: ${item.nama}\n`;
    });

    if (filtered.length > 25) {
        text += `┃ ◦ 💡 _(Terdapat ${filtered.length - 25} hari nasional lainnya, gunakan filter bulan untuk spesifik)_\n`;
    }

    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

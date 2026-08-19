// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'fakta',
    alias: ['faktaunik', 'fact', 'facts'],
    category: 'fun',
    description: 'Menampilkan fakta unik dan menarik secara acak',
    usage: '.fakta',
    example: '.fakta',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const facts = [
    "Jantung paus biru sangat besar hingga seorang manusia bisa berenang melalui pembuluh darahnya.",
    "Semut tidak pernah tidur dan mereka tidak memiliki paru-paru.",
    "Madu adalah satu-satunya makanan yang tidak akan pernah basi.",
    "Pisang secara biologis termasuk dalam kategori buah buni (berry), sedangkan stroberi bukan.",
    "Gurita memiliki tiga jantung dan darah berwarna biru.",
    "Sidik lidah manusia unik dan berbeda-beda, sama seperti sidik jari.",
    "Kangguru tidak bisa berjalan mundur.",
    "Ayam adalah kerabat terdekat dari Tyrannosaurus Rex yang masih hidup.",
    "Air laut mengandung garam yang cukup untuk melapisi seluruh daratan Bumi setinggi 150 meter.",
    "Venus adalah satu-satunya planet di tata surya yang berputar searah jarum jam.",
    "Awan akumulonimbus rata-rata memiliki berat sekitar 500.000 kilogram.",
    "Manusia berbagi sekitar 50% DNA mereka dengan pisang.",
    "Burung kolibri adalah satu-satunya burung yang bisa terbang mundur.",
    "Kucing memiliki 32 otot di setiap telinganya.",
    "Cokelat pernah digunakan sebagai mata uang oleh suku Maya dan Aztek.",
    "Kupu-kupu mengecap rasa makanan menggunakan kakinya.",
    "Suara bebek tidak memiliki gema dan tidak ada yang tahu mengapa.",
    "Jerapah tidak memiliki tali suara.",
    "Hiu sudah ada di Bumi lebih lama daripada keberadaan pohon.",
    "Di Jepang ada lebih dari 5.000 mesin penjual otomatis yang menjual berbagai barang unik.",
    "Lumba-lumba tidur dengan satu mata terbuka.",
    "Gajah adalah satu-satunya mamalia yang tidak bisa melompat.",
    "Salju di Mars berwarna merah muda karena debu atmosfernya.",
    "Terdapat lebih banyak bintang di alam semesta daripada butiran pasir di seluruh pantai di Bumi.",
    "Mata burung unta lebih besar daripada otaknya.",
    "Stroberi adalah satu-satunya buah yang bijinya ada di luar.",
    "Bayi manusia lahir tanpa tempurung lutut, baru berkembang di usia 2-6 tahun.",
    "Warna asli flamingo sebenarnya putih abu-abu, warna merah muda berasal dari makanan mereka.",
    "Rata-rata manusia menghabiskan waktu sekitar 6 bulan hidupnya menunggu lampu merah.",
    "Bumi sebenarnya tidak benar-benar bulat sempurna, melainkan agak pepat di kutubnya.",
    "Penguin memilih pasangan seumur hidup dan melamar dengan memberikan batu kerikil.",
    "Tulang manusia empat kali lebih kuat daripada beton dengan volume yang sama.",
    "Gigitan nyamuk hanya dilakukan oleh nyamuk betina untuk nutrisi telurnya.",
    "Buaya tidak bisa menjulurkan lidahnya.",
    "Kura-kura bisa bernapas melalui pantatnya saat berhibernasi.",
    "Air panas bisa membeku lebih cepat daripada air dingin (efek Mpemba).",
    "Otak manusia menghasilkan daya listrik sekitar 12-25 watt saat terjaga.",
    "Kancil (Cherrotain) adalah salah satu mamalia terkecil yang memiliki taring.",
    "Kucing spend 70% dari hidupnya untuk tidur.",
    "Nama asli Bank Indonesia pada masa penjajahan Belanda adalah De Javasche Bank.",
    "Bahasa Indonesia adalah bahasa paling populer ke-4 di WordPress.",
    "Komodo hanya ditemukan secara alami di Indonesia.",
    "Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau.",
    "Danau Toba di Sumatera Utara adalah salah satu danau vulkanik terbesar di dunia.",
    "Satu jam di Bumi sama dengan 7 tahun di dekat lubang hitam supermasif.",
    "Rata-rata awan bergerak dengan kecepatan 60 km/jam.",
    "Zebra memiliki garis-garis unik yang berfungsi sebagai pengusir lalat dan serangga.",
    "Suara petir dapat mencapai suhu sekitar 30.000 derajat Celsius, 5 kali lebih panas dari permukaan Matahari.",
    "Semut bisa mengangkat beban hingga 50 kali berat tubuhnya sendiri.",
    "Hidung dan telinga manusia adalah organ yang tidak pernah berhenti tumbuh sepanjang hidup.",
    "Katak bisa membeku saat musim dingin dan hidup kembali di musim semi.",
    "Bintang laut tidak memiliki otak dan darah."
];

async function handler(m) {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    const response = `╭┈❀ *FAKTA UNIK*\n┃ ◦ ${fact}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

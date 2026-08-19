// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'faktaunik',
    alias: ['fakta', 'fact', 'randomfact', 'infounik'],
    category: 'info',
    description: 'Menampilkan kumpulan fakta unik dan menarik dari seluruh dunia',
    usage: '.faktaunik [nomor]',
    example: '.faktaunik',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

const factsList = [
    "Jantung udang terletak di dalam kepalanya.",
    "Kecoa bisa hidup beberapa minggu tanpa kepala sebelum akhirnya mati karena kelaparan.",
    "Lidah jerapah panjangnya bisa mencapai 45 hingga 50 centimeter.",
    "Madu tidak pernah kedaluwarsa. Madu murni berusia 3.000 tahun di makam Firaun masih layak dimakan.",
    "Lumba-lumba tidur dengan satu mata tetap terbuka dan setengah otaknya tetap sadar.",
    "Mata burung unta lebih besar daripada otaknya.",
    "Kucing memiliki 32 otot di setiap telinganya.",
    "Kuning telur flaminggo secara alami berwarna pink karena diet udang dan ganggang.",
    "Setiap manusia memiliki pola sidik lidah yang unik, persis seperti sidik jari.",
    "Air kelapa dapat digunakan sebagai pengganti plasma darah saat keadaan darurat.",
    "Kuda laut jantan adalah satu-satunya hewan jantan di dunia yang bisa melahirkan anak.",
    "Gurita memiliki tiga jantung dan darah berwarna biru.",
    "Kupu-kupu mengecap rasa makanan menggunakan kaki mereka.",
    "Suara bebek tidak memiliki gema dan tidak ada yang tahu pasti alasannya.",
    "Ayam adalah kerabat terdekat Tyrannosaurus Rex yang masih hidup saat ini.",
    "Pisang secara biologis tergolong jenis buah beri, sedangkan stroberi bukanlah buah beri.",
    "Otak manusia menghasilkan daya listrik yang cukup untuk menyalakan bola lampu bohlam kecil.",
    "Segelas air yang kamu minum hari ini mungkin mengandung molekul air yang pernah diminum dinosaurus.",
    "Semut tidak pernah tidur dan tidak memiliki paru-paru.",
    "Di Venus, satu hari lebih lama daripada satu tahun di planet tersebut.",
    "Awan akumulonimbus rata-rata memiliki berat sekitar 500.000 kilogram atau setara 100 gajah.",
    "Bayi manusia lahir dengan 300 tulang, namun saat dewasa hanya menyisa 206 tulang.",
    "Hidung dan telinga manusia tidak pernah berhenti tumbuh sepanjang hidup.",
    "Ikan hiu sudah ada di bumi sebelum pohon pertama tumbuh.",
    "Paus biru adalah hewan terbesar yang pernah hidup di bumi, lebih besar dari dinosaurus manapun.",
    "Sidik jari koala sangat mirip dengan sidik jari manusia hingga bisa mengacaukan olah TKP kepolisian.",
    "Pohon bambu adalah tanaman dengan pertumbuhan tercepat di dunia, bisa tumbuh hingga 91 cm per hari.",
    "Ikan mas merah (goldfish) sebenarnya bisa mengingat hal hingga 3 bulan, bukan 3 detik.",
    "Terdapat lebih banyak bintang di alam semesta daripada jumlah butiran pasir di seluruh pantai di bumi.",
    "Matahari menyumbang 99,86% dari total massa di seluruh Tata Surya kita.",
    "Suara mengaum singa dapat terdengar hingga jarak 8 kilometer.",
    "Beruang kutub sebenarnya memiliki kulit berwarna hitam di balik bulu putihnya.",
    "Gajah adalah satu-satunya mamalia darat yang tidak bisa melompat.",
    "Semua zerapah memiliki pola bintik unik yang tidak pernah sama satu sama lain.",
    "Lalat rumah mendengung dalam nada kunci F (F key).",
    "Negara Islandia tidak memiliki populasi nyamuk sama sekali.",
    "Di Jepang ada lebih dari 5 juta mesin penjual otomatis (vending machine).",
    "Bumi berputar pada porosnya dengan kecepatan sekitar 1.670 kilometer per jam.",
    "Tulang manusia empat kali lebih kuat daripada beton dengan berat yang sama.",
    "Air terjun tertinggi di dunia adalah Angel Falls di Venezuela dengan ketinggian 979 meter.",
    "Salju berwarna pink bisa terjadi di wilayah kutub akibat ganggang chlamydomonas nivalis.",
    "Secara teori, jika kamu menggali lubang menembus bumi dan melompat, kamu butuh 42 menit sampai ke sisi lain.",
    "Penguin betina akan melamar penguin jantan memberikan batu kerikil paling mulus.",
    "Mata kucing dapat melihat dalam kegelapan hanya dengan seperenam cahaya yang dibutuhkan manusia.",
    "Satu-satunya huruf yang tidak ada di tabel periodik unsur kimia adalah huruf J dan Q.",
    "Buaya tidak bisa menjulurkan lidahnya keluar dari mulut mereka.",
    "Kadal horned lizard dapat menyemprotkan darah dari matanya sejauh 1,5 meter untuk bertahan dari pemangsa.",
    "Masa kehamilan gajah adalah yang terpanjang di antara mamalia darat, yaitu hampir 2 tahun (22 bulan).",
    "Di luar angkasa tidak ada suara sama sekali karena hampa udara.",
    "Gunung Olympus Mons di planet Mars memiliki tinggi 3 kali lipat dari Gunung Everest.",
    "Siput dapat tidur hingga 3 tahun berturut-turut tanpa terbangun."
];

async function handler(m, context = {}) {
    const rawInput = (m.text || context.text || (context.args && context.args.join(' ')) || '').trim();
    let index = parseInt(rawInput);

    if (isNaN(index) || index < 1 || index > factsList.length) {
        index = Math.floor(Math.random() * factsList.length) + 1;
    }

    const selectedFact = factsList[index - 1];

    let text = `╭┈❀ *FAKTA UNIK DUNIA*\n`;
    text += `┃ ◦ 💡 *Fakta Unik #${index} dari ${factsList.length}*\n`;
    text += `┃ ◦ 📜 "${selectedFact}"\n`;
    text += `┃ ◦ 📌 _Ketik .faktaunik untuk fakta acak lainnya!_\n`;
    text += `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(text);
}

export { pluginConfig as config, handler };

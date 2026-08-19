// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'pantun',
    alias: ['pantunn', 'pantunlucu'],
    category: 'fun',
    description: 'Menampilkan pantun Indonesia secara acak',
    usage: '.pantun',
    example: '.pantun',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const pantuns = [
    [
        "Jalan-jalan ke kota Blitar,",
        "Jangan lupa membeli sukun.",
        "Jika kamu ingin jadi pintar,",
        "Belajarlah dengan tekun."
    ],
    [
        "Makan nasi lauknya ikan,",
        "Minumnya es teh manis rasa.",
        "Kebaikan harus kita sebarkan,",
        "Agar hidup bahagia senantiasa."
    ],
    [
        "Pergi ke pasar beli pepaya,",
        "Pasar ramai banyak pembeli.",
        "Jika ingin menjadi kaya,",
        "Hematlah uang serta rezeki."
    ],
    [
        "Buah cempedak di luar pagar,",
        "Ambil galah tolong jolokkan.",
        "Saya budak baru belajar,",
        "Kalau salah tolong tunjukkan."
    ],
    [
        "Bunga mawar bunga melati,",
        "Harum semerbak di pagi hari.",
        "Jadilah anak yang baik hati,",
        "Pasti disayang ke mana pergi."
    ],
    [
        "Berakit-rakit ke hulu,",
        "Berenang-renang ke tepian.",
        "Bersakit-sakit dahulu,",
        "Bersenang-senang kemudian."
    ],
    [
        "Pohon mangga berbuah lebat,",
        "Dipetik satu rasanya manis.",
        "Jika kamu mengaku sahabat,",
        "Jangan biarkan aku menangis."
    ],
    [
        "Ada kucing menangkap tikus,",
        "Lari kencang ke balik lemari.",
        "Niat belajar haruslah tulus,",
        "Masa depan cerah menanti."
    ],
    [
        "Beli baju berwarna merah,",
        "Dipakai indah saat pesta.",
        "Jangan mudah merasa menyerah,",
        "Sebelum tercapai cita-cita."
    ],
    [
        "Burung merpati terbang tinggi,",
        "Hinggap sebentar di dahan jati.",
        "Bila berjanji harus ditepati,",
        "Agar tidak melukai hati."
    ],
    [
        "Pergi berkemah membawa tenda,",
        "Pasang tenda di dekat telaga.",
        "Hormati selalu orang tua,",
        "Agar hidup mendapat surga."
    ],
    [
        "Makan pisang goreng di warung Pak Amat,",
        "Rasanya gurih nikmat sekali.",
        "Utamakan selalu sikap hormat,",
        "Budi pekerti dijaga rapi."
    ],
    [
        "Anak ayam turun sepuluh,",
        "Mati satu tinggal delapan.",
        "Tuntutlah ilmu bersungguh-sungguh,",
        "Untuk bekal di masa depan."
    ],
    [
        "Ke Semarang membeli jamu,",
        "Minum jamu di atas bangku.",
        "Sungguh manis senyumanmu,",
        "Membuat bergetar hatiku."
    ],
    [
        "Beli mangga manis rasanya,",
        "Makan buah di bawah pohon.",
        "Jika ada kata yang salah,",
        "Maafkan saya tulus memohon."
    ],
    [
        "Bunga melati di tepi jalan,",
        "Dipetik gadis berwajah ayu.",
        "Masa muda jangan disia-siakan,",
        "Agar tua tidak menyesal selalu."
    ],
    [
        "Pagi hari menyeduh kopi,",
        "Minum kopi sambil membaca.",
        "Bantu orang tanpa pamrih,",
        "Pasti mulia di mata dunia."
    ],
    [
        "Pergi ke pantai melihat ombak,",
        "Angin berhembus terasa dingin.",
        "Pikirlah dulu sebelum bertindak,",
        "Jangan menuruti hawa nafsu angin."
    ],
    [
        "Buah rambutan buah manggis,",
        "Beli banyak di pasar Minggu.",
        "Adik tersenyum jangan menangis,",
        "Kakak datang membawa kue baru."
    ],
    [
        "Lompat tinggi si katak hijau,",
        "Masuk ke dalam kolam teratai.",
        "Hati tenang tak perlu galau,",
        "Semua masalah pasti selesai."
    ],
    [
        "Pohon kelapa tumbuh tinggi,",
        "Daunnya melambai ditiup angin.",
        "Jangan lupa bersedekah rezeki,",
        "Kepada orang yang membutuhkan ingin."
    ],
    [
        "Pergi ke hutan mencari kayu,",
        "Dapat kayu dibuat kursi.",
        "Orang jujur selalu dipercaya selalu,",
        "Hidupnya tenteram penuh rezeki."
    ],
    [
        "Si mamat makan ketan,",
        "Makan ketan di rumah Pak RT.",
        "Kalau kamu mengaku jantan,",
        "Ayo berani maju ke depan me."
    ],
    [
        "Terbang tinggi si burung elang,",
        "Mencari makan ke padang luas.",
        "Rasa rindu tak kunjung hilang,",
        "Sebelum bertemu berwajah puas."
    ],
    [
        "Kapal berlayar di tengah lautan,",
        "Nakhoda gagah memegang kemudi.",
        "Persahabatan erat penuh kehangatan,",
        "Akan dikenang sampai mati."
    ],
    [
        "Beli es krim rasa cokelat,",
        "Dimakan bersama teman-teman.",
        "Ingatlah untuk selalu sholat,",
        "Agar hati tenang aman tenteram."
    ],
    [
        "Menanam bunga di dalam pot,",
        "Disiram air setiap pagi.",
        "Jangan suka bicara repot,",
        "Bila menolong tulus dari hati."
    ],
    [
        "Ikan koki renang di akuarium,",
        "Warnanya indah dipandang mata.",
        "Senyum manis penyebar senyum,",
        "Penawar duka bagi sesama."
    ],
    [
        "Buah nangka buah durian,",
        "Aromanya harum menggoda selera.",
        "Jaga selalu kerukunan tetanggaan,",
        "Hidup damai sejahtera bersama."
    ],
    [
        "Si Unyil suka nonton wayang,",
        "Nonton wayang bersama kakeknya.",
        "Siapa yang suka kasih sayang,",
        "Pasti dicintai oleh sesamanya."
    ],
    [
        "Layang-layang terbang ke awan,",
        "Putus benang jatuh ke taman.",
        "Mari kawan jaga persaudaraan,",
        "Saling mengasihi sesama teman."
    ]
];

async function handler(m) {
    const lines = pantuns[Math.floor(Math.random() * pantuns.length)];
    const content = lines.map(line => `┃ ◦ ${line}`).join('\n');
    const response = `╭┈❀ *PANTUN*\n${content}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'katabijak',
    alias: ['bijak', 'quotes', 'wisewords'],
    category: 'fun',
    description: 'Menampilkan kata-kata bijak motivasi secara acak',
    usage: '.katabijak',
    example: '.katabijak',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const quotes = [
    "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan Anda dapat mengubah dunia. - Nelson Mandela",
    "Kegagalan adalah bumbu yang memberi kenikmatan pada keberhasilan. - Truman Capote",
    "Orang yang tak pernah membuat kesalahan adalah orang yang tak pernah mencoba sesuatu yang baru. - Albert Einstein",
    "Cara terbaik untuk memprediksi masa depan adalah dengan mengukirnya hari ini. - Abraham Lincoln",
    "Jangan menunggu kesempatan datang, ciptakanlah kesempatan itu sendiri.",
    "Bermimpilah setinggi langit. Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang. - Soekarno",
    "Pengetahuan tidak akan berguna jika tidak diamalkan dalam kehidupan sehari-hari.",
    "Perjalanan ribuan mil selalu dimulai dengan satu langkah pertama. - Lao Tzu",
    "Proses yang sulit sering kali membawa kita ke destinasi yang indah.",
    "Hidup ini sederhana, tapi kita yang membuatnya rumit. - Konfusius",
    "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan.",
    "Jangan bandingkan prosesmu dengan orang lain, setiap bunga mekar pada waktunya.",
    "Waktu adalah aset terbaikmu, jangan habiskan untuk mengkhawatirkan hal yang tak bisa kau ubah.",
    "Disiplin adalah jembatan antara cita-cita dan pencapaian.",
    "Terkadang kamu harus melewati hari-hari gelap untuk bisa menghargai indahnya cahaya.",
    "Bukan seberapa cepat kamu melangkah, tetapi sejauh mana kamu bertahan tanpa berhenti.",
    "Kunci dari kesuksesan adalah fokus pada tujuan, bukan pada hambatan.",
    "Tuhan tidak menurunkan cobaan melebihi batas kemampuan hamba-Nya.",
    "Ubah pikiranmu dan kamu akan mengubah duniamu. - Norman Vincent Peale",
    "Kebaikan kecil yang kamu lakukan hari ini bisa menjadi kebahagiaan besar bagi orang lain.",
    "Jangan pernah menyesali hari yang telah berlalu, jadikan itu pelajaran untuk besok.",
    "Kesabaran bukanlah kemampuan untuk menunggu, tetapi bagaimana sikap kita saat menunggu.",
    "Setiap impian besar dimulai dari seorang pemimpi.",
    "Orang sukses belajar dari kesalahan dan mencoba lagi dengan cara yang berbeda.",
    "Keberanian bukan berarti tidak memiliki rasa takut, tetapi kemampuan untuk menaklukkannya.",
    "Syukuri apa yang kamu miliki hari ini sebelum kamu meratapi apa yang hilang besok.",
    "Lakukan apa yang kamu bisa, dengan apa yang kamu miliki, di mana pun kamu berada.",
    "Kemauan untuk menang adalah penting, tetapi kemauan untuk bersiap adalah hal utama.",
    "Jangan biarkan pendapat orang lain membungkam suara hatimu sendiri.",
    "Tersenyumlah, karena senyummu bisa jadi adalah penawar duka bagi orang lain.",
    "Siapapun yang berhenti belajar adalah orang tua, tak peduli umurnya 20 atau 80 tahun.",
    "Masa depan milik mereka yang percaya pada keindahan impian mereka. - Eleanor Roosevelt",
    "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.",
    "Satu-satunya batasan untuk meraih masa depan adalah keraguan kita hari ini.",
    "Dunia ini seperti cermin: bersikaplah ramah, maka ia akan memantulkan keramahan.",
    "Menjadi diri sendiri di dunia yang terus berusaha mengubahmu adalah pencapaian terbesar.",
    "Hati yang penuh rasa syukur adalah magnet bagi keajaiban.",
    "Rasa sakit dalam berjuang hanyalah sementara, namun penyesalan akibat menyerah berlangsung selamanya.",
    "Jangan hanya melihat jam; lakukan apa yang dilakukannya. Teruslah bergerak.",
    "Kemenangan sejati adalah saat kamu berhasil mengalahkan ego dan emosimu sendiri.",
    "Ilmu tanpa agama adalah lumpuh, agama tanpa ilmu adalah buta. - Albert Einstein",
    "Ketakutan terbesarmu adalah gerbang menuju potensi terbesarmu.",
    "Orang hebat tidak lahir dari kemudahan, melainkan ditempa oleh badai kehidupan.",
    "Setiap pagi kita lahir kembali. Apa yang kita lakukan hari ini adalah yang paling penting.",
    "Tak ada yang tidak mungkin bagi mereka yang mau mencoba.",
    "Semakin tinggi pohon, semakin kencang angin yang menerpanya. Tetaplah berakar kuat.",
    "Tetaplah rendah hati saat berada di puncak, tetaplah kuat saat berada di dasar.",
    "Keyakinan adalah langkah pertama bahkan ketika kamu tidak melihat seluruh tangga.",
    "Sesuatu yang besar tidak pernah dihasilkan dari zona nyaman.",
    "Jadilah perubahan yang ingin kamu lihat di dunia ini. - Mahatma Gandhi",
    "Belajarlah dari masa lalu, hiduplah untuk hari ini, berharaplah untuk esok hari."
];

async function handler(m) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const response = `╭┈❀ *KATA BIJAK*\n┃ ◦ "${quote}"\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

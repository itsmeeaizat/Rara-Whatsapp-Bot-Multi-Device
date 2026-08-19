// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'katakece',
    alias: ['kece', 'coolquotes', 'skena'],
    category: 'fun',
    description: 'Menampilkan kata-kata kece dan keren secara acak',
    usage: '.katakece',
    example: '.katakece',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const quotes = [
    "Gaya boleh santai, tapi mosi dan standar hidup harus tetap berkelas.",
    "Bukan sok jual mahal, cuma tahu kualitas diri yang nggak murah.",
    "Bicara secukupnya, tunjukkan hasilnya lewat karya.",
    "Jangan ubah standar hanya agar kamu diterima dalam lingkungan yang salah.",
    "Tetap tenang di tengah kebisingan adalah bentuk kekuatan tertinggi.",
    "Saya tidak bersaing dengan siapapun, fokus saya hanya melampaui diri saya kemarin.",
    "Karakter terbentuk saat tidak ada yang melihatmu bekerja keras.",
    "Lebih baik menjadi versi asli yang dibenci daripada tiruan yang disukai.",
    "Biar mereka meremehkan hari ini, esok mereka yang akan bertepuk tangan.",
    "Berpakaian rapi, berpikiran jernih, dan melangkah tanpa ragu.",
    "Jangan jelaskan dirimu kepada siapapun, karena yang menyukaimu tak butuh itu.",
    "Tersenyum bukan berarti lemah, itu tanda kamu terlalu kuat untuk ditumbangkan.",
    "Kerja keras dalam diam, biarkan kesuksesan yang bersuara nyaring.",
    "Fokus pada mimpi, bukan pada drama kehidupan orang lain.",
    "Aku tidak kehilangan teman, aku hanya menyaring siapa yang pantas bertahan.",
    "Standar saya tinggi bukan karena saya sombong, tapi karena saya tahu proses saya mahal.",
    "Dunia terlalu luas jika hanya dihabiskan untuk meratapi hal yang tak penting.",
    "Aura positif tidak pernah bisa dipalsukan oleh siapapun.",
    "Melangkah pasti, lawan rasa ragu, jadilah penguasa atas takdirmu sendiri.",
    "Gaya itu pilihan, tapi sikap berkelas adalah keharusan.",
    "Orang berkelas tidak sibuk membuktikan apa-apa pada siapapun.",
    "Berkarya tanpa tapi, sukses tanpa nanti.",
    "Jangan pernah meminta maaf karena menjadi dirimu yang berani berbeda.",
    "Level tertinggi dari percaya diri adalah tidak butuh validasi dari siapapun.",
    "Kegagalan bagi saya hanyalah jeda sebelum kemenangan yang lebih besar.",
    "Hidup ini tentang bagaimana kamu menghadapi masalah, bukan menghindari masalah.",
    "Banyak bicara bikin lelah, lebih baik buktikan dengan langkah nyata.",
    "Kamu diciptakan untuk menjadi pemenang, bukan sekadar penonton di pinggir lapangan.",
    "Kece itu bukan soal baju mahal, tapi soal pola pikir yang dewasa.",
    "Di saat mereka ragu, aku tetap maju.",
    "Keheningan adalah jawaban terbaik untuk kritik yang tak berdasar.",
    "Tahu kapan harus diam, tahu kapan harus mengambil panggung utama.",
    "Mimpi besar butuh tekad baja, bukan sekadar kata-kata manis.",
    "Mereka bicara soal batasan, aku bicara soal menembus batas.",
    "Setiap langkahku adalah investasi untuk masa depan yang lebih cerah.",
    "Berani tampil beda adalah langkah awal dari sebuah kepemimpinan.",
    "Jadilah seperti berlian, bernilai tinggi dan sulit dihancurkan.",
    "Tenang, elegan, dan selalu punya kejutan dalam tindakan.",
    "Bukan soal seberapa cepat kamu sampai, tapi seberapa konsisten kamu berjalan.",
    "Kilas balik masa lalu cukup jadi pelajaran, pandangan tetap lurus ke depan.",
    "Satu-satunya batasan adalah pikiranmu sendiri. Dobrak dan melangkah!",
    "Rendah hati pada yang berilmu, tegas pada yang tak bersikap."
];

async function handler(m) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const response = `╭┈❀ *KATA KECE*\n┃ ◦ "${quote}"\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

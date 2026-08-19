// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'kataindah',
    alias: ['indah', 'aesthetic', 'puitis'],
    category: 'fun',
    description: 'Menampilkan kata-kata indah dan puitis secara acak',
    usage: '.kataindah',
    example: '.kataindah',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const quotes = [
    "Di antara miliaran bintang, ketenangan hatimulah yang paling terang memancar.",
    "Senja mengajarkan bahwa yang indah terkadang harus pergi untuk memberi jalan bagi keheningan.",
    "Setiap tetes embun di pagi hari membawa bisikan kehangatan dari harapan baru.",
    "Bicara lembut bagai kelopak bunga yang jatuh di atas permukaan air tenang.",
    "Kedamaian adalah saat kamu mampu berdamai dengan masa lalu dan mereluk hari ini.",
    "Ada keindahan tersembunyi dalam setiap rintik hujan yang menyapa bumi.",
    "Hati yang tulus adalah taman indah tempat bermukimnya kedamaian sejati.",
    "Rembulan malam ini menyinari jejak kenangan yang terukir manis di jiwa.",
    "Langkah kaki yang perlahan namun pasti akan sampai pada keabadian impian.",
    "Keindahan sejati tak memerlukan kata-kata mewah, ia cukup dirasakan oleh kedalaman jiwa.",
    "Jadilah seperti mentari pagi yang memberi kehangatan tanpa pernah meminta balasan.",
    "Di dalam keheningan, kita sering menemukan jawaban paling jujur tentang hidup.",
    "Setiap senyuman tulus adalah melodi indah yang menenangkan jiwa yang letih.",
    "Masa lalu adalah lukisan indah yang memberi wawasan pada lembar kanvas esok hari.",
    "Pelukan hangat dari alam selalu mampu menyembuhkan luka yang tak terlihat.",
    "Harmoni alam adalah puisi paling indah yang tak pernah berhenti dilantunkan.",
    "Bunga mekar tidak pernah terburu-buru, ia menikmati setiap detik proses pertumbuhannya.",
    "Cahaya fajar menyingsing bagai senyuman harapan yang memeluk dunia.",
    "Kesederhanaan adalah mahkota tercantik dari jiwa yang lapang.",
    "Dalam kerendahan hati, terdapat keagungan yang menyentuh setiap jiwa.",
    "Semilir angin sore membawa pesan damai bagi mereka yang mau mendengarkan.",
    "Bahasa kasih sayang adalah satu-satunya bahasa yang dipahami oleh seluruh alam.",
    "Jejak langkah di pasir pantai mungkin terhapus ombak, namun kenangannya abadi.",
    "Setiap kebaikan yang ditanam dengan tulus akan berbuah keindahan pada waktunya.",
    "Tataplah langit malam, dan biarkan keheningannya memeluk seluruh kelelahanmu.",
    "Kecantikan fisik hanya memanjakan mata, namun keindahan hati memikat jiwa selamanya.",
    "Cinta yang tulus adalah cahaya di tengah kegelapan malam yang dingin.",
    "Rintik hujan di jendela adalah tarian kecil dari alam untuk menyapa jiwamu.",
    "Kebahagiaan bukan tentang memiliki segalanya, melainkan menikmati setiap momen yang ada.",
    "Jiwa yang damai adalah magnet bagi kebaikan yang datang dari segala penjuru.",
    "Setiap detik kehidupan adalah anugerah indah yang patut kita syukuri.",
    "Tersenyumlah pada hari ini, karena esok akan menjadi cerita manis baru.",
    "Keindahan tak pernah berteriak untuk dilihat, ia memancar tenang dan elegan.",
    "Di tepi pantai keheningan, kita menemukan makna sejati dari keberadaan kita.",
    "Bintang-bintang adalah perhiasan langit yang mengingatkan kita akan kebesaran-Nya.",
    "Aroma tanah basah setelah hujan adalah wewangian paling menenangkan bagi jiwa.",
    "Tangan yang memberi kebaikan selalu memancarkan kehangatan yang tak pernah padam.",
    "Biarkan hatimu berkembang mekar seperti bunga liar yang tumbuh indah di padang rumput.",
    "Kelembutan kata-kata dapat meluluhkan hati yang terbuat dari batu sekalipun.",
    "Setiap terbitnya matahari adalah janji baru bahwa harapan selalu ada.",
    "Dunia ini adalah kanvas besar, dan hidupmu adalah karya seni yang sedang diukir.",
    "Malam yang sunyi memberi ruang bagi doa-doa tulus untuk melambung ke langit."
];

async function handler(m) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const response = `╭┈❀ *KATA INDAH*\n┃ ◦ "${quote}"\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

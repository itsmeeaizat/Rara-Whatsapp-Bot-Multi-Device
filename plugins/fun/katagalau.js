// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'katagalau',
    alias: ['galau', 'sadquotes', 'sedih'],
    category: 'fun',
    description: 'Menampilkan kata-kata galau dan sedih secara acak',
    usage: '.katagalau',
    example: '.katagalau',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const quotes = [
    "Yang paling menyakitkan dari berpisah adalah kenangan yang terus menolak untuk pergi.",
    "Aku mengira kita adalah kisah yang panjang, ternyata hanya sekadar singgah sementara.",
    "Terkadang, kamu harus pura-pura tersenyum agar tidak perlu menjelaskan mengapa hatimu terluka.",
    "Rasa sakit terhebat adalah mencintai seseorang yang tak pernah bisa kamu miliki.",
    "Hujan malam ini mengingatkanku pada setiap janji yang tak pernah kamu tepati.",
    "Kita dulu sedekat urat nadi, kini berubah sejauh mata memandang.",
    "Terima kasih pernah singgah, meski akhirnya kamu memilih berpaling.",
    "Lelah itu biasa, tapi lelah memperjuangkan seseorang yang tak peduli itu terasa menyiksa.",
    "Menunggu sesuatu yang tak pasti itu seperti menunggu hujan di tengah gurun pasir.",
    "Aku berjuang sendirian di hubungan yang seharusnya diperjuangkan berdua.",
    "Mungkin aku hanyalah opsi bagimu, padahal kamu adalah prioritasku.",
    "Bukan tidak bisa berpindah hati, hanya saja belum ada yang bisa menggantikan hadirmu.",
    "Lucu ya, yang dulu paling perhatian kini bertingkah seolah tak pernah kenal.",
    "Diamku bukan berarti tak merindu, aku hanya sadar diri siapakah aku bagimu.",
    "Ternyata memaafkan itu mudah, yang sulit adalah mengembalikan rasa percaya.",
    "Rindu ini seperti ombak di lautan, tak pernah berhenti menghantam dinding hatiku.",
    "Aku sudah terbiasa dengan sepi, tapi kehadiranmu dulu sempat membuatku lupa rasa sepi itu.",
    "Ternyata orang yang paling kita percaya bisa menjadi orang yang paling melukai.",
    "Hati ini tidak patah seketika, ia hancur perlahan oleh kekecewaan yang berulang.",
    "Senyuman di wajahku hanyalah topeng untuk menyembunyikan luka yang belum sembuh.",
    "Mencintai orang yang salah mengajarkanku cara menghargai diri sendiri dengan benar.",
    "Seharusnya aku sadar sejak awal bahwa sinyal manis dari mu bukan berarti kepastian.",
    "Aku menitipkan rindu pada angin, berharap ia membawanya ke pelukanmu yang jauh.",
    "Malam terlalu dingin untuk kenangan hangat yang kini tinggal sejarah.",
    "Beberapa orang memang ditakdirkan hadir dalam hidup kita, tapi tidak untuk tinggal.",
    "Mencoba melupakanmu terasa seperti berusaha mengingat seseorang yang belum pernah kutemui.",
    "Aku kehilangan diriku sendiri saat berusaha mempertahankanmu.",
    "Tangisan terkeras adalah tangisan tanpa suara yang jatuh di dalam hati.",
    "Penyesalan terbesarku adalah menganggapmu berbeda dari yang lain.",
    "Aku baik-baik saja, setidaknya itulah yang selalu kusingkatkan dalam kata 'gapapa'.",
    "Kenangan bersamamu adalah bagian tercantik sekaligus paling menyakitkan.",
    "Luka di fisik bisa sembuh, tapi luka di hati butuh waktu yang tak terbatas.",
    "Aku mengalah bukan karena kalah, tapi karena sadar posisiku tak lagi berharga.",
    "Sakit itu saat kita harus berpura-pura bahagia di depan orang yang mematahkan hati kita.",
    "Mungkin nanti, saat kamu senggang, kamu akan ingat pernah ada aku yang begitu tulus.",
    "Aku tak pernah menyesal mengenalmu, aku hanya menyesal terlalu cepat percaya.",
    "Langit malam ini gelap, seolah mengerti perasaan yang terasingkan.",
    "Sudah tak ada lagi harapan untuk kita, yang tersisa hanyalah bayangan masa lalu.",
    "Ternyata melepaskan itu lebih menyakitkan daripada bertahan dalam ketidakpastian.",
    "Semoga kamu bahagia dengan pilihanmu, meski bahagiamu tak lagi bersamaku.",
    "Bagian tersulit adalah harus melupakan seseorang yang pernah jadi alasan kita tersenyum.",
    "Hati ini cuma satu, dan kamu pernah meremukkannya hingga tak berbentuk lagi."
];

async function handler(m) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const response = `╭┈❀ *KATA GALAU*\n┃ ◦ "${quote}"\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

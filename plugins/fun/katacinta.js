// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'katacinta',
    alias: ['cinta', 'lovequotes', 'romantis'],
    category: 'fun',
    description: 'Menampilkan kata-kata cinta dan romantis secara acak',
    usage: '.katacinta',
    example: '.katacinta',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const quotes = [
    "Cinta bukan tentang mencari orang yang sempurna, melainkan melihat orang yang tak sempurna menjadi sempurna di matamu.",
    "Aku mencintaimu bukan hanya karena siapa dirimu, tetapi karena siapa aku ketika aku bersamamu.",
    "Dalam ribuan senyuman, senyumanmu yang selalu menjadi favoritku.",
    "Cinta sejati tidak pernah meminta untuk memiliki, ia hanya ingin melihat yang dicintai bahagia.",
    "Bila mencintaimu adalah sebuah kesalahan, maka aku tidak pernah ingin menjadi benar.",
    "Jarak hanyalah angka ketika dua hati saling menggenggam dalam doa.",
    "Setiap detik yang dihabiskan bersamamu terasa seperti keajaiban manis.",
    "Kamu adalah alasan mengapa mata ini selalu mencari dalam keramaian.",
    "Cinta yang tulus tidak akan pernah pudar, meski diterjang waktu dan badai kehidupan.",
    "Menemukanmu adalah takdir, menjadi temanmu adalah pilihan, tapi jatuh cinta padamu di luar kendaliku.",
    "Mungkin aku bukan cinta pertamamu, tapi aku ingin menjadi cinta terakhirmu.",
    "Dunia ini terlalu sepi tanpa hadirnya kehangatan senyummu.",
    "Cinta itu sederhana: kamu dan aku yang saling menguatkan dalam suka dan duka.",
    "Rumah bukan hanya sebuah bangunan, tetapi tempat di mana kamu berada.",
    "Bintang di langit boleh bersinar terang, namun matamu adalah cahaya yang menerangi hatiku.",
    "Aku memilihmu. Dan aku akan tetap memilihmu, berulang kali tanpa ragu.",
    "Cinta tidak terlihat dengan mata, melainkan dirasakan dengan hati.",
    "Terima kasih telah menjadi bagian tercantik dalam alur cerita hidupku.",
    "Bersamamu, waktu berjalan begitu cepat, namun kenangannya bertahan selamanya.",
    "Kamu adalah bait puisi terindah yang pernah dituliskan oleh takdir untukku.",
    "Cinta sejati tidak memiliki akhir yang bahagia, karena cinta sejati tidak pernah berakhir.",
    "Saat aku melihatmu, aku melihat sisa masa depanku di matamu.",
    "Sederhana saja, aku bahagia ketika kamu tersenyum karena aku.",
    "Bukan karena tak ada yang lain, tapi karena hatiku telah menetap padamu.",
    "Di antara jutaan bintang di alam semesta, kamu adalah kejora paling indah.",
    "Mencintaimu adalah hal termudah yang pernah aku lakukan dalam hidup.",
    "Cinta kita bagaikan angin, tidak bisa dilihat tetapi bisa dirasakan begitu dalam.",
    "Kehadiranmu mengubah hari yang biasa menjadi luar biasa manis.",
    "Tetaplah disampingku, karena tanpamu langkah ini terasa hilang arah.",
    "Genggam tanganku dan mari kita hadapi dunia ini bersama-sama.",
    "Mencintai adalah keahlianku, dan kamu adalah subjek favoritku.",
    "Suaramu adalah melodi paling menenangkan saat hatiku sedang gelisah.",
    "Aku tidak butuh dunia yang sempurna, aku hanya butuh kamu disampingku.",
    "Setiap kali aku memikirkan kebahagiaan, wajahmu yang pertama muncul.",
    "Cinta tidak pernah membedakan waktu dan tempat, ia tumbuh begitu saja di dalam hati.",
    "Bahagia itu sederhana: melihatmu sehat, tersenyum, dan tetap ada untukku.",
    "Saat bersamamu, aku merasa menjadi versi terbaik dari diriku sendiri.",
    "Mencintaimu seperti bernapas: tidak bisa aku hentikan begitu saja.",
    "Dua hati yang bersatu dalam doa tidak akan pernah terpisahkan oleh jarak.",
    "Semoga aku dan kamu selalu menjadi 'kita' yang saling menjaga hingga akhir.",
    "Kamu adalah tempat favoritku untuk pulang setelah hari yang panjang.",
    "Terkadang aku heran, bagaimana seseorang bisa begitu berarti hanya dalam sekejap."
];

async function handler(m) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const response = `╭┈❀ *KATA CINTA*\n┃ ◦ "${quote}"\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    await m.reply(response);
}

export { pluginConfig as config, handler };

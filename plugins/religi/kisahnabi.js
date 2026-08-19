// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'

const pluginConfig = {
    name: 'kisahnabi',
    alias: ['kisah-nabi', 'kisahprophet', '25nabi'],
    category: 'religi',
    description: 'Kisah 25 Nabi dan Rasul',
    usage: '.kisahnabi <nama nabi>',
    example: '.kisahnabi adam',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

const staticProphets = [
    { name: 'Adam', birth_year: '- (Manusia Pertama)', place: 'Surga / Bumi', story: 'Nabi Adam AS adalah manusia dan nabi pertama yang diciptakan Allah SWT dari tanah. Beliau tinggal di Surga bersama Hawa sebelum diturunkan ke Bumi setelah terperdaya oleh Iblis, lalu bertaubat dan diampuni oleh Allah SWT.' },
    { name: 'Idris', birth_year: '3500 SM', place: 'Babel (Irak) / Mesir', story: 'Nabi Idris AS dikenal dengan kecerdasan, ketrampilan menulis dengan pena, menjahit baju, serta menguasai ilmu perbintangan dan matematika. Beliau sangat tekun beribadah sehingga diangkat derajatnya oleh Allah SWT.' },
    { name: 'Nuh', birth_year: '3993 SM', place: 'Mesopotamia (Irak)', story: 'Nabi Nuh AS berdakwah selama 950 tahun dengan penuh kesabaran. Ketika kaumnya tetap membangkang, Allah memerintahkannya membuat bahtera raksasa yang menyelamatkan kaum beriman dari banjir bah dahsyat.' },
    { name: 'Hud', birth_year: '2400 SM', place: 'Al-Ahqaf (Yaman)', story: 'Nabi Hud AS diutus kepada Kaum Ad yang sombong dengan kekuatan fisik dan bangunan megah mereka. Karena menolak beriman, Allah menghancurkan mereka dengan angin topan yang sangat dingin selama 7 malam 8 hari.' },
    { name: 'Sholeh', birth_year: '2000 SM', place: 'Al-Hijr (Madain Saleh)', story: 'Nabi Sholeh AS diutus kepada Kaum Tsamud. Allah memberinya mukjizat berupa unta betina hamil yang keluar dari batu. Namun kaum Tsamud membunuh unta tersebut dan diazab dengan petir dahsyat.' },
    { name: 'Ibrahim', birth_year: '1997 SM', place: 'Ur (Irak) & Palestina', story: 'Nabi Ibrahim AS adalah Abul Anbiya (Bapak para Nabi). Beliau selamat dari kobaran api Raja Namrud, membangun Ka\'bah bersama Nabi Ismail AS, dan menguji ketakwaannya melalui perintah menyembelih putranya.' },
    { name: 'Luth', birth_year: '1950 SM', place: 'Sodom & Gomora (Yordania)', story: 'Nabi Luth AS diutus membimbing kaum Sodom yang melakukan maksiat sesama jenis. Kaum yang menolak beriman diazab dengan dijatuhkan tanah terbalik dan dihujani batu berapi.' },
    { name: 'Ismail', birth_year: '1911 SM', place: 'Makkah (Arab Saudi)', story: 'Nabi Ismail AS adalah putra Nabi Ibrahim AS dan Hajar. Beliau ikhlas dikurbankan sebelum diganti domba oleh Allah SWT. Dari keturunan beliau lahirlah Nabi Muhammad SAW.' },
    { name: 'Ishaq', birth_year: '1896 SM', place: 'Kanaan (Palestina)', story: 'Nabi Ishaq AS adalah putra Nabi Ibrahim AS dan Sarah. Beliau adalah hamba yang soleh dan pembawa risalah keimanan bagi kaum di wilayah Kanaan.' },
    { name: 'Ya\'qub', birth_year: '1837 SM', place: 'Kanaan & Mesir', story: 'Nabi Ya\'qub AS (Bani Israil) adalah putra Nabi Ishaq AS. Beliau dikaruniai 12 putra, termasuk Nabi Yusuf AS, dan mengajarkan ketabahan dalam menghadapi ujian berat.' },
    { name: 'Yusuf', birth_year: '1745 SM', place: 'Palestina & Mesir', story: 'Nabi Yusuf AS memiliki ketampanan luar biasa. Beliau dibuang saudara-saudaranya ke sumur, difitnah hingga dipenjara, lalu diangkat menjadi menteri keuangan Mesir berkat kemampuannya menafsirkan mimpi.' },
    { name: 'Ayyub', birth_year: '1540 SM', place: 'Hauran (Syam)', story: 'Nabi Ayyub AS dikenal sebagai lambang kesabaran. Beliau diuji dengan kehilangan kekayaan, anak-anak, dan menderita penyakit parah selama bertahun-tahun tanpa sedikit pun berkurang rasa syukurnya.' },
    { name: 'Syu\'aib', birth_year: '1600 SM', place: 'Madyan (Yordania)', story: 'Nabi Syu\'aib AS diutus kepada kaum Madyan yang curang dalam menimbang dan mengukur perdagangan. Kaum tersebut dihancurkan oleh guncangan gempa dan cuaca panas membakar.' },
    { name: 'Musa', birth_year: '1527 SM', place: 'Mesir & Madyan', story: 'Nabi Musa AS memimpin Bani Israil keluar dari kekejaman Firaun. Beliau dianugerahi mukjizat tongkat berubah menjadi ular dan membelah Laut Merah.' },
    { name: 'Harun', birth_year: '1530 SM', place: 'Mesir', story: 'Nabi Harun AS adalah kakak Nabi Musa AS yang dianugerahi tutur kata fasih. Beliau menjadi pendamping setia Musa AS dalam menghadapi Firaun.' },
    { name: 'Dzulkifli', birth_year: '1500 SM', place: 'Damaskus (Syam)', story: 'Nabi Dzulkifli AS adalah nabi yang sangat sabar, taat beribadah, dan adil dalam memimpin serta menjatuhkan hukum tanpa pernah marah.' },
    { name: 'Daud', birth_year: '1041 SM', place: 'Palestina / Yerusalem', story: 'Nabi Daud AS mengalahkan Jalut ketika masih muda, dianugerahi kitab Zabur, serta suara mulia yang membuat gunung dan burung ikut bertasbih dengannya.' },
    { name: 'Sulaiman', birth_year: '989 SM', place: 'Yerusalem (Palestina)', story: 'Nabi Sulaiman AS diberi kerajaan megah serta mukjizat memahami bahasa hewan dan menguasai bangsa jin serta angin.' },
    { name: 'Ilyas', birth_year: '910 SM', place: 'Baalbek (Lebanon)', story: 'Nabi Ilyas AS mengingatkan kaumnya yang menyembah berhala Baal. Ketika disembah berhala, Allah menurunkan kemarau panjang hingga mereka sadar.' },
    { name: 'Ilyasa', birth_year: '885 SM', place: 'Palestina / Syam', story: 'Nabi Ilyasa AS melanjutkan dakwah Nabi Ilyas AS menjaga ketauhidan kaumnya agar tidak kembali menyembah berhala.' },
    { name: 'Yunus', birth_year: '820 SM', place: 'Ninawa (Irak)', story: 'Nabi Yunus AS ditelan ikan paus setelah meninggalkan kaumnya yang ingkar. Di dalam perut ikan, beliau berdzikir memohon ampun hingga dikeluarkan dengan selamat.' },
    { name: 'Zakaria', birth_year: '100 SM', place: 'Palestina', story: 'Nabi Zakaria AS adalah pengasuh Maryam yang berdoa tanpa lelah hingga dikaruniai putra Nabi Yahya AS meski sudah berusia sangat lanjut.' },
    { name: 'Yahya', birth_year: '1 SM', place: 'Palestina', story: 'Nabi Yahya AS adalah putra Nabi Zakaria AS yang sejak kecil dianugerahi hikmah, kesucian, dan keberanian menegakkan kebenaran.' },
    { name: 'Isa', birth_year: '1 M', place: 'Baitul Maqdis (Palestina)', story: 'Nabi Isa AS lahir dari Perawan Maryam tanpa ayah. Beliau diberi kitab Injil dan mukjizat menyembuhkan penyakit serta menghidupkan orang mati atas izin Allah SWT.' },
    { name: 'Muhammad', birth_year: '571 M', place: 'Makkah & Madinah', story: 'Nabi Muhammad SAW adalah Nabi dan Rasul terakhir (Khatamun Nabiyyin). Beliau membawa risalah Islam bagi seluruh alam dan mukjizat terbesar Al-Qur\'an.' }
]

async function handler(m) {
    const query = m.args.join(' ').trim().toLowerCase();
    
    let prophetData = null;

    try {
        if (query) {
            const res = await axios.get('https://api.dikiotang.com/data/kisahnabi', { timeout: 4000 });
            if (res.data && Array.isArray(res.data)) {
                const found = res.data.find(p => p.name && p.name.toLowerCase().includes(query));
                if (found) {
                    prophetData = {
                        name: found.name,
                        birth_year: found.thn_kelahiran || found.birth_year || '-',
                        place: found.tmp || found.place || '-',
                        story: found.description || found.story || found.kisah || ''
                    };
                }
            }
        }
    } catch (e) {
        // Fallback to static data on API error/timeout
    }

    if (!prophetData) {
        if (!query) {
            prophetData = staticProphets[Math.floor(Math.random() * staticProphets.length)];
        } else {
            const found = staticProphets.find(p => p.name.toLowerCase().includes(query));
            if (found) {
                prophetData = found;
            } else {
                const available = staticProphets.map(p => p.name).join(', ');
                return m.reply(`╭┈❀ *KISAH NABI*\n┃ ◦ Nama nabi "${query}" tidak ditemukan.\n┃ ◦ \n┃ ◦ Daftar 25 Nabi:\n┃ ◦ ${available}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
            }
        }
    }

    let storyText = prophetData.story || 'Kisah tidak tersedia.';
    if (storyText.length > 900) {
        storyText = storyText.substring(0, 900) + '...';
    }

    const title = `KISAH NABI ${prophetData.name.toUpperCase()} AS`;
    const response = [
        `╭┈❀ *${title}*`,
        `┃ ◦ Nama: Nabi ${prophetData.name} AS`,
        `┃ ◦ Tahun Lahir: ${prophetData.birth_year}`,
        `┃ ◦ Tempat: ${prophetData.place}`,
        `┃ ◦ `,
        `┃ ◦ Kisah Ringkas:`,
        `┃ ◦ ${storyText.replace(/\n/g, '\n┃ ◦ ')}`,
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
    ].join('\n');

    await m.reply(response);
}

export { pluginConfig as config, handler }

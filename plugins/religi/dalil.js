// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'

const pluginConfig = {
    name: 'dalil',
    alias: ['dalil-alquran', 'dalil-hadits', 'caridalil'],
    category: 'religi',
    description: 'Pencarian dalil dan keutamaan syariat (Al-Qur\'an & Hadits)',
    usage: '.dalil <kata kunci>',
    example: '.dalil sabar',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const dalilDatabase = [
    { topic: 'Niat dan Keikhlasan', source: 'HR. Bukhari & Muslim', arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', translation: 'Sesungguhnya setiap amalan tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai apa yang ia niatkan.' },
    { topic: 'Kesabaran', source: 'QS. Al-Baqarah: 153', arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلاةِ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', translation: 'Wahai orang-orang yang beriman! Mohonlah pertolongan (kepada Allah) dengan sabar dan sholat. Sungguh, Allah beserta orang-orang yang sabar.' },
    { topic: 'Kewajiban Sholat', source: 'QS. An-Nisa: 103', arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا', translation: 'Sungguh, sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman.' },
    { topic: 'Sedekah', source: 'QS. Al-Baqarah: 261', arabic: 'مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ', translation: 'Perumpamaan orang yang menginfakkan mejelaskan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji.' },
    { topic: 'Menuntut Ilmu', source: 'HR. Ibnu Majah', arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ', translation: 'Menuntut ilmu itu wajib bagi setiap muslim.' },
    { topic: 'Berbakti Pada Orang Tua', source: 'QS. Al-Isra: 23', arabic: 'وَقَضَى رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا', translation: 'Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada kedua orang tua.' },
    { topic: 'Kejujuran', source: 'HR. Muslim', arabic: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ', translation: 'Hendaklah kalian berlaku jujur, karena kejujuran menuntun kepada kebaikan, dan kebaikan menuntun ke surga.' },
    { topic: 'Rasa Syukur', source: 'QS. Ibrahim: 7', arabic: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ وَلَئِنْ كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ', translation: 'Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu, tetapi jika kamu mengingkari, maka sungguh azab-Ku sangat pedih.' },
    { topic: 'Tawakal', source: 'QS. Ath-Thalaq: 3', arabic: 'وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', translation: 'Dan barangsiapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya.' },
    { topic: 'Taubat', source: 'QS. At-Tahrim: 8', arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَصُوحًا', translation: 'Wahai orang-orang yang beriman! Bertaubatlah kepada Allah dengan taubat yang semurni-murninya.' },
    { topic: 'Silaturahmi', source: 'HR. Bukhari & Muslim', arabic: 'مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ وَيُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ', translation: 'Barangsiapa ingin dilapangkan rezekinya dan dipanjangkan umurnya, hendaklah ia menyambung tali silaturahmi.' },
    { topic: 'Menjaga Lisan', source: 'HR. Bukhari & Muslim', arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', translation: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.' },
    { topic: 'Puasa Ramadhan', source: 'QS. Al-Baqarah: 183', arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ', translation: 'Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa.' },
    { topic: 'Zakat', source: 'QS. Al-Baqarah: 43', arabic: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ', translation: 'Dan laksanakanlah sholat, tunaikanlah zakat, dan rukuklah bersama orang-orang yang rukuk.' },
    { topic: 'Akhlak Mulia', source: 'HR. Tirmidzi', arabic: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا', translation: 'Sesungguhnya orang yang paling aku cintai di antara kalian dan paling dekat tempat duduknya denganku pada hari kiamat adalah yang paling baik akhlaknya.' },
    { topic: 'Dzikir Mengingat Allah', source: 'QS. Ar-Ra\'d: 28', arabic: 'أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.' },
    { topic: 'Kebersihan', source: 'HR. Muslim', arabic: 'الطَّهُورُ شَطْرُ الْإِيمَانِ', translation: 'Kebersihan itu sebagian dari iman.' },
    { topic: 'Larangan Sombong', source: 'HR. Muslim', arabic: 'لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ', translation: 'Tidak akan masuk surga seseorang yang di dalam hatinya terdapat kesombongan seberat biji dzarrah.' },
    { topic: 'Mendoakan Kebaikan Saudara', source: 'HR. Muslim', arabic: 'دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ', translation: 'Doa seorang muslim untuk saudaranya yang dilakukan secara sembunyi-sembunyi adalah mustajab.' },
    { topic: 'Menjaga Persaudaraan', source: 'QS. Al-Hujurat: 10', arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ', translation: 'Orang-orang beriman itu sesungguhnya bersaudara, sebab itu damaikanlah antara kedua saudaramu.' },
    { topic: 'Menjaga Pandangan', source: 'QS. An-Nur: 30', arabic: 'قُلْ لِلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ', translation: 'Katakanlah kepada laki-laki yang beriman, agar mereka menjaga pandangannya dan memelihara kemaluannya.' },
    { topic: 'Menghargai Waktu', source: 'QS. Al-\'Ashr: 1-3', arabic: 'وَالْعَصْرِ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ', translation: 'Demi masa, sungguh manusia berada dalam kerugian, kecuali orang-orang yang beriman dan mengerjakan kebajikan.' },
    { topic: 'Ingat Kematian', source: 'HR. Tirmidzi', arabic: 'أَكْثِرُوا ذِكْرَ هَاذِمِ اللَّذَّاتِ المَوْتَ', translation: 'Perbanyaklah mengingat pemutus kenikmatan, yaitu kematian.' },
    { topic: 'Husnudzon (Prasangka Baik)', source: 'HR. Bukhari & Muslim', arabic: 'أَنَا عِنْدَ ظَنِّ عَبْدِي بِي', translation: 'Aku (Allah) sesuai dengan persangkaan hamba-Ku kepada-Ku.' },
    { topic: 'Menebar Salam', source: 'HR. Muslim', arabic: 'أَفْشُوا السَّلَامَ بَيْنَكُمْ تَحَابُّوا', translation: 'Tebarkanlah salam di antara kalian, niscaya kalian akan saling mencintai.' },
    { topic: 'Amanah', source: 'HR. Bukhari', arabic: 'آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ', translation: 'Tanda orang munafik ada tiga: jika berkata dia berdusta, jika berjanji dia mengingkari, dan jika dipercaya dia berkhianat.' },
    { topic: 'Membaca Al-Qur\'an', source: 'HR. Muslim', arabic: 'اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ', translation: 'Bacalah Al-Qur\'an, karena ia akan datang pada hari kiamat sebagai pemberi syafaat bagi pembacanya.' },
    { topic: 'Memudahkan Urusan Orang Lain', source: 'HR. Muslim', arabic: 'وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ', translation: 'Barangsiapa memudahkan orang yang kesusahan, Allah akan memudahkan urusannya di dunia dan akhirat.' },
    { topic: 'Rida Allah pada Rida Orang Tua', source: 'HR. Tirmidzi', arabic: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدَيْنِ وَسَخَطُهُ فِي سَخَطِهِمَا', translation: 'Keridaan Allah tergantung pada keridaan kedua orang tua, dan kemurkaan-Nya tergantung pada kemurkaan keduanya.' },
    { topic: 'Istiqomah', source: 'HR. Muslim', arabic: 'قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ', translation: 'Katakanlah: "Aku beriman kepada Allah", kemudian istiqomahlah.' }
]

async function handler(m) {
    const query = m.args.join(' ').trim().toLowerCase();
    
    let result = null;

    if (query) {
        result = dalilDatabase.find(d => 
            d.topic.toLowerCase().includes(query) || 
            d.translation.toLowerCase().includes(query) ||
            d.source.toLowerCase().includes(query)
        );
    }

    if (!result) {
        if (query) {
            // Show available topics if query not matched
            const topics = dalilDatabase.map(d => d.topic).join('\n┃ ◦ • ');
            return m.reply(`╭┈❀ *DALIL ISLAMI*\n┃ ◦ Dalil untuk "${query}" tidak ditemukan.\n┃ ◦ \n┃ ◦ Topik Dalil Tersedia:\n┃ ◦ • ${topics}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
        }
        result = dalilDatabase[Math.floor(Math.random() * dalilDatabase.length)];
    }

    const title = `DALIL ISLAMI - ${result.topic.toUpperCase()}`;
    const response = [
        `╭┈❀ *${title}*`,
        `┃ ◦ Topik: ${result.topic}`,
        `┃ ◦ Sumber: ${result.source}`,
        `┃ ◦ `,
        `┃ ◦ Arab:`,
        `┃ ◦ ${result.arabic}`,
        `┃ ◦ `,
        `┃ ◦ Terjemahan:`,
        `┃ ◦ ${result.translation}`,
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
    ].join('\n');

    await m.reply(response);
}

export { pluginConfig as config, handler }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'

const pluginConfig = {
    name: 'doaharian',
    alias: ['doa', 'doadihari', 'kumpulandoa'],
    category: 'religi',
    description: 'Kumpulan Doa-doa Harian Islami',
    usage: '.doaharian [kata kunci]',
    example: '.doaharian makan',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const staticDoaList = [
    { title: 'Doa Sebelum Makan', arabic: 'اَللَّهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', latin: 'Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa \'adzaaban naar.', translation: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.' },
    { title: 'Doa Sesudah Makan', arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ', latin: 'Alhamdu lillahilladzii ath\'amanaa wa saqaanaa wa ja\'alanaa minal muslimiin.', translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami bagian dari orang-orang muslim.' },
    { title: 'Doa Sebelum Tidur', arabic: 'بِاسْمِكَ اللّهُمَّ اَحْيَا وَبِاسْمِكَ اَمُوْتُ', latin: 'Bismikallahumma ahyaa wa bismika amuut.', translation: 'Dengan menyebut nama-Mu ya Allah, aku hidup dan dengan menyebut nama-Mu aku mati.' },
    { title: 'Doa Bangun Tidur', arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ', latin: 'Alhamdu lillahilladzii ahyaanaa ba\'da maa amaatanaa wa ilaihin nusyuur.', translation: 'Segala puji bagi Allah yang telah menghidupkan kami kembali setelah mematikan kami, dan hanya kepada-Nya kami dibangkitkan.' },
    { title: 'Doa Masuk Masjid', arabic: 'اَللَّهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ', latin: 'Allahummaftah lii abwaaba rahmatik.', translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.' },
    { title: 'Doa Keluar Masjid', arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ', latin: 'Allahumma innii as\'aluka min fadhlik.', translation: 'Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.' },
    { title: 'Doa Untuk Kedua Orang Tua', arabic: 'رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا', latin: 'Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.', translation: 'Ya Rabb, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka berdua sebagaimana mereka telah merawatku sewaktu kecil.' },
    { title: 'Doa Memohon Ilmu Yang Bermanfaat', arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً', latin: 'Allahumma innii as\'aluka \'ilman naafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan.', translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amalan yang diterima.' },
    { title: 'Doa Selamat Dunia Akhirat', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', latin: 'Rabbanaa aatinaa fid dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa \'adzaaban naar.', translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka.' },
    { title: 'Doa Naik Kendaraan', arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ', latin: 'Subhaanalladzii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin wa innaa ilaa rabbinaa lamunqalibuun.', translation: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.' },
    { title: 'Doa Masuk Rumah', arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا', latin: 'Allahumma innii as\'aluka khairal maulaji wa khairal makhraji bismillahi walajnaa wa bismillahi kharajnaa.', translation: 'Ya Allah, aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar. Dengan nama Allah kami masuk dan dengan nama Allah kami keluar.' },
    { title: 'Doa Keluar Rumah', arabic: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ', latin: 'Bismillahi tawakkaltu \'alallahi laa haula wa laa quwwata illaa billaah.', translation: 'Dengan nama Allah, aku bertawakal kepada Allah, tidak ada daya dan upaya melainkan dengan pertolongan Allah.' },
    { title: 'Doa Bercermin', arabic: 'اَللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِيْ فَحَسِّنْ خُلُقِيْ', latin: 'Allahumma kamaa hassanta khalqii fahassin khuluqii.', translation: 'Ya Allah, sebagaimana Engkau telah memperbagus rupa fisikku, maka perbaguslah pula akhlak perilakuku.' },
    { title: 'Doa Sebelum Belajar', arabic: 'رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا', latin: 'Rabbi zidnii \'ilman warzuqnii fahmaan.', translation: 'Ya Rabb, tambahkanlah kepadaku ilmu dan berilah aku karunia untuk memahaminya.' }
]

async function handler(m) {
    const query = m.args.join(' ').trim().toLowerCase();
    let selectedDoa = null;

    try {
        const url = 'https://open-api.my.id/api/doa';
        const res = await axios.get(url, { timeout: 3000 });
        if (res.data && Array.isArray(res.data)) {
            if (query) {
                const found = res.data.find(d => (d.judul || d.nama || '').toLowerCase().includes(query));
                if (found) {
                    selectedDoa = {
                        title: found.judul || found.nama,
                        arabic: found.ar || found.arabic,
                        latin: found.latin || '',
                        translation: found.idn || found.terjemahan || found.arti
                    };
                }
            } else {
                const rand = res.data[Math.floor(Math.random() * res.data.length)];
                selectedDoa = {
                    title: rand.judul || rand.nama,
                    arabic: rand.ar || rand.arabic,
                    latin: rand.latin || '',
                    translation: rand.idn || rand.terjemahan || rand.arti
                };
            }
        }
    } catch (e) {
        // Fallback to static array
    }

    if (!selectedDoa) {
        if (!query) {
            selectedDoa = staticDoaList[Math.floor(Math.random() * staticDoaList.length)];
        } else {
            const found = staticDoaList.find(d => d.title.toLowerCase().includes(query));
            if (found) {
                selectedDoa = found;
            } else {
                selectedDoa = staticDoaList[Math.floor(Math.random() * staticDoaList.length)];
            }
        }
    }

    const title = `DOA HARIAN - ${selectedDoa.title.toUpperCase()}`;
    const response = [
        `╭┈❀ *${title}*`,
        `┃ ◦ Judul: ${selectedDoa.title}`,
        `┃ ◦ `,
        `┃ ◦ Arab:`,
        `┃ ◦ ${selectedDoa.arabic}`,
        `┃ ◦ `,
        `┃ ◦ Latin:`,
        `┃ ◦ ${selectedDoa.latin || '-'}`,
        `┃ ◦ `,
        `┃ ◦ Terjemahan:`,
        `┃ ◦ ${selectedDoa.translation}`,
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
    ].join('\n');

    await m.reply(response);
}

export { pluginConfig as config, handler }

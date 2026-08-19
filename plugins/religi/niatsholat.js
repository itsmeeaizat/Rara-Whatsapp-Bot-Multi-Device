// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import axios from 'axios'

const pluginConfig = {
    name: 'niatsholat',
    alias: ['niatshalat', 'niat-sholat', 'niatsolat'],
    category: 'religi',
    description: 'Niat bacaan sholat fardhu dan sunnah',
    usage: '.niatsholat <nama sholat>',
    example: '.niatsholat subuh',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const prayerDatabase = {
    subuh: {
        name: 'Sholat Subuh (2 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhas-subhi rok\'ataini mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    dzuhur: {
        name: 'Sholat Dzuhur (4 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhadz-dzuhri arba\'a roka\'aatin mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Dzuhur empat rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    ashar: {
        name: 'Sholat Ashar (4 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhal-\'ashri arba\'a roka\'aatin mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    maghrib: {
        name: 'Sholat Maghrib (3 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhal-maghribi tsalaatha roka\'aatin mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    isya: {
        name: 'Sholat Isya (4 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhal-\'isyaa-i arba\'a roka\'aatin mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    dhuha: {
        name: 'Sholat Dhuha (2 Rakaat)',
        arabic: 'أُصَلِّى سُنَّةَ الضُّحَى رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli sunnatad-dhuhaa rok\'ataini mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat sunnah Dhuha dua rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    tahajjud: {
        name: 'Sholat Tahajjud (2 Rakaat)',
        arabic: 'أُصَلِّى سُنَّةَ التَّهَجُّدِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli sunnatat-tahajjudi rok\'ataini mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat sunnah Tahajjud dua rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    witir: {
        name: 'Sholat Witir (1 Rakaat)',
        arabic: 'أُصَلِّى سُنَّةً مِنَ الْوِتْرِ رَكْعَةً مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
        latin: 'Usolli sunnatam minal witri rok\'atan mustaqbilal qiblati adaa-an lillahi ta\'aala.',
        translation: 'Aku berniat sholat sunnah Witir satu rakaat menghadap kiblat karena Allah Ta\'ala.'
    },
    jumat: {
        name: 'Sholat Jum\'at (2 Rakaat)',
        arabic: 'أُصَلِّى فَرْضَ الْجُمُعَةِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً مَأْمُوْمًا لِلَّهِ تَعَالَى',
        latin: 'Usolli fardhal jum\'ati rok\'ataini mustaqbilal qiblati adaa-an ma\'muuman lillahi ta\'aala.',
        translation: 'Aku berniat sholat fardhu Jum\'at dua rakaat menghadap kiblat sebagai makmum karena Allah Ta\'ala.'
    }
}

async function handler(m) {
    const query = m.args.join(' ').trim().toLowerCase();

    if (!query) {
        const available = Object.keys(prayerDatabase).map(k => k.toUpperCase()).join(', ');
        return m.reply(`╭┈❀ *NIAT SHOLAT*\n┃ ◦ Masukkan nama sholat!\n┃ ◦ Contoh: .niatsholat subuh\n┃ ◦ \n┃ ◦ Pilihan Sholat:\n┃ ◦ ${available}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
    }

    let p = prayerDatabase[query];

    if (!p) {
        const foundKey = Object.keys(prayerDatabase).find(k => k.includes(query) || query.includes(k));
        if (foundKey) {
            p = prayerDatabase[foundKey];
        }
    }

    if (!p) {
        const available = Object.keys(prayerDatabase).map(k => k.toUpperCase()).join(', ');
        return m.reply(`╭┈❀ *NIAT SHOLAT*\n┃ ◦ Sholat "${query}" tidak ditemukan.\n┃ ◦ \n┃ ◦ Pilihan Sholat:\n┃ ◦ ${available}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
    }

    const title = `NIAT ${p.name.toUpperCase()}`;
    const response = [
        `╭┈❀ *${title}*`,
        `┃ ◦ Sholat: ${p.name}`,
        `┃ ◦ `,
        `┃ ◦ Arab:`,
        `┃ ◦ ${p.arabic}`,
        `┃ ◦ `,
        `┃ ◦ Latin:`,
        `┃ ◦ ${p.latin}`,
        `┃ ◦ `,
        `┃ ◦ Terjemahan:`,
        `┃ ◦ ${p.translation}`,
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
    ].join('\n');

    await m.reply(response);
}

export { pluginConfig as config, handler }

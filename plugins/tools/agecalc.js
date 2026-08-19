// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'agecalc',
    alias: ['hitungumur', 'umur'],
    category: 'tools',
    description: 'Kalkulator Umur berdasarkan Tanggal Lahir',
    usage: '.agecalc <DD/MM/YYYY>',
    example: '.agecalc 15/08/1995',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

async function handler(m) {
    const text = (m.text || '').trim();

    if (!text) {
        return m.reply(
            `╭┈❀ *AGE CALCULATOR*\n` +
            `┃ ◦ Penggunaan: .agecalc <DD/MM/YYYY>\n` +
            `┃ ◦ Contoh: .agecalc 15/08/1995\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const parts = text.split(/[\/\-\.]/);
    if (parts.length < 3) {
        return m.reply(
            `╭┈❀ *AGE CALCULATOR*\n` +
            `┃ ◦ Format tanggal tidak valid! Gunakan DD/MM/YYYY\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);

    if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
    }

    const birthDate = new Date(year, month, day);
    const now = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > now) {
        return m.reply(
            `╭┈❀ *AGE CALCULATOR*\n` +
            `┃ ◦ Tanggal lahir tidak valid atau di masa depan!\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diffMs = now - birthDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

    const result = 
        `╭┈❀ *AGE CALCULATOR*\n` +
        `┃ ◦ Tanggal Lahir: ${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}\n` +
        `┃ ◦ Umur: ${years} tahun ${months} bulan ${days} hari\n` +
        `┃ ◦ Total Hari: ${totalDays} hari\n` +
        `┃ ◦ Ulang Tahun Berikutnya: ${daysToNextBirthday} hari lagi\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

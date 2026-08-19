// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'datediff',
    alias: ['selisihtanggal'],
    category: 'tools',
    description: 'Kalkulator Selisih Dua Tanggal',
    usage: '.datediff <date1> <date2> (DD/MM/YYYY)',
    example: '.datediff 01/01/2024 19/08/2026',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

function parseDateStr(str) {
    if (!str) return null;
    const parts = str.split(/[\/\-\.]/);
    if (parts.length < 3) return null;
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);
    if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
    }
    const d = new Date(year, month, day);
    return isNaN(d.getTime()) ? null : d;
}

async function handler(m) {
    const text = (m.text || '').trim();
    const args = text.split(/\s+/).filter(Boolean);

    if (args.length < 2) {
        return m.reply(
            `╭┈❀ *DATE DIFFERENCE CALCULATOR*\n` +
            `┃ ◦ Penggunaan: .datediff <tanggal1> <tanggal2>\n` +
            `┃ ◦ Format: DD/MM/YYYY\n` +
            `┃ ◦ Contoh: .datediff 01/01/2024 19/08/2026\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const d1 = parseDateStr(args[0]);
    const d2 = parseDateStr(args[1]);

    if (!d1 || !d2) {
        return m.reply(
            `╭┈❀ *DATE DIFFERENCE CALCULATOR*\n` +
            `┃ ◦ Error: Format tanggal tidak valid! Gunakan DD/MM/YYYY\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;

    const diffMs = Math.abs(d2 - d1);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const remainingDaysInWeeks = diffDays % 7;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const fmt1 = `${String(d1.getDate()).padStart(2, '0')}/${String(d1.getMonth() + 1).padStart(2, '0')}/${d1.getFullYear()}`;
    const fmt2 = `${String(d2.getDate()).padStart(2, '0')}/${String(d2.getMonth() + 1).padStart(2, '0')}/${d2.getFullYear()}`;

    const result = 
        `╭┈❀ *DATE DIFFERENCE CALCULATOR*\n` +
        `┃ ◦ Tanggal 1: ${fmt1}\n` +
        `┃ ◦ Tanggal 2: ${fmt2}\n` +
        `┃ ◦ Selisih Hari: ${diffDays} hari\n` +
        `┃ ◦ Selisih Minggu: ${weeks} minggu ${remainingDaysInWeeks} hari\n` +
        `┃ ◦ Detail: ${years} tahun ${months} bulan ${days} hari\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

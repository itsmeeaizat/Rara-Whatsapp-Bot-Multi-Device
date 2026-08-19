// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

const pluginConfig = {
    name: 'pomodoro',
    alias: ['pomo', 'pomodoroguide'],
    category: 'tools',
    description: 'Panduan dan Jadwal Teknik Pomodoro',
    usage: '.pomodoro',
    example: '.pomodoro',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

async function handler(m) {
    const result = 
        `╭┈❀ *POMODORO TECHNIQUE GUIDE*\n` +
        `┃ ◦ Konsep Utama: Kerja fokus 25 menit, istirahat 5 menit.\n` +
        `┃ ◦ Langkah-langkah:\n` +
        `┃ ◦ 1. Pilih tugas yang akan dikerjakan.\n` +
        `┃ ◦ 2. Set timer 25 menit (1 Pomodoro).\n` +
        `┃ ◦ 3. Fokus penuh tanpa distraksi.\n` +
        `┃ ◦ 4. Saat timer bunyi, istirahat 5 menit.\n` +
        `┃ ◦ 5. Ulangi hingga 4 sesi Pomodoro.\n` +
        `┃ ◦ 6. Ambil istirahat panjang (15 - 30 menit).\n` +
        `┃ ◦\n` +
        `┃ ◦ Jadwal Estimasi Sesi:\n` +
        `┃ ◦ - Sesi 1: 00:00 - 00:25 (Kerja) -> Rest 5m\n` +
        `┃ ◦ - Sesi 2: 00:30 - 00:55 (Kerja) -> Rest 5m\n` +
        `┃ ◦ - Sesi 3: 01:00 - 01:25 (Kerja) -> Rest 5m\n` +
        `┃ ◦ - Sesi 4: 01:30 - 01:55 (Kerja) -> Long Rest 20m\n` +
        `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;

    await m.reply(result);
}

export { pluginConfig as config, handler };

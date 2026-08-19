// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'card',
    alias: ['infocard', 'kartunama'],
    category: 'maker',
    description: 'Info card with user name and status on canvas',
    usage: '.card <name> | <status>',
    example: '.card Rara Bot | Active Developer',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, { sock }) {
    const rawText = m.text?.trim();

    if (!rawText) {
        return m.reply(
            `╭┈❀ *INFO CARD*\n` +
            `┃ ◦ Masukkan nama dan status dipisah tanda |\n` +
            `┃ ◦ Contoh: ${m.prefix}card Rara Bot | Active Developer\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const parts = rawText.split('|');
    const name = parts[0]?.trim() || 'Rara User';
    const status = parts[1]?.trim() || 'Active Member';

    try {
        const canvas = createCanvas(800, 450);
        const ctx = canvas.getContext('2d');

        // Dark background
        const bgGrad = ctx.createLinearGradient(0, 0, 800, 450);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 450);

        // Glassmorphism card rectangle
        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(50, 50, 700, 350, 20);
        ctx.fill();
        ctx.stroke();

        // Initial Avatar circle
        const initial = name.charAt(0).toUpperCase() || 'R';
        ctx.beginPath();
        ctx.arc(160, 225, 65, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = 'bold 64px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initial, 160, 225);

        // Name
        let nameFontSize = 42;
        if (name.length > 15) nameFontSize = 32;
        if (name.length > 25) nameFontSize = 24;

        ctx.textAlign = 'left';
        ctx.font = `bold ${nameFontSize}px sans-serif`;
        ctx.fillStyle = '#f8fafc';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(name, 260, 190);

        // Status / Role
        ctx.shadowBlur = 0;
        ctx.font = '22px sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`◦ ${status}`, 260, 240);

        // Official Badge mark top right
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.roundRect(570, 80, 140, 34, 10);
        ctx.fill();

        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('✓ VERIFIED', 640, 97);

        // Bottom tagline
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'right';
        ctx.fillText('RARA MULTIDEVICE OFFICIAL CARD', 710, 370);

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *INFO CARD*\n` +
            `┃ ◦ Gagal membuat kartu info.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

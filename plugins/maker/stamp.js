// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'stamp',
    alias: ['stempel', 'seal'],
    category: 'maker',
    description: 'Round stamp/seal on canvas (red circle with text)',
    usage: '.stamp <text>',
    example: '.stamp APPROVED',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

async function handler(m, { sock }) {
    const text = m.text?.trim()?.toUpperCase();

    if (!text) {
        return m.reply(
            `╭┈❀ *STAMP MAKER*\n` +
            `┃ ◦ Masukkan teks untuk membuat stempel/stempel bulat.\n` +
            `┃ ◦ Contoh: ${m.prefix}stamp APPROVED\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        // Off-white paper background
        ctx.fillStyle = '#f8f6f0';
        ctx.fillRect(0, 0, 500, 500);

        // Slightly rotate canvas for authentic stamp tilt
        ctx.translate(250, 250);
        ctx.rotate(-0.08);

        const stampColor = 'rgba(211, 47, 47, 0.88)'; // Red ink

        // Outer circle
        ctx.strokeStyle = stampColor;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 190, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 168, 0, Math.PI * 2);
        ctx.stroke();

        // Stars top & bottom
        ctx.font = 'bold 22px sans-serif';
        ctx.fillStyle = stampColor;
        ctx.textAlign = 'center';
        ctx.fillText('★ ★ ★', 0, -110);
        ctx.fillText('★ ★ ★', 0, 130);

        // Center line separator top/bottom
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-130, -50);
        ctx.lineTo(130, -50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-130, 50);
        ctx.lineTo(130, 50);
        ctx.stroke();

        // Main text setup
        let fontSize = 38;
        if (text.length > 12) fontSize = 28;
        if (text.length > 20) fontSize = 20;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 240);
        const lineHeight = fontSize * 1.2;
        const startY = -((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, 0, startY + index * lineHeight);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *STAMP MAKER*\n` +
            `┃ ◦ Gagal membuat stempel.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

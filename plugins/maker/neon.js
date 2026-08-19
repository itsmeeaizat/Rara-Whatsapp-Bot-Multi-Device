// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'neon',
    alias: ['neonteks', 'neontext'],
    category: 'maker',
    description: 'Neon text effect on canvas (dark bg, glowing text)',
    usage: '.neon <text>',
    example: '.neon Rara Bot',
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
    const text = m.text?.trim();

    if (!text) {
        return m.reply(
            `╭┈❀ *NEON TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat efek neon.\n` +
            `┃ ◦ Contoh: ${m.prefix}neon Rara Bot\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Dark background
        const bgGrad = ctx.createRadialGradient(400, 200, 50, 400, 200, 450);
        bgGrad.addColorStop(0, '#0a0a1a');
        bgGrad.addColorStop(1, '#020205');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 400);

        // Decorative outer glowing frame
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.strokeRect(30, 30, 740, 340);

        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 10;
        ctx.strokeRect(36, 36, 728, 328);

        // Text setup
        let fontSize = 60;
        if (text.length > 20) fontSize = 45;
        if (text.length > 40) fontSize = 32;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 680);
        const lineHeight = fontSize * 1.3;
        const startY = 200 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Outer cyan glow
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 30;
            ctx.fillStyle = '#00ffff';
            ctx.fillText(line, 400, y);

            // Mid pink glow
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#ff00ff';
            ctx.fillText(line, 400, y);

            // Core bright text
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 400, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *NEON TEXT*\n` +
            `┃ ◦ Gagal membuat gambar neon.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

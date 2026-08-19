// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'gradient',
    alias: ['gradienttext', 'tekssatukolor'],
    category: 'maker',
    description: 'Gradient text on canvas (pink-purple gradient)',
    usage: '.gradient <text>',
    example: '.gradient Rara Multi Device',
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
            `╭┈❀ *GRADIENT TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat efek gradient.\n` +
            `┃ ◦ Contoh: ${m.prefix}gradient Rara Multi Device\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Dark background
        ctx.fillStyle = '#11111d';
        ctx.fillRect(0, 0, 800, 400);

        // Subtle gradient background glow
        const bgGradient = ctx.createLinearGradient(0, 0, 800, 400);
        bgGradient.addColorStop(0, 'rgba(255, 0, 127, 0.1)');
        bgGradient.addColorStop(1, 'rgba(127, 0, 255, 0.1)');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 800, 400);

        // Text setup
        let fontSize = 58;
        if (text.length > 20) fontSize = 44;
        if (text.length > 40) fontSize = 32;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 700);
        const lineHeight = fontSize * 1.3;
        const startY = 200 - ((lines.length - 1) * lineHeight) / 2;

        // Pink-purple text gradient
        const textGradient = ctx.createLinearGradient(200, 0, 600, 0);
        textGradient.addColorStop(0, '#ff007f');
        textGradient.addColorStop(0.5, '#ff00ff');
        textGradient.addColorStop(1, '#8a2be2');

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 12;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;

            ctx.fillStyle = textGradient;
            ctx.fillText(line, 400, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *GRADIENT TEXT*\n` +
            `┃ ◦ Gagal membuat gambar gradient.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

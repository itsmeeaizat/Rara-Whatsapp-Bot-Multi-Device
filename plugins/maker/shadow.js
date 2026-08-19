// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'shadow',
    alias: ['shadowtext', 'teksbayangan'],
    category: 'maker',
    description: 'Text with shadow effect on canvas',
    usage: '.shadow <text>',
    example: '.shadow Rara Multi Device',
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
            `╭┈❀ *SHADOW TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat efek bayangan.\n` +
            `┃ ◦ Contoh: ${m.prefix}shadow Rara Multi Device\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Dark background with subtle radial gradient
        const bgGrad = ctx.createRadialGradient(400, 200, 50, 400, 200, 450);
        bgGrad.addColorStop(0, '#1c1c28');
        bgGrad.addColorStop(1, '#0a0a10');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 400);

        // Subtle frame
        ctx.strokeStyle = '#2a2a3c';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 760, 360);

        let fontSize = 58;
        if (text.length > 20) fontSize = 42;
        if (text.length > 40) fontSize = 30;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 700);
        const lineHeight = fontSize * 1.3;
        const startY = 200 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Deep dark drop shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 8;
            ctx.shadowOffsetY = 8;

            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 400, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *SHADOW TEXT*\n` +
            `┃ ◦ Gagal membuat gambar shadow.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'outline',
    alias: ['outlinetext', 'tekstepi'],
    category: 'maker',
    description: 'Outlined text on canvas',
    usage: '.outline <text>',
    example: '.outline Rara Multi Device',
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
            `╭┈❀ *OUTLINE TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat efek outline.\n` +
            `┃ ◦ Contoh: ${m.prefix}outline Rara Multi Device\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Dark slate background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 800, 400);

        // Frame
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 4;
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

            // Outer thick cyan stroke
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 8;
            ctx.lineJoin = 'round';
            ctx.strokeText(line, 400, y);

            // Fill text with white
            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 400, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *OUTLINE TEXT*\n` +
            `┃ ◦ Gagal membuat gambar outline.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

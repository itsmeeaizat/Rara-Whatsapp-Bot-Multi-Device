// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'stickertext',
    alias: ['stext', 'teksstiker'],
    category: 'maker',
    description: 'Create text sticker using canvas',
    usage: '.stickertext <text>',
    example: '.stickertext Halo Rara',
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
            `╭┈❀ *STICKER TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat stiker teks.\n` +
            `┃ ◦ Contoh: ${m.prefix}stickertext Halo Rara\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        // Transparent background
        ctx.clearRect(0, 0, 512, 512);

        let fontSize = 64;
        if (text.length > 15) fontSize = 48;
        if (text.length > 30) fontSize = 34;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 440);
        const lineHeight = fontSize * 1.25;
        const startY = 256 - ((lines.length - 1) * lineHeight) / 2;

        // Orange / yellow linear gradient text
        const textGrad = ctx.createLinearGradient(0, 100, 0, 400);
        textGrad.addColorStop(0, '#ff9900');
        textGrad.addColorStop(1, '#ff0055');

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Black outer outline stroke
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 12;
            ctx.lineJoin = 'round';
            ctx.strokeText(line, 256, y);

            // White mid stroke
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 6;
            ctx.strokeText(line, 256, y);

            // Inner gradient fill
            ctx.fillStyle = textGrad;
            ctx.fillText(line, 256, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *STICKER TEXT*\n` +
            `┃ ◦ Gagal membuat stiker teks.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

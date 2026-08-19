// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'label',
    alias: ['labelmaker', 'taglabel'],
    category: 'maker',
    description: 'Label/tag maker on canvas (rounded rectangle with text)',
    usage: '.label <text>',
    example: '.label FRAGILE - HANDLE WITH CARE',
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
            `╭┈❀ *LABEL MAKER*\n` +
            `┃ ◦ Masukkan teks untuk membuat label.\n` +
            `┃ ◦ Contoh: ${m.prefix}label FRAGILE - HANDLE WITH CARE\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 360);
        const ctx = canvas.getContext('2d');

        // Dark slate background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 800, 360);

        // Industrial Yellow Label Box
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(40, 40, 720, 280, 16);
        ctx.fill();
        ctx.stroke();

        // Inner dashed black border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.setLineDash([12, 8]);
        ctx.strokeRect(55, 55, 690, 250);
        ctx.setLineDash([]); // reset line dash

        // Hole punch circle ring on left side
        ctx.beginPath();
        ctx.arc(85, 180, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        ctx.strokeStyle = '#a1a1aa';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label main text
        let fontSize = 48;
        if (text.length > 20) fontSize = 36;
        if (text.length > 35) fontSize = 26;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 520);
        const lineHeight = fontSize * 1.25;
        const startY = 180 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, 420, startY + index * lineHeight);
        });

        // Barcode decorative lines on right side
        const barcodeX = 670;
        ctx.fillStyle = '#000000';
        for (let i = 0; i < 14; i++) {
            const width = (i % 3 === 0) ? 4 : 2;
            ctx.fillRect(barcodeX + i * 4, 100, width, 160);
        }

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *LABEL MAKER*\n` +
            `┃ ◦ Gagal membuat label.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

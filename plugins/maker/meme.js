// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'meme',
    alias: ['mememaker', 'memegen'],
    category: 'maker',
    description: 'Meme generator (top/bottom text on image)',
    usage: '.meme <top|bottom> (reply to image)',
    example: '.meme Teks Atas|Teks Bawah',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

function drawMemeText(ctx, text, x, y, fontSize, maxWidth, baseline) {
    if (!text) return;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = baseline;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(4, Math.floor(fontSize / 8));
    ctx.fillStyle = '#ffffff';

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

    const lineHeight = fontSize * 1.2;
    let startY = y;
    if (baseline === 'bottom') {
        startY = y - (lines.length - 1) * lineHeight;
    }

    lines.forEach((line, index) => {
        const lineY = startY + index * lineHeight;
        ctx.strokeText(line, x, lineY);
        ctx.fillText(line, x, lineY);
    });
}

async function handler(m, { sock }) {
    const rawText = m.text?.trim() || '';
    const quoted = m.quoted || m;

    let buffer;
    try {
        buffer = await quoted.download();
    } catch (err) {
        buffer = null;
    }

    if (!buffer) {
        return m.reply(
            `╭┈❀ *MEME GENERATOR*\n` +
            `┃ ◦ Balas gambar dengan format: .meme teks_atas|teks_bawah\n` +
            `┃ ◦ Contoh: ${m.prefix}meme ketika coding|error terus\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const parts = rawText.split('|');
    const topText = (parts[0] || rawText).trim().toUpperCase();
    const bottomText = parts.length > 1 ? parts[1].trim().toUpperCase() : '';

    try {
        const img = await loadImage(buffer);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const fontSize = Math.max(24, Math.floor(img.height / 10));
        const margin = Math.floor(img.height * 0.05);

        // Top Text
        if (topText) {
            drawMemeText(ctx, topText, img.width / 2, margin, fontSize, img.width - 40, 'top');
        }

        // Bottom Text
        if (bottomText) {
            drawMemeText(ctx, bottomText, img.width / 2, img.height - margin, fontSize, img.width - 40, 'bottom');
        }

        const outBuffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: outBuffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *MEME GENERATOR*\n` +
            `┃ ◦ Gagal memproses meme dari gambar.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

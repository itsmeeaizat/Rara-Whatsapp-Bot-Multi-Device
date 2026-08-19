// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'banner',
    alias: ['bannertext', 'spanduk'],
    category: 'maker',
    description: 'Text banner on canvas with decorative borders (pink/purple theme)',
    usage: '.banner <text>',
    example: '.banner Welcome to Rara Bot',
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
            `╭┈❀ *BANNER MAKER*\n` +
            `┃ ◦ Masukkan teks untuk membuat banner.\n` +
            `┃ ◦ Contoh: ${m.prefix}banner Welcome to Rara Bot\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(900, 400);
        const ctx = canvas.getContext('2d');

        // Dark purple / magenta gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 900, 400);
        bgGrad.addColorStop(0, '#230538');
        bgGrad.addColorStop(0.5, '#180228');
        bgGrad.addColorStop(1, '#0c0018');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 900, 400);

        // Pink/purple decorative borders
        ctx.strokeStyle = '#ff2a8d';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, 860, 360);

        ctx.strokeStyle = '#a100ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(28, 28, 844, 344);

        // Header small label
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#ff2a8d';
        ctx.textAlign = 'center';
        ctx.fillText('RARA OFFICIAL BANNER', 450, 55);

        let fontSize = 54;
        if (text.length > 20) fontSize = 40;
        if (text.length > 40) fontSize = 28;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 780);
        const lineHeight = fontSize * 1.3;
        const startY = 210 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Soft pink shadow glow
            ctx.shadowColor = '#ff2a8d';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 450, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *BANNER MAKER*\n` +
            `┃ ◦ Gagal membuat banner.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

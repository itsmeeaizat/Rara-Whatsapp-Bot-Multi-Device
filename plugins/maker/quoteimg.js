// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'quoteimg',
    alias: ['quotemaker', 'tekskutip'],
    category: 'maker',
    description: 'Quote on image background using canvas',
    usage: '.quoteimg <quote> | <author>',
    example: '.quoteimg Hidup adalah perjalanan | Aizat',
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
    const rawText = m.text?.trim();

    if (!rawText) {
        return m.reply(
            `╭┈❀ *QUOTE MAKER*\n` +
            `┃ ◦ Masukkan kutipan dan nama penulis dipisah tanda |\n` +
            `┃ ◦ Contoh: ${m.prefix}quoteimg Hidup adalah perjalanan | Aizat\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    const parts = rawText.split('|');
    const quote = parts[0]?.trim() || '';
    const author = parts[1]?.trim() || 'Anonymous';

    try {
        const canvas = createCanvas(800, 500);
        const ctx = canvas.getContext('2d');

        // Dark aesthetic gradient wallpaper
        const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
        bgGrad.addColorStop(0, '#0f2027');
        bgGrad.addColorStop(0.5, '#203a43');
        bgGrad.addColorStop(1, '#2c5364');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 500);

        // Center card container
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(60, 60, 680, 380, 20);
        ctx.fill();
        ctx.stroke();

        // Quotation mark graphic top left
        ctx.font = '80px serif';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.textAlign = 'left';
        ctx.fillText('“', 90, 140);

        // Quote text setup
        let fontSize = 32;
        if (quote.length > 50) fontSize = 26;
        if (quote.length > 100) fontSize = 20;

        ctx.font = `italic ${fontSize}px serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, quote, 560);
        const lineHeight = fontSize * 1.35;
        const startY = 230 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            ctx.shadowBlur = 8;
            ctx.fillText(line, 400, startY + index * lineHeight);
        });

        // Quotation mark graphic bottom right
        ctx.shadowBlur = 0;
        ctx.font = '80px serif';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.textAlign = 'right';
        ctx.fillText('”', 710, 390);

        // Author line
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'right';
        ctx.fillText(`— ${author}`, 670, 380);

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *QUOTE MAKER*\n` +
            `┃ ◦ Gagal membuat gambar kutipan.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

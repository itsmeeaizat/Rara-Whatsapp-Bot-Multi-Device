// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'tag',
    alias: ['nametag', 'tagmaker'],
    category: 'maker',
    description: 'Name tag on canvas (name + decorative border, pink theme)',
    usage: '.tag <name>',
    example: '.tag Rara Princess',
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
    const name = m.text?.trim();

    if (!name) {
        return m.reply(
            `╭┈❀ *NAME TAG MAKER*\n` +
            `┃ ◦ Masukkan nama untuk membuat name tag.\n` +
            `┃ ◦ Contoh: ${m.prefix}tag Rara Princess\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Dark pink background gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 800, 400);
        bgGrad.addColorStop(0, '#2e0018');
        bgGrad.addColorStop(0.5, '#19000a');
        bgGrad.addColorStop(1, '#0a0005');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 400);

        // Pink neon outer border
        ctx.strokeStyle = '#ff1493';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, 760, 360);

        ctx.strokeStyle = '#ff69b4';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, 740, 340);

        // Pink header ribbon / box
        ctx.fillStyle = '#ff1493';
        ctx.beginPath();
        ctx.roundRect(250, 45, 300, 44, 12);
        ctx.fill();

        ctx.font = 'bold 18px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('HELLO, MY NAME IS', 400, 72);

        // Name setup
        let fontSize = 56;
        if (name.length > 15) fontSize = 42;
        if (name.length > 30) fontSize = 28;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, name, 680);
        const lineHeight = fontSize * 1.3;
        const startY = 220 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Pink shadow glow
            ctx.shadowColor = '#ff69b4';
            ctx.shadowBlur = 20;

            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 400, y);
        });

        // Corner heart accents
        ctx.shadowBlur = 0;
        ctx.font = '22px sans-serif';
        ctx.fillStyle = '#ff69b4';
        ctx.fillText('♥', 50, 50);
        ctx.fillText('♥', 750, 50);
        ctx.fillText('♥', 50, 350);
        ctx.fillText('♥', 750, 350);

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *NAME TAG MAKER*\n` +
            `┃ ◦ Gagal membuat name tag.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

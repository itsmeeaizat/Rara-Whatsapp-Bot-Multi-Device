// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'retro',
    alias: ['retrotext', 'synthwave', '80s'],
    category: 'maker',
    description: 'Retro 80s style text on canvas (neon grid bg, pink/purple)',
    usage: '.retro <text>',
    example: '.retro RETRO WAVE',
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
            `╭┈❀ *RETRO 80S TEXT*\n` +
            `┃ ◦ Masukkan teks untuk membuat efek retro 80an.\n` +
            `┃ ◦ Contoh: ${m.prefix}retro RETRO WAVE\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(850, 450);
        const ctx = canvas.getContext('2d');

        // Dark sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 260);
        skyGrad.addColorStop(0, '#0d021a');
        skyGrad.addColorStop(0.7, '#2b033d');
        skyGrad.addColorStop(1, '#ff007f');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, 850, 260);

        // Synthwave Sun
        ctx.save();
        ctx.beginPath();
        ctx.arc(425, 230, 90, 0, Math.PI * 2);
        const sunGrad = ctx.createLinearGradient(425, 140, 425, 320);
        sunGrad.addColorStop(0, '#ffea00');
        sunGrad.addColorStop(1, '#ff007f');
        ctx.fillStyle = sunGrad;
        ctx.fill();

        // Horizontal sun cuts
        ctx.fillStyle = '#2b033d';
        for (let i = 0; i < 6; i++) {
            ctx.fillRect(320, 210 + i * 8, 210, 3 + i);
        }
        ctx.restore();

        // Dark ground
        ctx.fillStyle = '#0a0014';
        ctx.fillRect(0, 260, 850, 190);

        // Grid lines perspective
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;

        // Horizontal perspective lines
        for (let y = 260; y < 450; y += (y - 240) * 0.18 + 4) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(850, y);
            ctx.stroke();
        }

        // Perspective vertical lines converging to horizon center
        const startXList = [-400, -200, 0, 150, 300, 425, 550, 700, 850, 1050, 1250];
        startXList.forEach((sx) => {
            ctx.beginPath();
            ctx.moveTo(425, 260);
            ctx.lineTo(sx, 450);
            ctx.stroke();
        });

        // Text setup
        let fontSize = 56;
        if (text.length > 15) fontSize = 40;
        if (text.length > 30) fontSize = 28;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 720);
        const lineHeight = fontSize * 1.25;
        const startY = 160 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            // Neon pink/cyan text glow
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 25;

            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 6;
            ctx.strokeText(line, 425, y);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 425, y);
        });

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *RETRO 80S TEXT*\n` +
            `┃ ◦ Gagal membuat gambar retro.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

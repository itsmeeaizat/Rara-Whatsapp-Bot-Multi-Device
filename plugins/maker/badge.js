// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'badge',
    alias: ['badgemaker', 'lencana'],
    category: 'maker',
    description: 'Custom badge with text on canvas (round badge with gradient)',
    usage: '.badge <text>',
    example: '.badge VIP MEMBER',
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
            `╭┈❀ *BADGE MAKER*\n` +
            `┃ ◦ Masukkan teks untuk membuat lencana.\n` +
            `┃ ◦ Contoh: ${m.prefix}badge VIP MEMBER\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        // Dark background
        ctx.fillStyle = '#0b0c10';
        ctx.fillRect(0, 0, 500, 500);

        // Outer radial badge ring
        const badgeGrad = ctx.createRadialGradient(250, 250, 80, 250, 250, 210);
        badgeGrad.addColorStop(0, '#ff007f');
        badgeGrad.addColorStop(0.5, '#7928ca');
        badgeGrad.addColorStop(1, '#1f1035');

        ctx.beginPath();
        ctx.arc(250, 250, 200, 0, Math.PI * 2);
        ctx.fillStyle = badgeGrad;
        ctx.fill();

        // Outer gold border ring
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(250, 250, 170, 0, Math.PI * 2);
        ctx.fillStyle = '#120224';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Star on top inside badge
        ctx.font = '24px sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.textAlign = 'center';
        ctx.fillText('★', 250, 130);

        // Text setup
        let fontSize = 36;
        if (text.length > 15) fontSize = 28;
        if (text.length > 30) fontSize = 20;

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = wrapText(ctx, text, 280);
        const lineHeight = fontSize * 1.25;
        const startY = 250 - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * lineHeight;

            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(line, 250, y);
        });

        // Bottom star inside badge
        ctx.shadowBlur = 0;
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.fillText('★ ★ ★', 250, 360);

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *BADGE MAKER*\n` +
            `┃ ◦ Gagal membuat badge.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

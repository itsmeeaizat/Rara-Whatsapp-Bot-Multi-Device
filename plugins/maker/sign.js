// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'sign',
    alias: ['signature', 'ttd'],
    category: 'maker',
    description: 'Signature style text on canvas (cursive style, white bg)',
    usage: '.sign <name>',
    example: '.sign Aizat',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, { sock }) {
    const name = m.text?.trim();

    if (!name) {
        return m.reply(
            `╭┈❀ *SIGNATURE MAKER*\n` +
            `┃ ◦ Masukkan nama untuk membuat tanda tangan.\n` +
            `┃ ◦ Contoh: ${m.prefix}sign Aizat\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Pure white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 400);

        // Navy blue ink
        const inkColor = '#0d1b2a';

        let fontSize = 72;
        if (name.length > 15) fontSize = 54;
        if (name.length > 25) fontSize = 38;

        // Cursive signature font style
        ctx.font = `italic ${fontSize}px cursive, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = inkColor;

        ctx.fillText(name, 400, 180);

        // Elegant underline curve (signature flourish)
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(250, 240);
        ctx.quadraticCurveTo(400, 280, 550, 230);
        ctx.stroke();

        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(530, 235);
        ctx.quadraticCurveTo(580, 220, 610, 250);
        ctx.stroke();

        // Footer verified mark
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText('OFFICIAL SIGNATURE • RARA BOT', 760, 360);

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *SIGNATURE MAKER*\n` +
            `┃ ◦ Gagal membuat tanda tangan.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas';

const pluginConfig = {
    name: 'cert',
    alias: ['certificate', 'sertifikat'],
    category: 'maker',
    description: 'Certificate generator on canvas (name + date, decorative border)',
    usage: '.cert <name>',
    example: '.cert Aizat',
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
            `╭┈❀ *CERTIFICATE GENERATOR*\n` +
            `┃ ◦ Masukkan nama untuk sertifikat.\n` +
            `┃ ◦ Contoh: ${m.prefix}cert Aizat\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const canvas = createCanvas(1000, 680);
        const ctx = canvas.getContext('2d');

        // Elegant cream background
        ctx.fillStyle = '#fdfbf7';
        ctx.fillRect(0, 0, 1000, 680);

        // Ornate navy & gold double border
        ctx.strokeStyle = '#0a192f';
        ctx.lineWidth = 12;
        ctx.strokeRect(25, 25, 950, 630);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, 920, 600);

        // Corner ornaments
        const drawCorner = (x, y) => {
            ctx.fillStyle = '#d4af37';
            ctx.fillRect(x, y, 20, 20);
        };
        drawCorner(45, 45);
        drawCorner(935, 45);
        drawCorner(45, 615);
        drawCorner(935, 615);

        // Certificate Header
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0a192f';
        ctx.font = 'bold 36px serif';
        ctx.fillText('CERTIFICATE OF APPRECIATION', 500, 130);

        ctx.font = 'italic 20px serif';
        ctx.fillStyle = '#555555';
        ctx.fillText('PROUDLY PRESENTED TO', 500, 180);

        // Recipient Name
        let nameFontSize = 52;
        if (name.length > 20) nameFontSize = 38;

        ctx.font = `bold ${nameFontSize}px serif`;
        ctx.fillStyle = '#d4af37';
        ctx.fillText(name, 500, 280);

        // Underline under name
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(250, 310);
        ctx.lineTo(750, 310);
        ctx.stroke();

        // Description
        ctx.font = '18px serif';
        ctx.fillStyle = '#333333';
        ctx.fillText('For outstanding participation and achievement in Rara Multi Device.', 500, 370);

        // Date
        const today = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        ctx.font = 'italic 18px serif';
        ctx.fillStyle = '#666666';
        ctx.fillText(`Given on: ${today}`, 300, 520);

        // Gold Seal Graphic on Right
        ctx.beginPath();
        ctx.arc(720, 510, 45, 0, Math.PI * 2);
        ctx.fillStyle = '#d4af37';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(720, 510, 38, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('★ SEAL ★', 720, 514);

        // Signature line
        ctx.strokeStyle = '#0a192f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(200, 500);
        ctx.lineTo(400, 500);
        ctx.stroke();

        const buffer = canvas.toBuffer('image/png');
        await sock.sendMessage(m.chat, { image: buffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *CERTIFICATE GENERATOR*\n` +
            `┃ ◦ Gagal membuat sertifikat.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

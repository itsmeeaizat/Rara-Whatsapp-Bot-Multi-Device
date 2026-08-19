// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp';

const pluginConfig = {
    name: 'vintage',
    alias: ['vintagestyle', 'sepia'],
    category: 'maker',
    description: 'Vintage filter on image using jimp (sepia + vignette)',
    usage: '.vintage (reply to image)',
    example: '.vintage',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, { sock }) {
    const quoted = m.quoted || m;

    let buffer;
    try {
        buffer = await quoted.download();
    } catch (err) {
        buffer = null;
    }

    if (!buffer) {
        return m.reply(
            `╭┈❀ *VINTAGE FILTER*\n` +
            `┃ ◦ Balas gambar untuk memberikan efek vintage.\n` +
            `┃ ◦ Contoh: ${m.prefix}vintage\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const image = await jimp.read(buffer);

        // Apply sepia and contrast
        image.sepia();
        image.contrast(0.12);

        // Vignette effect
        const w = image.bitmap.width;
        const h = image.bitmap.height;
        const cx = w / 2;
        const cy = h / 2;
        const maxDist = Math.sqrt(cx * cx + cy * cy);

        image.scan(0, 0, w, h, function (x, y, idx) {
            const dx = x - cx;
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) / maxDist;
            const factor = Math.max(0.2, 1 - Math.pow(dist, 2) * 0.55);

            this.bitmap.data[idx] = Math.floor(this.bitmap.data[idx] * factor);
            this.bitmap.data[idx + 1] = Math.floor(this.bitmap.data[idx + 1] * factor);
            this.bitmap.data[idx + 2] = Math.floor(this.bitmap.data[idx + 2] * factor);
        });

        const outBuffer = await image.getBufferAsync(jimp.MIME_PNG);
        await sock.sendMessage(m.chat, { image: outBuffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *VINTAGE FILTER*\n` +
            `┃ ◦ Gagal membuat efek vintage.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

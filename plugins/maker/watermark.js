// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp';

const pluginConfig = {
    name: 'watermark',
    alias: ['wm', 'watermarkimg'],
    category: 'maker',
    description: 'Add watermark text to image using jimp',
    usage: '.watermark <text> (reply to image)',
    example: '.watermark Rara Bot',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, { sock }) {
    const text = m.text?.trim();
    const quoted = m.quoted || m;

    let buffer;
    try {
        buffer = await quoted.download();
    } catch (err) {
        buffer = null;
    }

    if (!buffer || !text) {
        return m.reply(
            `╭┈❀ *WATERMARK MAKER*\n` +
            `┃ ◦ Balas gambar dengan teks watermark.\n` +
            `┃ ◦ Contoh: ${m.prefix}watermark Rara Bot\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const image = await jimp.read(buffer);
        const font = image.bitmap.width > 600
            ? await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
            : await jimp.loadFont(jimp.FONT_SANS_16_WHITE);

        const textWidth = jimp.measureText(font, text);
        const textHeight = jimp.measureTextHeight(font, text, image.bitmap.width);

        const margin = 20;
        const x = Math.max(margin, image.bitmap.width - textWidth - margin);
        const y = Math.max(margin, image.bitmap.height - textHeight - margin);

        // Semi-transparent background box behind watermark
        const boxPadding = 10;
        const boxWidth = textWidth + boxPadding * 2;
        const boxHeight = textHeight + boxPadding * 2;

        const overlay = new jimp(boxWidth, boxHeight, 0x00000099);
        image.composite(overlay, x - boxPadding, y - boxPadding);

        // Print watermark text
        image.print(font, x, y, text);

        const outBuffer = await image.getBufferAsync(jimp.MIME_PNG);
        await sock.sendMessage(m.chat, { image: outBuffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *WATERMARK MAKER*\n` +
            `┃ ◦ Gagal menambahkan watermark pada gambar.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

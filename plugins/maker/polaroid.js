// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp';

const pluginConfig = {
    name: 'polaroid',
    alias: ['polaroidframe', 'polafoto'],
    category: 'maker',
    description: 'Polaroid frame effect on image using jimp',
    usage: '.polaroid <caption?> (reply to image)',
    example: '.polaroid Sweet Memory',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
};

async function handler(m, { sock }) {
    const captionText = m.text?.trim() || '';
    const quoted = m.quoted || m;

    let buffer;
    try {
        buffer = await quoted.download();
    } catch (err) {
        buffer = null;
    }

    if (!buffer) {
        return m.reply(
            `╭┈❀ *POLAROID MAKER*\n` +
            `┃ ◦ Balas gambar untuk memberikan bingkai polaroid.\n` +
            `┃ ◦ Contoh: ${m.prefix}polaroid Sweet Memory\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const sourceImage = await jimp.read(buffer);

        // Crop & resize source image to square 600x600
        sourceImage.cover(600, 600);

        // White frame canvas 700x860
        const frame = new jimp(700, 860, 0xffffffff);

        // Thin dark border for the photo box area
        const photoBox = new jimp(604, 604, 0xddddddff);
        frame.composite(photoBox, 48, 48);

        // Composite photo onto frame
        frame.composite(sourceImage, 50, 50);

        // Print caption if provided
        if (captionText) {
            const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
            const textWidth = jimp.measureText(font, captionText);
            const x = Math.max(20, (700 - textWidth) / 2);
            frame.print(font, x, 720, captionText);
        }

        const outBuffer = await frame.getBufferAsync(jimp.MIME_PNG);
        await sock.sendMessage(m.chat, { image: outBuffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *POLAROID MAKER*\n` +
            `┃ ◦ Gagal membuat efek polaroid.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

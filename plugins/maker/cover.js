// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp';

const pluginConfig = {
    name: 'cover',
    alias: ['coverart', 'albumcover'],
    category: 'maker',
    description: 'Cover image with text overlay using jimp',
    usage: '.cover <text> (reply to image)',
    example: '.cover Rara Best Hits',
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
            `╭┈❀ *COVER MAKER*\n` +
            `┃ ◦ Balas gambar dengan judul cover.\n` +
            `┃ ◦ Contoh: ${m.prefix}cover Rara Best Hits\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }

    try {
        const image = await jimp.read(buffer);

        // Crop & resize image to 800x800 square cover
        image.cover(800, 800);

        // Dark gradient band overlay on bottom half for text legibility
        const bandHeight = 260;
        const overlay = new jimp(800, bandHeight, 0x000000bb);
        image.composite(overlay, 0, 800 - bandHeight);

        // Top header small caption
        const fontSmall = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
        image.print(fontSmall, 30, 30, 'STEREO • OFFICIAL COVER');

        // Main Title Text
        const fontMain = text.length > 20
            ? await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
            : await jimp.loadFont(jimp.FONT_SANS_64_WHITE);

        image.print(
            fontMain,
            30,
            680,
            {
                text: text,
                alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
                alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
            },
            740,
            90
        );

        const outBuffer = await image.getBufferAsync(jimp.MIME_PNG);
        await sock.sendMessage(m.chat, { image: outBuffer }, { quoted: m });
    } catch (err) {
        return m.reply(
            `╭┈❀ *COVER MAKER*\n` +
            `┃ ◦ Gagal membuat cover image.\n` +
            `╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`
        );
    }
}

export { pluginConfig as config, handler };

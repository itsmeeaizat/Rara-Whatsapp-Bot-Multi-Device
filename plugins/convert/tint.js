// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'tint',
    alias: ['tintimg', 'warnai'],
    category: 'convert',
    description: 'Beri lapisan warna (tint) pada gambar',
    usage: '.tint <hexcolor>',
    example: '.tint #ff0000',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const text = m.text?.trim()
    const color = text || '#ff0000'

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *TINT IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diberi tint!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *TINT IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        const colorHex = jimp.cssColorToHex(color)
        const tintImg = new jimp(image.bitmap.width, image.bitmap.height, colorHex)
        tintImg.opacity(0.4)
        image.composite(tintImg, 0, 0)

        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *TINT IMAGE*\n┃ ◦ Berhasil memberi tint pada gambar\n┃ ◦ Warna: ${color}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *TINT IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

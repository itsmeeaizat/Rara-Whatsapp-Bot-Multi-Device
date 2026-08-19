// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'pixelate',
    alias: ['pixelateimg', 'pixel', 'piksel'],
    category: 'convert',
    description: 'Beri efek pikselasi pada gambar',
    usage: '.pixelate <size>',
    example: '.pixelate 10',
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
    let size = 10
    if (text) {
        size = parseInt(text)
        if (isNaN(size) || size <= 0) {
            return m.reply(`╭┈❀ *PIXELATE IMAGE*\n┃ ◦ Ukuran piksel harus berupa angka lebih besar dari 0!\n┃ ◦ Contoh: .pixelate 10\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *PIXELATE IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin dipikselasi!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *PIXELATE IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.pixelate(size)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *PIXELATE IMAGE*\n┃ ◦ Berhasil menerapkan efek pikselasi\n┃ ◦ Ukuran piksel: ${size}px\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *PIXELATE IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

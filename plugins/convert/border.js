// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'border',
    alias: ['addborder', 'bingkai'],
    category: 'convert',
    description: 'Tambahkan bingkai pada gambar dengan warna dan lebar tertentu',
    usage: '.border <color> <width>',
    example: '.border red 10',
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
    const args = text ? text.split(/\s+/) : []
    
    let color = '#ffffff'
    let width = 10

    if (args.length === 1) {
        if (!isNaN(parseInt(args[0]))) {
            width = parseInt(args[0])
        } else {
            color = args[0]
        }
    } else if (args.length >= 2) {
        if (!isNaN(parseInt(args[0]))) {
            width = parseInt(args[0])
            color = args[1]
        } else if (!isNaN(parseInt(args[1]))) {
            color = args[0]
            width = parseInt(args[1])
        } else {
            color = args[0]
        }
    }

    if (width <= 0) width = 10
    if (width > 100) width = 100

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *BORDER IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diberi bingkai!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *BORDER IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        const borderHex = jimp.cssColorToHex(color)
        const newW = image.bitmap.width + width * 2
        const newH = image.bitmap.height + width * 2
        const bordered = new jimp(newW, newH, borderHex)
        bordered.composite(image, width, width)

        const result = await bordered.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *BORDER IMAGE*\n┃ ◦ Berhasil menambahkan bingkai\n┃ ◦ Warna: ${color}\n┃ ◦ Lebar: ${width}px\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *BORDER IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

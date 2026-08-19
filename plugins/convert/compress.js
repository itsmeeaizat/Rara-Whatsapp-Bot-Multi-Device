// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'compress',
    alias: ['compressimg', 'kompres', 'shrink'],
    category: 'convert',
    description: 'Kompres kualitas gambar (1 - 100)',
    usage: '.compress <quality 1-100>',
    example: '.compress 50',
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
    let quality = 50
    if (text) {
        quality = parseInt(text)
        if (isNaN(quality) || quality < 1 || quality > 100) {
            return m.reply(`╭┈❀ *COMPRESS IMAGE*\n┃ ◦ Kualitas harus berupa angka antara 1 sampai 100!\n┃ ◦ Contoh: .compress 50\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *COMPRESS IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin dikompres!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *COMPRESS IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.quality(quality)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *COMPRESS IMAGE*\n┃ ◦ Berhasil mengompres gambar\n┃ ◦ Kualitas: ${quality}%\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *COMPRESS IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

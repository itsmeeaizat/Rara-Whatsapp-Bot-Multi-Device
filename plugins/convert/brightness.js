// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'brightness',
    alias: ['brightnessimg', 'kecerahan', 'bright'],
    category: 'convert',
    description: 'Atur kecerahan gambar (-1.0 sampai 1.0)',
    usage: '.brightness <value -1 to 1>',
    example: '.brightness 0.3',
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
    let val = 0.3
    if (text) {
        val = parseFloat(text)
        if (isNaN(val) || val < -1 || val > 1) {
            return m.reply(`╭┈❀ *BRIGHTNESS IMAGE*\n┃ ◦ Nilai kecerahan harus antara -1.0 sampai 1.0!\n┃ ◦ Contoh: .brightness 0.3\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *BRIGHTNESS IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diatur kecerahannya!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *BRIGHTNESS IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.brightness(val)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *BRIGHTNESS IMAGE*\n┃ ◦ Berhasil mengatur kecerahan gambar\n┃ ◦ Nilai: ${val}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *BRIGHTNESS IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

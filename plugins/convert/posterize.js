// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'posterize',
    alias: ['posterizeimg', 'poster'],
    category: 'convert',
    description: 'Pengurangan jumlah warna gambar (posterize)',
    usage: '.posterize <levels>',
    example: '.posterize 5',
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
    let levels = 5
    if (text) {
        levels = parseInt(text)
        if (isNaN(levels) || levels < 2 || levels > 32) {
            return m.reply(`╭┈❀ *POSTERIZE IMAGE*\n┃ ◦ Level posterize harus berupa angka antara 2 sampai 32!\n┃ ◦ Contoh: .posterize 5\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *POSTERIZE IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diposterize!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *POSTERIZE IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.posterize(levels)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *POSTERIZE IMAGE*\n┃ ◦ Berhasil menerapkan efek posterize\n┃ ◦ Level: ${levels}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *POSTERIZE IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

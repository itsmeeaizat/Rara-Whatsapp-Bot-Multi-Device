// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'resize',
    alias: ['resizeimg', 'ubahukuran'],
    category: 'convert',
    description: 'Ubah ukuran gambar ke lebar dan tinggi yang ditentukan',
    usage: '.resize <width>x<height>',
    example: '.resize 500x500',
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
    if (!text) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Masukkan ukuran target!\n┃ ◦ Format: .resize <width>x<height>\n┃ ◦ Contoh: .resize 500x500\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const match = text.match(/^(\d+)(?:x(\d+))?$/i)
    if (!match) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Format ukuran salah!\n┃ ◦ Gunakan angka, contoh: .resize 500x500\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const targetWidth = parseInt(match[1])
    const targetHeight = match[2] ? parseInt(match[2]) : jimp.AUTO

    if (targetWidth <= 0 || (match[2] && targetHeight <= 0)) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Ukuran harus lebih besar dari 0!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const quoted = m.quoted || m
    if (!quoted || !quoted.message || (!quoted.message.imageMessage && !quoted.message.stickerMessage && !quoted.message.viewOnceMessageV2?.message?.imageMessage)) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin di-resize!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.resize(targetWidth, targetHeight)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        
        const finalWidth = image.bitmap.width
        const finalHeight = image.bitmap.height
        const caption = `╭┈❀ *RESIZE IMAGE*\n┃ ◦ Ukuran berhasil diubah\n┃ ◦ Dimensi: ${finalWidth} x ${finalHeight}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *RESIZE IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

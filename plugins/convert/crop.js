// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'crop',
    alias: ['potong', 'cropimg'],
    category: 'convert',
    description: 'Potong gambar sesuai koordinat x y lebar tinggi',
    usage: '.crop <x> <y> <w> <h>',
    example: '.crop 10 10 200 200',
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
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Masukkan parameter potong!\n┃ ◦ Format: .crop <x> <y> <w> <h>\n┃ ◦ Contoh: .crop 10 10 200 200\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const args = text.split(/\s+/).map(v => parseInt(v))
    if (args.length < 4 || args.some(v => isNaN(v))) {
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Format parameter salah!\n┃ ◦ Masukkan 4 angka: x y w h\n┃ ◦ Contoh: .crop 10 10 200 200\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let [x, y, w, h] = args
    if (x < 0 || y < 0 || w <= 0 || h <= 0) {
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Nilai x dan y >= 0, w dan h > 0!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const quoted = m.quoted || m
    if (!quoted || !quoted.message || (!quoted.message.imageMessage && !quoted.message.stickerMessage && !quoted.message.viewOnceMessageV2?.message?.imageMessage)) {
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin dipotong!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        const imgWidth = image.bitmap.width
        const imgHeight = image.bitmap.height

        if (x >= imgWidth || y >= imgHeight) {
            return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Posisi x/y melebihi dimensi gambar (${imgWidth}x${imgHeight})!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }

        if (x + w > imgWidth) w = imgWidth - x
        if (y + h > imgHeight) h = imgHeight - y

        image.crop(x, y, w, h)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        
        const caption = `╭┈❀ *CROP IMAGE*\n┃ ◦ Berhasil memotong gambar\n┃ ◦ Posisi: (${x}, ${y})\n┃ ◦ Ukuran: ${w} x ${h}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *CROP IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

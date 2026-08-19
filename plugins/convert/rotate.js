// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'rotate',
    alias: ['rotateimg', 'putar'],
    category: 'convert',
    description: 'Rotasi gambar berdasarkan derajat',
    usage: '.rotate <degrees>',
    example: '.rotate 90',
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
    let deg = 90
    if (text) {
        deg = parseInt(text)
        if (isNaN(deg)) {
            return m.reply(`╭┈❀ *ROTATE IMAGE*\n┃ ◦ Derajat rotasi harus berupa angka!\n┃ ◦ Format: .rotate <derajat>\n┃ ◦ Contoh: .rotate 90\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
        }
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *ROTATE IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diputar!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *ROTATE IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.rotate(deg)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        
        const caption = `╭┈❀ *ROTATE IMAGE*\n┃ ◦ Berhasil memutar gambar\n┃ ◦ Sudut: ${deg} derajat\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *ROTATE IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

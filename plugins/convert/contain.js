// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'contain',
    alias: ['containimg', 'fitimg'],
    category: 'convert',
    description: 'Sesuaikan gambar ke dalam dimensi target tanpa memotong',
    usage: '.contain <w>x<h>',
    example: '.contain 500x500',
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
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Masukkan ukuran target!\n┃ ◦ Format: .contain <w>x<h>\n┃ ◦ Contoh: .contain 500x500\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const match = text.match(/^(\d+)x(\d+)$/i)
    if (!match) {
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Format ukuran salah!\n┃ ◦ Gunakan format <lebar>x<tinggi>, contoh: .contain 500x500\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const w = parseInt(match[1])
    const h = parseInt(match[2])
    if (w <= 0 || h <= 0) {
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Ukuran harus lebih besar dari 0!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin disesuaikan!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        image.contain(w, h)
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const caption = `╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Berhasil menyesuaikan gambar\n┃ ◦ Dimensi: ${w} x ${h}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *CONTAIN IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

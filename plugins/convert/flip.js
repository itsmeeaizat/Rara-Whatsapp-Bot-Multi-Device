// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import jimp from 'jimp'

const pluginConfig = {
    name: 'flip',
    alias: ['flipimg', 'balik'],
    category: 'convert',
    description: 'Balik gambar secara vertikal atau horizontal',
    usage: '.flip <h|v>',
    example: '.flip h',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const text = m.text?.trim().toLowerCase()
    if (!text || !['h', 'v', 'horizontal', 'vertical', 'hv', 'vh'].includes(text)) {
        return m.reply(`╭┈❀ *FLIP IMAGE*\n┃ ◦ Masukkan arah balik!\n┃ ◦ Format: .flip <h|v>\n┃ ◦ Contoh: .flip h (horizontal) atau .flip v (vertikal)\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *FLIP IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin dibalik!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *FLIP IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const image = await jimp.read(buffer)
        const isH = text === 'h' || text === 'horizontal' || text === 'hv' || text === 'vh'
        const isV = text === 'v' || text === 'vertical' || text === 'hv' || text === 'vh'
        image.flip(isH, isV)
        
        const result = await image.getBufferAsync(jimp.MIME_JPEG)
        const modeLabel = isH && isV ? 'Horizontal & Vertikal' : isH ? 'Horizontal' : 'Vertikal'
        const caption = `╭┈❀ *FLIP IMAGE*\n┃ ◦ Berhasil membalik gambar\n┃ ◦ Arah: ${modeLabel}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *FLIP IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

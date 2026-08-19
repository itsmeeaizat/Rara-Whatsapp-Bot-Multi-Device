// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas, loadImage } from '@napi-rs/canvas'

const pluginConfig = {
    name: 'round',
    alias: ['roundimg', 'rounded', 'circleimg'],
    category: 'convert',
    description: 'Ubah sudut gambar menjadi melengkung / rounded',
    usage: '.round <radius>',
    example: '.round 30',
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
    const quoted = m.quoted || m
    const isImage = quoted.message?.imageMessage || 
                    quoted.message?.stickerMessage || 
                    quoted.message?.viewOnceMessageV2?.message?.imageMessage ||
                    /image|sticker/.test(quoted.msg?.mimetype || quoted.mimetype || '')

    if (!quoted || !isImage) {
        return m.reply(`╭┈❀ *ROUND IMAGE*\n┃ ◦ Reply ke gambar/sticker yang ingin diubah sudutnya!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    let buffer
    try {
        buffer = await quoted.download()
    } catch (e) {
        return m.reply(`╭┈❀ *ROUND IMAGE*\n┃ ◦ Gagal mengunduh media.\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const img = await loadImage(buffer)
        let radius = 30
        if (text) {
            if (text.toLowerCase() === 'circle') {
                radius = Math.min(img.width, img.height) / 2
            } else {
                const parsed = parseInt(text)
                if (!isNaN(parsed) && parsed > 0) {
                    radius = parsed
                }
            }
        }

        const canvas = createCanvas(img.width, img.height)
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.roundRect(0, 0, img.width, img.height, [radius])
        ctx.clip()
        ctx.drawImage(img, 0, 0)

        const result = await canvas.encode('png')
        const caption = `╭┈❀ *ROUND IMAGE*\n┃ ◦ Berhasil mengubah sudut gambar\n┃ ◦ Radius: ${Math.round(radius)}px\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *ROUND IMAGE*\n┃ ◦ Gagal memproses gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

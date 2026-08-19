// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { createCanvas } from '@napi-rs/canvas'

const pluginConfig = {
    name: 'texttoimg',
    alias: ['tti', 'text2img', 'txt2img', 'tulisan'],
    category: 'convert',
    description: 'Ubah teks menjadi gambar tampilan aesthetic',
    usage: '.texttoimg <text>',
    example: '.texttoimg Hello World',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const input = m.text?.trim() || m.quoted?.text?.trim()
    if (!input) {
        return m.reply(`╭┈❀ *TEXT TO IMAGE*\n┃ ◦ Masukkan teks yang ingin diubah!\n┃ ◦ Format: .texttoimg <teks>\n┃ ◦ Contoh: .texttoimg Hello World\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }

    try {
        const width = 800
        const padding = 50
        const maxTextWidth = width - padding * 2
        
        const tempCanvas = createCanvas(100, 100)
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.font = '32px sans-serif'

        const words = input.split(/\s+/)
        const lines = []
        let currentLine = ''

        for (const word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word
            if (tempCtx.measureText(testLine).width > maxTextWidth) {
                if (currentLine) lines.push(currentLine)
                currentLine = word
            } else {
                currentLine = testLine
            }
        }
        if (currentLine) lines.push(currentLine)

        const lineHeight = 44
        const height = Math.max(300, padding * 2 + lines.length * lineHeight + 60)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        const grad = ctx.createLinearGradient(0, 0, width, height)
        grad.addColorStop(0, '#0f172a')
        grad.addColorStop(1, '#1e293b')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = '#111827'
        ctx.roundRect(25, 25, width - 50, height - 50, 16)
        ctx.fill()
        ctx.strokeStyle = '#374151'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.fillStyle = '#38bdf8'
        ctx.font = 'bold 20px sans-serif'
        ctx.fillText('TEXT TO IMAGE', padding, 70)

        ctx.fillStyle = '#f3f4f6'
        ctx.font = '30px sans-serif'
        let y = 130
        for (const line of lines) {
            ctx.fillText(line, padding, y)
            y += lineHeight
        }

        const result = await canvas.encode('png')
        const caption = `╭┈❀ *TEXT TO IMAGE*\n┃ ◦ Berhasil mengubah teks menjadi gambar\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`

        if (sock?.sendMessage) {
            await sock.sendMessage(m.chat, { image: result, caption }, { quoted: m })
        } else {
            await m.reply(result)
        }
    } catch (err) {
        return m.reply(`╭┈❀ *TEXT TO IMAGE*\n┃ ◦ Gagal membuat gambar: ${err.message}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`)
    }
}

export { pluginConfig as config, handler }

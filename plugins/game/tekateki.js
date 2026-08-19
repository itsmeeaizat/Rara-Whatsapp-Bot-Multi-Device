// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { games } from '../../src/lib/rara-games.js'

games.register('tekateki', {
    alias: ['teka'],
    emoji: '🧩',
    title: 'TEKA-TEKI',
    description: 'Game teka-teki tradisional'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tekateki')
export { pluginConfig as config, handler, answerHandler }

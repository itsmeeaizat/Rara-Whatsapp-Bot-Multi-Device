// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import config from '../../config.js'
import os from 'os'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec);
const pluginConfig = {
    name: 'system',
    alias: ['ram', 'cpu', 'disk', 'latency', 'ping'],
    category: 'main',
    description: 'Menampilkan informasi sistem (RAM, CPU, Disk, Latency)',
    usage: '.ram | .cpu | .disk | .ping',
    isGroup: false,
    isBotAdmin: false,
    isAdmin: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
};

function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

async function getDiskUsage() {
    try {
        if (process.platform === 'win32') {
            const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');
            const lines = stdout.trim().split('\n').slice(1);
            return lines.map(line => {
                const parts = line.trim().split(/\s+/);
                if (parts.length >= 3) {
                    const caption = parts[0];
                    const free = parseInt(parts[1]);
                    const size = parseInt(parts[2]);
                    const used = size - free;
                    return `┃ ➤ *Drive ${caption}*\n┃   Total: ${formatSize(size)}\n┃   Used: ${formatSize(used)}\n┃   Free: ${formatSize(free)}`;
                }
                return null;
            }).filter(Boolean).join('\n');
        } else {
            const { stdout } = await execAsync('df -h /');
            const lines = stdout.trim().split('\n');
            const parts = lines[1].replace(/\s+/g, ' ').split(' ');
            return `┃ ➤ *Disk Usage*\n┃   Total: ${parts[1]}\n┃   Used: ${parts[2]}\n┃   Free: ${parts[3]}\n┃   Use%: ${parts[4]}`;
        }
    } catch (e) {
        return '┃ ❌ Gagal mengambil info disk';
    }
}

async function handler(m, { sock }) {
    const command = m.command.toLowerCase();

    try {
        switch (command) {
            case 'ram': {
                const totalMem = os.totalmem();
                const freeMem = os.freemem();
                const usedMem = totalMem - freeMem;
                const pct = ((usedMem / totalMem) * 100).toFixed(1);

                let txt = `╭─〔 💻 *ʀᴀᴍ ᴜsᴀɢᴇ* 〕\n`
                txt += `┃ ➤ *Total:* ${formatSize(totalMem)}\n`
                txt += `┃ ➤ *Dipakai:* ${formatSize(usedMem)} (${pct}%)\n`
                txt += `┃ ➤ *Bebas:* ${formatSize(freeMem)}\n`
                txt += `┃ ➤ *Platform:* ${os.platform()} (${os.arch()})\n`
                txt += `╰────────────────⬣`
                m.reply(txt);
            }
            break;

            case 'cpu': {
                const cpus = os.cpus();
                const model = cpus[0].model;
                const speed = cpus[0].speed;
                const cores = cpus.length;
                const uptime = os.uptime();
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = Math.floor(uptime % 60);
                const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

                let txt = `╭─〔 🖥️ *ᴄᴘᴜ ɪɴꜰᴏ* 〕\n`
                txt += `┃ ➤ *Model:* ${model.trim()}\n`
                txt += `┃ ➤ *Speed:* ${speed} MHz\n`
                txt += `┃ ➤ *Cores:* ${cores} Core(s)\n`
                txt += `┃ ➤ *Server Uptime:* ${uptimeStr}\n`
                txt += `╰────────────────⬣`
                m.reply(txt);
            }
            break;

            case 'disk': {
                const diskInfo = await getDiskUsage();
                let txt = `╭─〔 💿 *ᴅɪsᴋ ᴜsᴀɢᴇ* 〕\n`
                txt += diskInfo + '\n'
                txt += `╰────────────────⬣`
                m.reply(txt);
            }
            break;

            case 'latency': {
                const timestamp = m.messageTimestamp ? m.messageTimestamp * 1000 : Date.now();
                const now = Date.now();
                const latency = now - timestamp;
                let speed = '';
                if (latency < 100) speed = '🚀 Fast';
                else if (latency < 500) speed = '⚡ Good';
                else if (latency < 1000) speed = '🐢 Oke';
                else speed = '🐌 Slow';

                let txt = `╭─〔 📶 *ʟᴀᴛᴇɴᴄʏ* 〕\n`
                txt += `┃ ➤ *Pong!* 🏓\n`
                txt += `┃ ➤ *Latency:* ${latency}ms\n`
                txt += `┃ ➤ *Response:* ${speed}\n`
                txt += `╰────────────────⬣`
                m.reply(txt);
            }
            break;
        }
    } catch (e) {
        console.error('System Plugin Error:', e);
        m.reply('❌ Terjadi kesalahan mengambil data sistem.');
    }
}

export { pluginConfig as config, handler }

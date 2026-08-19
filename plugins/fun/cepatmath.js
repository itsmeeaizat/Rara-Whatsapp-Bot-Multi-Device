// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
const pluginConfig = {
    name: 'cepatmath',
    alias: ['quickmath', 'mathgame', 'math'],
    category: 'fun',
    description: 'Game matematika cepat untuk melatih berhitung',
    usage: '.cepatmath <jawaban>',
    example: '.cepatmath',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
};

const sessions = new Map();

function generateProblem() {
    const type = Math.floor(Math.random() * 4);
    let problem = '';
    let answer = 0;
    
    if (type === 0) {
        const a = Math.floor(Math.random() * 90) + 10;
        const b = Math.floor(Math.random() * 90) + 10;
        problem = `${a} + ${b}`;
        answer = a + b;
    } else if (type === 1) {
        const a = Math.floor(Math.random() * 80) + 20;
        const b = Math.floor(Math.random() * (a - 1)) + 1;
        problem = `${a} - ${b}`;
        answer = a - b;
    } else if (type === 2) {
        const a = Math.floor(Math.random() * 14) + 2;
        const b = Math.floor(Math.random() * 14) + 2;
        problem = `${a} × ${b}`;
        answer = a * b;
    } else {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 50) + 10;
        const c = Math.floor(Math.random() * 20) + 1;
        problem = `${a} + ${b} - ${c}`;
        answer = a + b - c;
    }
    
    return { problem, answer };
}

async function handler(m) {
    const userId = m.sender;
    const text = m.text?.trim() || '';
    
    if (!sessions.has(userId)) {
        const q = generateProblem();
        sessions.set(userId, { problem: q.problem, answer: q.answer, startTime: Date.now() });
        
        if (!text) {
            const response = `╭┈❀ *CEPAT MATH*\n┃ ◦ Soal: *${q.problem} = ?*\n┃ ◦ Jawab dengan: .cepatmath <jawaban>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
            return m.reply(response);
        }
    }
    
    const session = sessions.get(userId);
    
    if (!text) {
        const response = `╭┈❀ *CEPAT MATH*\n┃ ◦ Soal: *${session.problem} = ?*\n┃ ◦ Jawab dengan: .cepatmath <jawaban>\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const inputLower = text.toLowerCase();
    
    if (inputLower === 'nyerah' || inputLower === 'pass') {
        sessions.delete(userId);
        const response = `╭┈❀ *CEPAT MATH*\n┃ ◦ Kamu menyerah!\n┃ ◦ Soal: ${session.problem}\n┃ ◦ Jawaban Benar: *${session.answer}*\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const userAns = parseInt(text);
    if (isNaN(userAns)) {
        return m.reply(`╭┈❀ *CEPAT MATH*\n┃ ◦ Harap masukkan angka jawaban yang valid!\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`);
    }
    
    if (userAns === session.answer) {
        const timeTaken = Math.max(1, Math.floor((Date.now() - session.startTime) / 1000));
        sessions.delete(userId);
        const response = `╭┈❀ *CEPAT MATH*\n┃ ◦ Selamat! Jawaban kamu BENAR! 🎉\n┃ ◦ Soal: ${session.problem} = *${session.answer}*\n┃ ◦ Waktu: ${timeTaken} detik\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
        return m.reply(response);
    }
    
    const response = `╭┈❀ *CEPAT MATH*\n┃ ◦ Jawaban kamu SALAH! ❌\n┃ ◦ Soal: *${session.problem} = ?*\n┃ ◦ Coba lagi atau ketik: .cepatmath nyerah\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀`;
    return m.reply(response);
}

export { pluginConfig as config, handler };

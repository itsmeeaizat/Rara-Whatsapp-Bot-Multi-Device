// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
import { saluranCtx } from "../../src/lib/rara-context.js";

const pluginConfig = {
  name: "passgen",
  alias: ["password", "genpass", "generatepassword", "pwgen"],
  category: "tools",
  description: "Generate password acak yang aman",
  usage: ".passgen [panjang] [opsi]\nOpsi: -n (angka), -s (simbol), -u (uppercase), -l (lowercase)\nContoh: .passgen 16 -ns (16 karakter dengan angka & simbol)",
  example: ".passgen 12",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: true,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

const CHARSET = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?/",
};

function generatePassword(length, options) {
  let pool = "";
  let required = [];

  if (options.includes("l") || (!options.includes("u") && !options.includes("n") && !options.includes("s"))) {
    pool += CHARSET.lower;
    required.push(CHARSET.lower);
  }
  if (options.includes("u")) {
    pool += CHARSET.upper;
    required.push(CHARSET.upper);
  }
  if (options.includes("n")) {
    pool += CHARSET.number;
    required.push(CHARSET.number);
  }
  if (options.includes("s")) {
    pool += CHARSET.symbol;
    required.push(CHARSET.symbol);
  }

  if (!pool) {
    pool = CHARSET.lower + CHARSET.upper + CHARSET.number;
    required = [CHARSET.lower, CHARSET.upper, CHARSET.number];
  }

  const crypto = require("crypto");
  let password = "";

  for (const req of required) {
    password += req[crypto.randomInt(req.length)];
  }

  for (let i = password.length; i < length; i++) {
    password += pool[crypto.randomInt(pool.length)];
  }

  password = password
    .split("")
    .sort(() => crypto.randomInt(3) - 1)
    .join("");

  return password;
}

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  if (score >= 6) return { label: "Sangat Kuat 💪", bar: "████████" };
  if (score >= 4) return { label: "Kuat ✅", bar: "██████░░" };
  if (score >= 2) return { label: "Lemah ⚠️", bar: "████░░░░" };
  return { label: "Sangat Lemah ❌", bar: "██░░░░░░" };
}

async function handler(m, { args }) {
  let length = 12;
  let options = "";

  for (const arg of args) {
    if (/^\d+$/.test(arg)) length = parseInt(arg);
    else if (arg.startsWith("-")) options += arg.slice(1).toLowerCase();
  }

  if (length < 4) length = 4;
  if (length > 64) length = 64;

  const password = generatePassword(length, options);
  const strength = getStrength(password);

  await m.react("🔐");
  await m.reply(
    `🔐 *Password Generator*\n\n` +
    `> 🔑 Password: \`\`\`${password}\`\`\`\n` +
    `> 📏 Panjang: *${password.length} karakter*\n` +
    `> 💪 Kekuatan: *${strength.label}*\n` +
    `> 📊 ${strength.bar}\n\n` +
    `_Password dihasilkan secara acak dengan crypto.random_`,
    { contextInfo: saluranCtx() }
  );
}

export { pluginConfig as config, handler };

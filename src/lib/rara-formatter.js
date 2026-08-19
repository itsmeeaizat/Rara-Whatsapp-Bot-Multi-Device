// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA

import config from '../../config.js'
import * as timeHelper from './rara-time.js'
/**
 * @typedef {Object} DashboardData
 * @property {string} userName - Nama user
 * @property {string} userStatus - Status user (Owner/Premium/Free)
 * @property {string} mode - Mode bot (Public/Self)
 * @property {number} totalUsers - Total pengguna bot
 * @property {number} userLimit - Limit user
 */

/**
 * @typedef {Object} BotInfoData
 * @property {string} botName - Nama bot
 * @property {string} developer - Nama developer
 * @property {string} version - Versi bot
 * @property {string} uptime - Uptime bot
 * @property {number} totalFeatures - Total fitur
 * @property {string} mode - Mode bot
 * @property {string} platform - Platform bot
 */

/**
 * @typedef {Object} UserProfileData
 * @property {string} name - Nama user
 * @property {string} number - Nomor user
 * @property {string} status - Status (Owner/Premium/Free)
 * @property {number} limit - Limit tersisa
 * @property {string} registeredAt - Tanggal registrasi
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} name - Nama kategori
 * @property {string} emoji - Emoji kategori
 * @property {string} description - Deskripsi kategori
 * @property {string[]} commands - Array command dalam kategori
 */

/**
 * Karakter untuk styling menu Rara
 * @constant
 */
const CHARS = {
  cornerTopLeft: "╭",
  cornerBottomLeft: "╰",
  dotted: "┈",
  vertical: "┃",
  bullet: "◦",
  floral: "❀",
  dot: "•",
  check: "✓",
  cross: "✗",
  line: "━",
};

/**
 * Label pengganti emoji native (Rara aesthetic — no native emojis)
 * @constant
 */
const EMOJIS = {
  dashboard: "",
  info: "",
  user: "",
  bot: "",
  owner: "",
  premium: "",
  free: "",
  public: "",
  self: "",
  commands: "",
  utilities: "",
  fun: "",
  group: "",
  time: "",
  uptime: "",
  version: "",
  speed: "",
  limit: "",
  status: "",
  mode: "",
  name: "",
  number: "",
  developer: "",
  total: "",
  tip: "",
  warning: "",
  success: "",
  error: "",
  loading: "",
};

/**
 * Format uptime menjadi string yang mudah dibaca
 * @param {number} ms - Uptime dalam milliseconds
 * @returns {string} Formatted uptime string
 * @example
 * formatUptime(3661000); // "1h 1m 1s"
 * formatUptime(86400000); // "1d 0h 0m"
 */
function formatUptime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}

/**
 * Format tanggal ke format lokal Indonesia
 * @param {Date|number|string} date - Tanggal untuk diformat
 * @returns {string} Formatted date string
 * @example
 * formatDate(new Date()); // "17/12/2024, 12:30:45"
 */
function formatDate(date) {
  return timeHelper.fromTimestamp(date, "DD/MM/YYYY HH:mm:ss");
}

/**
 * Format nomor telepon ke format yang lebih readable
 * @param {string} number - Nomor telepon
 * @returns {string} Formatted number
 * @example
 * formatNumber('6281234567890'); // '62 812-3456-7890'
 */
function formatNumber(number) {
  if (!number) return "";
  const cleaned = number.replace(/[^0-9]/g, "");
  if (cleaned.length < 10) return cleaned;

  if (cleaned.startsWith("62")) {
    const withoutCode = cleaned.slice(2);
    const formatted = withoutCode.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    return `62 ${formatted}`;
  }

  return cleaned;
}

/**
 * Format ukuran file ke format yang readable
 * @param {number} bytes - Ukuran dalam bytes
 * @returns {string} Formatted size string
 * @example
 * formatFileSize(1024); // "1.00 KB"
 * formatFileSize(1048576); // "1.00 MB"
 */
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Buat garis dotted (┈)
 * @param {number} length - Panjang garis
 * @param {string} [char] - Karakter untuk garis
 * @returns {string} String garis
 */
function createLine(length = 20, char = CHARS.dotted) {
  return char.repeat(length);
}

/**
 * Buat header Rara bracket box
 * @param {string} title - Judul header
 * @param {number} [width=20] - Lebar box (unused, kept for compatibility)
 * @returns {string} Header string
 * @example
 * createHeader('DASHBOARD');
 * // "╭┈❀ *DASHBOARD*"
 */
function createHeader(title, width = 20) {
  return `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *${title}*`;
}

/**
 * Buat footer Rara bracket box
 * @param {number} [width=20] - Lebar box (unused, kept for compatibility)
 * @returns {string} Footer string
 * @example
 * createFooter(); // "╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈❀"
 */
function createFooter(width = 20) {
  return `${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`;
}

/**
 * Buat baris body dengan bullet Rara
 * @param {string} text - Text untuk baris
 * @param {string} [prefix] - Prefix baris
 * @param {string} [bullet] - Karakter bullet
 * @returns {string} Formatted body line
 */
function createBodyLine(text, prefix = CHARS.vertical, bullet = CHARS.bullet) {
  return `${prefix} ${bullet} ${text}`;
}

/**
 * Buat baris dengan label: value
 * @param {string} label - Label
 * @param {string} value - Nilai
 * @returns {string} Formatted line
 * @example
 * createArrowLine('Nama', 'Rara-AI'); // "┃ ◦ Nama: Rara-AI"
 */
function createArrowLine(label, value) {
  return `${CHARS.vertical} ${CHARS.bullet} ${label}: ${value}`;
}

/**
 * Buat dashboard info (Rara bracket box)
 * @param {DashboardData} data - Data untuk dashboard
 * @returns {string} Formatted dashboard string
 */
function createDashboard(data) {
  const {
    userName = "User",
    userStatus = "Free User",
    mode = "Public",
    totalUsers = 0,
    userLimit = 25,
  } = data;

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *DASHBOARD*`,
    `${CHARS.vertical}`,
    createArrowLine("Nama", userName),
    createArrowLine("Status User", userStatus),
    createArrowLine("Mode", mode),
    createArrowLine("Pengguna", totalUsers.toString()),
    createArrowLine("Limit", userLimit.toString()),
    `${CHARS.vertical}`,
    `${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`,
  ];

  return lines.join("\n");
}

/**
 * Buat info bot (Rara bracket box)
 * @param {BotInfoData} data - Data info bot
 * @returns {string} Formatted bot info string
 */
function createBotInfo(data) {
  const {
    botName = config.bot?.name || "Rara-AI",
    developer = config.owner?.name || "Owner",
    version = config.bot?.version || "1.0.0",
    uptime = "0s",
    totalFeatures = 0,
    mode = config.mode || "public",
    platform = "Node.js",
  } = data;

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *BOT INFO*`,
    `${CHARS.vertical}`,
    createArrowLine("Nama-Bot", botName),
    createArrowLine("Developer", developer),
    createArrowLine("Mode", mode.charAt(0).toUpperCase() + mode.slice(1)),
    createArrowLine("Version", version),
    createArrowLine("Uptime", uptime),
    createArrowLine("Total-Fitur", totalFeatures.toString()),
    createArrowLine("Platform", platform),
    `${CHARS.vertical}`,
    `${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`,
  ];

  return lines.join("\n");
}

/**
 * Buat user profile (Rara bracket box)
 * @param {UserProfileData} data - Data user profile
 * @returns {string} Formatted user profile string
 */
function createUserProfile(data) {
  const {
    name = "User",
    number = "",
    status = "Free",
    limit = 25,
    registeredAt = "",
  } = data;

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *USER PROFILE*`,
    `${CHARS.vertical}`,
    createArrowLine("Nama", name),
    createArrowLine("Nomor", formatNumber(number)),
    createArrowLine("Status", status),
    createArrowLine("Limit", limit.toString()),
  ];

  if (registeredAt) {
    lines.splice(5, 0, createArrowLine("Daftar", registeredAt));
  }

  lines.push(`${CHARS.vertical}`);
  lines.push(`${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`);

  return lines.join("\n");
}

/**
 * Buat status bot (Rara bracket box)
 * @param {Object} data - Data status bot
 * @returns {string} Formatted bot status string
 */
function createBotStatus(data) {
  const {
    botName = config.bot?.name || "Rara-AI",
    uptime = "0s",
    mode = "Public",
    totalCommands = 0,
    totalUsers = 0,
    speed = "0.00s",
  } = data;

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *BOT STATUS*`,
    `${CHARS.vertical}`,
    createArrowLine("Bot", botName),
    createArrowLine("Uptime", uptime),
    createArrowLine("Mode", mode),
    createArrowLine("Commands", `${totalCommands} fitur`),
    createArrowLine("Pengguna", `${totalUsers} users`),
    createArrowLine("Speed", speed),
    `${CHARS.vertical}`,
    `${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`,
  ];

  return lines.join("\n");
}

/**
 * Buat kategori menu (Rara bracket box)
 * @param {MenuCategory} category - Data kategori
 * @param {string} prefix - Prefix command
 * @returns {string} Formatted category menu
 */
function createCategoryMenu(category, prefix = config.command?.prefix || ".") {
  const { name, emoji, description = "", commands = [] } = category;

  if (commands.length === 0) {
    return "";
  }

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *${name.toUpperCase()}*`,
    `${CHARS.vertical}`,
  ];

  for (const cmd of commands) {
    lines.push(`${CHARS.vertical} ${CHARS.bullet} ${prefix}${cmd}`);
  }

  lines.push(`${CHARS.vertical}`);
  lines.push(`${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`);

  return lines.join("\n");
}

/**
 * Buat kategori menu dengan sub-description (Rara bracket box)
 * @param {Object} data - Data kategori menu
 * @returns {string} Formatted category section
 */
function createCategorySection(data) {
  const { emoji, title, command, description, prefix = "." } = data;

  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *${title.toUpperCase()}*`,
    `${CHARS.vertical}`,
    `${CHARS.vertical} ${CHARS.bullet} Ketik: ${prefix}${command}`,
    `${CHARS.vertical} ${CHARS.bullet} ${description || ""}`,
    `${CHARS.vertical}`,
    `${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`,
  ];

  return lines.join("\n");
}

/**
 * Buat main menu lengkap (Rara aesthetic)
 * @param {Object} data - Data untuk main menu
 * @returns {string} Formatted main menu string
 */
function createMainMenu(data) {
  const {
    greeting = "",
    userName = "User",
    userStatus = "Free User",
    categories = [],
    botInfo = {},
    prefix = config.command?.prefix || ".",
  } = data;

  const parts = [];

  if (greeting) {
    parts.push(greeting);
    parts.push("");
  }

  parts.push(createDashboard({ userName, userStatus, ...data }));
  parts.push("");

  parts.push(createBotInfo(botInfo));
  parts.push("");

  for (const category of categories) {
    parts.push(
      createCategorySection({
        ...category,
        prefix,
      }),
    );
  }

  parts.push(`*Tips:* Jika kamu tidak tahu cara menggunakan Bot`);
  parts.push(`Kamu bisa tanya ke owner`);
  parts.push(`${CHARS.vertical} Mode: ${data.mode || "Public"}`);

  return parts.join("\n");
}

/**
 * Buat command list untuk kategori tertentu (Rara bracket box)
 * @param {string} categoryName - Nama kategori
 * @param {string[]} commands - Array command
 * @param {string} prefix - Prefix command
 * @returns {string} Formatted command list
 */
function createCommandList(categoryName, commands, prefix = ".") {
  const lines = [
    `${CHARS.cornerTopLeft}${CHARS.dotted}${CHARS.floral} *${categoryName.toUpperCase()}*`,
    `${CHARS.vertical}`,
  ];

  for (const cmd of commands) {
    lines.push(`${CHARS.vertical} ${CHARS.bullet} ${prefix}${cmd}`);
  }

  lines.push(`${CHARS.vertical}`);
  lines.push(`${CHARS.cornerBottomLeft}${createLine(20)}${CHARS.floral}`);

  return lines.join("\n");
}

/**
 * Buat pesan wait/loading
 * @param {string} [message='Tunggu sebentar...'] - Pesan loading
 * @returns {string} Formatted wait message
 */
function createWaitMessage(message = "Tunggu sebentar...") {
  return `*${message}*`;
}

/**
 * Buat pesan sukses
 * @param {string} [message='Berhasil!'] - Pesan sukses
 * @returns {string} Formatted success message
 */
function createSuccessMessage(message = "Berhasil!") {
  return `*${message}*`;
}

/**
 * Buat pesan error
 * @param {string} [message='Terjadi kesalahan!'] - Pesan error
 * @returns {string} Formatted error message
 */
function createErrorMessage(message = "Terjadi kesalahan!") {
  return `*${message}*`;
}

/**
 * Buat pesan warning
 * @param {string} message - Pesan warning
 * @returns {string} Formatted warning message
 */
function createWarningMessage(message) {
  return `*${message}*`;
}

/**
 * Mendapatkan greeting berdasarkan waktu (no native emojis)
 * @returns {string} Greeting message
 * @example
 * getTimeGreeting(); // "Selamat Pagi" (jika pagi hari)
 */
function getTimeGreeting() {
  const hour = timeHelper.getHour();

  if (hour >= 4 && hour < 10) return "Selamat Pagi";
  if (hour >= 10 && hour < 15) return "Selamat Siang";
  if (hour >= 15 && hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

/**
 * Capitalize setiap kata dalam string
 * @param {string} str - String untuk di-capitalize
 * @returns {string} Capitalized string
 * @example
 * capitalize('hello world'); // "Hello World"
 */
function capitalize(str) {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Truncate text jika terlalu panjang
 * @param {string} text - Text untuk di-truncate
 * @param {number} maxLength - Panjang maksimal
 * @param {string} [suffix='...'] - Suffix jika di-truncate
 * @returns {string} Truncated text
 */
function truncate(text, maxLength, suffix = "...") {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

export { CHARS, EMOJIS, formatUptime, formatDate, formatNumber, formatFileSize, createLine, createHeader, createFooter, createBodyLine, createArrowLine, createDashboard, createBotInfo, createUserProfile, createBotStatus, createCategoryMenu, createCategorySection, createMainMenu, createCommandList, createWaitMessage, createSuccessMessage, createErrorMessage, createWarningMessage, getTimeGreeting, capitalize, truncate }

// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
let _canvas = null;
async function _getCanvas() {
  if (!_canvas) _canvas = await import("@napi-rs/canvas");
  return _canvas;
}

import fs from "fs";
import path from "path";
import axios from "axios";

const DEFAULT_AVATAR = "https://i.imgur.com/TuItj4L.png";

/* ── Helper: load avatar with fallback ─────────────────────── */
async function loadAvatarSafe(avatarUrl) {
  const { loadImage } = await _getCanvas();
  const localFallback = path.join(
    process.cwd(),
    "assets",
    "images",
    "pp-kosong.jpg",
  );

  try {
    if (!avatarUrl) {
      if (fs.existsSync(localFallback)) {
        return await loadImage(fs.readFileSync(localFallback));
      }
      return await loadImage(DEFAULT_AVATAR);
    }

    if (
      avatarUrl === localFallback ||
      (typeof avatarUrl === "string" && avatarUrl.includes("pp-kosong"))
    ) {
      if (fs.existsSync(localFallback)) {
        return await loadImage(fs.readFileSync(localFallback));
      }
    }

    if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
      const response = await axios.get(avatarUrl, {
        responseType: "arraybuffer",
        timeout: 10000,
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      return await loadImage(Buffer.from(response.data));
    }

    if (fs.existsSync(avatarUrl)) {
      return await loadImage(fs.readFileSync(avatarUrl));
    }

    if (fs.existsSync(localFallback)) {
      return await loadImage(fs.readFileSync(localFallback));
    }

    return await loadImage(DEFAULT_AVATAR);
  } catch {
    try {
      if (fs.existsSync(localFallback)) {
        return await loadImage(fs.readFileSync(localFallback));
      }
      return await loadImage(DEFAULT_AVATAR);
    } catch {
      return null;
    }
  }
}

/* ── Helper: rounded rect ──────────────────────────────────── */
function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── Helper: draw floral / decorative petals ───────────────── */
function drawPetal(ctx, cx, cy, size, rotation, color, alpha) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha || 0.08;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.6, size * 0.35, size * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFlower(ctx, cx, cy, size, color, alpha) {
  var a = alpha || 0.06;
  for (var i = 0; i < 8; i++) {
    var angle = (Math.PI / 4) * i;
    drawPetal(ctx, cx, cy, size, angle, color, a);
  }
}

/* ── Helper: draw sparkle dots ─────────────────────────────── */
function drawSparkles(ctx, width, height, count, color) {
  ctx.fillStyle = color || "rgba(255, 182, 217, 0.3)";
  var seed = 12345;
  for (var i = 0; i < (count || 25); i++) {
    seed = (seed * 9301 + 49297) % 233280;
    var x = (seed / 233280) * width;
    seed = (seed * 9301 + 49297) % 233280;
    var y = (seed / 233280) * height;
    seed = (seed * 9301 + 49297) % 233280;
    var r = ((seed / 233280) * 2.5) + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ── Helper: circular avatar clip ──────────────────────────── */
function clipCircle(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
}

/* ── Helper: truncate text ────────────────────────────────── */
function truncate(text, maxLen) {
  var ml = maxLen || 18;
  if (!text) return "Unknown";
  return text.length > ml ? text.substring(0, ml) + "\u2026" : text;
}

/* ════════════════════════════════════════════════════════════
 *  WELCOME CARD — Pink/Purple Floral Theme (Rara Multi Device)
 * ════════════════════════════════════════════════════════════ */
async function createWelcomeCardV4(username, avatarUrl, groupName, memberCount) {
  const { createCanvas } = await _getCanvas();
  const width = 1024;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ── Background: dark purple to magenta gradient ────────────
  var bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#1a0a2e");
  bg.addColorStop(0.4, "#2d1b4e");
  bg.addColorStop(0.7, "#4a1942");
  bg.addColorStop(1, "#1a0a2e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // ── Radial glow (pink, top-right) ──────────────────────────
  var glow1 = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, 400);
  glow1.addColorStop(0, "rgba(236, 72, 153, 0.25)");
  glow1.addColorStop(1, "rgba(236, 72, 153, 0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  // ── Radial glow (purple, bottom-left) ──────────────────────
  var glow2 = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, 350);
  glow2.addColorStop(0, "rgba(168, 85, 247, 0.2)");
  glow2.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // ── Decorative flowers ────────────────────────────────────
  drawFlower(ctx, 80, 80, 60, "#ec4899", 0.05);
  drawFlower(ctx, width - 100, 100, 70, "#a855f7", 0.05);
  drawFlower(ctx, 60, height - 60, 50, "#f472b6", 0.04);
  drawFlower(ctx, width - 80, height - 80, 65, "#c026d3", 0.04);
  drawFlower(ctx, width / 2, 40, 45, "#e879f9", 0.03);

  // ── Sparkles ───────────────────────────────────────────────
  drawSparkles(ctx, width, height, 30, "rgba(255, 182, 217, 0.35)");

  // ── Glass card ─────────────────────────────────────────────
  var cardX = 40;
  var cardY = 40;
  var cardW = width - 80;
  var cardH = height - 80;
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  ctx.strokeStyle = "rgba(236, 72, 153, 0.25)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 30);
  ctx.fill();
  ctx.stroke();

  // ── Top accent bar (pink gradient) ─────────────────────────
  var accentGrad = ctx.createLinearGradient(cardX, 0, cardX + cardW, 0);
  accentGrad.addColorStop(0, "#ec4899");
  accentGrad.addColorStop(0.5, "#a855f7");
  accentGrad.addColorStop(1, "#ec4899");
  ctx.fillStyle = accentGrad;
  drawRoundedRect(ctx, cardX + 20, cardY + 15, cardW - 40, 4, 2);
  ctx.fill();

  // ── Avatar: circular with pink glow ring ───────────────────
  var avatarSize = 200;
  var avatarX = 220;
  var avatarY = height / 2;

  // Glow
  ctx.save();
  ctx.shadowColor = "#ec4899";
  ctx.shadowBlur = 50;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

  // Clip & draw avatar
  ctx.save();
  clipCircle(ctx, avatarX, avatarY, avatarSize / 2 - 8);
  try {
    var avatar = await loadAvatarSafe(avatarUrl);
    if (avatar) {
      ctx.drawImage(avatar, avatarX - avatarSize / 2 + 8, avatarY - avatarSize / 2 + 8, avatarSize - 16, avatarSize - 16);
    }
  } catch (e) {
    ctx.fillStyle = "#4a1942";
    ctx.fillRect(avatarX - avatarSize / 2 + 8, avatarY - avatarSize / 2 + 8, avatarSize - 16, avatarSize - 16);
  }
  ctx.restore();

  // Pink ring border
  ctx.strokeStyle = "#ec4899";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Inner thin ring
  ctx.strokeStyle = "rgba(255, 182, 217, 0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2 - 6, 0, Math.PI * 2);
  ctx.stroke();

  // ── Text area ──────────────────────────────────────────────
  var textX = 380;
  var cleanName = truncate(username, 16);

  // WELCOME badge
  ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
  drawRoundedRect(ctx, textX, 100, 180, 38, 19);
  ctx.fill();
  ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#f9a8d4";
  ctx.font = "bold 16px Courier New";
  ctx.fillText("\u2661 WELCOME", textX + 18, 124);

  // Username with gradient
  ctx.font = "900 52px Arial";
  var nameMetric = ctx.measureText(cleanName);
  var nameGrad = ctx.createLinearGradient(textX, 0, textX + nameMetric.width, 0);
  nameGrad.addColorStop(0, "#ffffff");
  nameGrad.addColorStop(0.5, "#f9a8d4");
  nameGrad.addColorStop(1, "#ec4899");
  ctx.fillStyle = nameGrad;
  ctx.fillText(cleanName, textX, 185);

  // Group name
  ctx.font = "22px Arial";
  ctx.fillStyle = "#c4b5fd";
  ctx.fillText("Bergabung ke: " + truncate(groupName, 25), textX, 225);

  // Divider line
  ctx.strokeStyle = "rgba(236, 72, 153, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(textX, 255);
  ctx.lineTo(textX + 300, 255);
  ctx.stroke();

  // Member count badge
  var memberText = "Member ke-" + memberCount;
  ctx.font = "bold 22px Arial";
  var badgeWidth = ctx.measureText(memberText).width + 50;
  ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
  drawRoundedRect(ctx, textX, 285, badgeWidth, 42, 21);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#e9d5ff";
  ctx.fillText(memberText, textX + 25, 312);

  // ── Bottom branding: Rara Multi Device ─────────────────────
  ctx.font = "italic 16px Arial";
  ctx.fillStyle = "rgba(249, 168, 212, 0.6)";
  ctx.fillText("\u273f Rara Multi Device \u273f", textX, 365);

  // ── Decorative corner accents ──────────────────────────────
  drawFlower(ctx, width - 70, 70, 40, "#ec4899", 0.08);
  drawFlower(ctx, 70, height - 70, 35, "#a855f7", 0.08);

  return canvas.toBuffer("image/png");
}

/* ════════════════════════════════════════════════════════════
 *  GOODBYE CARD — Dark Pink/Rose Theme (Rara Multi Device)
 * ════════════════════════════════════════════════════════════ */
async function createGoodbyeCardV4(username, avatarUrl, groupName, memberCount) {
  const { createCanvas } = await _getCanvas();
  const width = 1024;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ── Background: dark burgundy to deep mauve ────────────────
  var bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#1a0510");
  bg.addColorStop(0.4, "#2d0a1f");
  bg.addColorStop(0.7, "#3d1025");
  bg.addColorStop(1, "#1a0510");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // ── Radial glow (rose, top-right) ──────────────────────────
  var glow1 = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, 400);
  glow1.addColorStop(0, "rgba(244, 63, 94, 0.2)");
  glow1.addColorStop(1, "rgba(244, 63, 94, 0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  // ── Radial glow (purple, bottom-left) ──────────────────────
  var glow2 = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, 350);
  glow2.addColorStop(0, "rgba(168, 85, 247, 0.12)");
  glow2.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // ── Decorative flowers (faded) ─────────────────────────────
  drawFlower(ctx, 80, 80, 55, "#f43f5e", 0.04);
  drawFlower(ctx, width - 100, 100, 65, "#a855f7", 0.03);
  drawFlower(ctx, 60, height - 60, 45, "#e11d48", 0.03);
  drawFlower(ctx, width - 80, height - 80, 60, "#c026d3", 0.03);

  // ── Sparkles (dimmer) ──────────────────────────────────────
  drawSparkles(ctx, width, height, 20, "rgba(251, 113, 133, 0.2)");

  // ── Glass card ─────────────────────────────────────────────
  var cardX = 40;
  var cardY = 40;
  var cardW = width - 80;
  var cardH = height - 80;
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  ctx.strokeStyle = "rgba(244, 63, 94, 0.2)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 30);
  ctx.fill();
  ctx.stroke();

  // ── Top accent bar (rose gradient) ─────────────────────────
  var accentGrad = ctx.createLinearGradient(cardX, 0, cardX + cardW, 0);
  accentGrad.addColorStop(0, "#f43f5e");
  accentGrad.addColorStop(0.5, "#a855f7");
  accentGrad.addColorStop(1, "#f43f5e");
  ctx.fillStyle = accentGrad;
  drawRoundedRect(ctx, cardX + 20, cardY + 15, cardW - 40, 4, 2);
  ctx.fill();

  // ── Avatar: circular with rose glow ring ───────────────────
  var avatarSize = 200;
  var avatarX = 220;
  var avatarY = height / 2;

  // Glow
  ctx.save();
  ctx.shadowColor = "#f43f5e";
  ctx.shadowBlur = 45;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

  // Clip & draw avatar
  ctx.save();
  clipCircle(ctx, avatarX, avatarY, avatarSize / 2 - 8);
  try {
    var avatar = await loadAvatarSafe(avatarUrl);
    if (avatar) {
      ctx.drawImage(avatar, avatarX - avatarSize / 2 + 8, avatarY - avatarSize / 2 + 8, avatarSize - 16, avatarSize - 16);
    }
  } catch (e) {
    ctx.fillStyle = "#2d0a1f";
    ctx.fillRect(avatarX - avatarSize / 2 + 8, avatarY - avatarSize / 2 + 8, avatarSize - 16, avatarSize - 16);
  }
  ctx.restore();

  // Rose ring border
  ctx.strokeStyle = "#f43f5e";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Inner thin ring
  ctx.strokeStyle = "rgba(251, 113, 133, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2 - 6, 0, Math.PI * 2);
  ctx.stroke();

  // ── Text area ──────────────────────────────────────────────
  var textX = 380;
  var cleanName = truncate(username, 16);

  // GOODBYE badge
  ctx.fillStyle = "rgba(244, 63, 94, 0.12)";
  drawRoundedRect(ctx, textX, 100, 170, 38, 19);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#fda4af";
  ctx.font = "bold 16px Courier New";
  ctx.fillText("\u2661 GOODBYE", textX + 18, 124);

  // Username with gradient
  ctx.font = "900 52px Arial";
  var nameMetric = ctx.measureText(cleanName);
  var nameGrad = ctx.createLinearGradient(textX, 0, textX + nameMetric.width, 0);
  nameGrad.addColorStop(0, "#ffffff");
  nameGrad.addColorStop(0.5, "#fda4af");
  nameGrad.addColorStop(1, "#f43f5e");
  ctx.fillStyle = nameGrad;
  ctx.fillText(cleanName, textX, 185);

  // Group name
  ctx.font = "22px Arial";
  ctx.fillStyle = "#c4b5fd";
  ctx.fillText("Meninggalkan: " + truncate(groupName, 25), textX, 225);

  // Divider line
  ctx.strokeStyle = "rgba(244, 63, 94, 0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(textX, 255);
  ctx.lineTo(textX + 300, 255);
  ctx.stroke();

  // Member count badge
  var memberText = "Sisa " + memberCount + " member";
  ctx.font = "bold 22px Arial";
  var badgeWidth = ctx.measureText(memberText).width + 50;
  ctx.fillStyle = "rgba(168, 85, 247, 0.12)";
  drawRoundedRect(ctx, textX, 285, badgeWidth, 42, 21);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#e9d5ff";
  ctx.fillText(memberText, textX + 25, 312);

  // ── Bottom branding ────────────────────────────────────────
  ctx.font = "italic 16px Arial";
  ctx.fillStyle = "rgba(253, 164, 175, 0.5)";
  ctx.fillText("\u273f Rara Multi Device \u273f", textX, 365);

  // ── Decorative corner accents ──────────────────────────────
  drawFlower(ctx, width - 70, 70, 35, "#f43f5e", 0.06);
  drawFlower(ctx, 70, height - 70, 30, "#a855f7", 0.05);

  return canvas.toBuffer("image/png");
}

/* ════════════════════════════════════════════════════════════
 *  LEGACY ALIASES (backward compatibility)
 * ════════════════════════════════════════════════════════════ */
async function createWideDiscordCard(username, avatarUrl, groupName, memberCount) {
  return createWelcomeCardV4(username, avatarUrl, groupName, memberCount);
}

async function createGoodbyeCard(username, avatarUrl, groupName, memberCount) {
  return createGoodbyeCardV4(username, avatarUrl, groupName, memberCount);
}

export {
  createWideDiscordCard,
  createGoodbyeCard,
  createWelcomeCardV4,
  createGoodbyeCardV4,
};

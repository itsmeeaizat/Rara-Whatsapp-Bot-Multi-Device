<div align="center">
  <h1>🌟 Rara WhatsApp Bot MD 🌟</h1>
  <p><b>🚀 Bot WhatsApp Multi-Device berbasis Baileys (Node.js) dengan 794 Plugin & 34 Kategori!</b></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.3-orange?style=flat-square&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Total_Plugin-794-blue?style=flat-square&logo=fire">
  <img src="https://img.shields.io/badge/Kategori-34-green?style=flat-square&logo=folder">
  <img src="https://img.shields.io/badge/Node.js-20--22-green?style=flat-square&logo=node.js">
  <img src="https://img.shields.io/badge/Baileys-MultiDevice-blue?style=flat-square&logo=whatsapp">
</p>

---

## 📌 Tentang Rara MD

**Rara Multi Device** adalah bot WhatsApp berbasis Baileys (Multi-Device) yang dikembangkan oleh **Aizat**. Bot ini menggunakan sistem plugin modular dengan 794 plugin yang tersebar di 34 kategori, mendukung fitur AI, RPG, download, stalker, tools, group management, dan masih banyak lagi.

---

## ✨ Fitur Unggulan v3.3

### 🤖 AI Integration
Integrasi AI dengan berbagai model dari berbagai provider:
* OpenAI (GPT-4, GPT-5, DeepSeek, Qwen3)
* Google Gemini
* Claude (Haiku)
* Dolphin, Kobo AI, Simi
* AI Grup Participation — bot ikut chat di grup
* Text to Image (text2img, toanime, toghibli, tocartoon, tochibi, dll)
* Konfigurasi via DM: `.ai-set apiKey <key>`

### 🏗️ Sistem Sewa Bot (Step-by-Step)
Pendaftaran sewa dengan data diri lengkap:
* Ketik `.daftarsewa` → tanya nama → umur → asal → link grup + durasi
* Auto-join grup setelah approve
* Auto-expired dengan notifikasi
* Owner: `.approvesewa` / `.rejectsewa`

### 📢 Saluran WA Broadcast Terpusat (Auto Broadcast)
Sistem broadcast otomatis yang mengirim notifikasi ke saluran WhatsApp resmi setiap ada event penting.

*Fitur:*
* Auto-broadcast realtime ke saluran WA
* 8 event terintegrasi dengan format pesan rapi
* Bisa set manual via config.js atau command
* Bisa buat saluran baru langsung dari bot
* Auto-join saluran setelah setup

*Command:*
* `.setsaluran <link>` — Set saluran WA existing
* `.buatsaluran <nama>` — Buat saluran baru dari bot

### 🛡️ Moderasi Grup (Modular)
* Anti-18+ — deteksi konten dewasa
* Anti-Judi — deteksi promosi judi
* Anti-Bucin — deteksi spam bucin berlebihan
* Anti-Kasar — deteksi kata kasar
* Anti-Keributan — deteksi pertengkaran
* 3x warn system, auto-kick, auto-delete
* Admin immune, default OFF saat pairing baru

### 🎮 RPG System (67 Modul)
* Adventure, hunting, mining, berladang
* Economy, inventory, leveling, bank
* Crafting, blacksmith, alchemy, breeding
* Battle, boss, arena, dungeon
* Co-op Farm & Guild War
* Cooking stamina boost
* Market fluctuation dynamics

### 🤖 Jadibot (Multi-Device)
* Pairing Code & QR
* 3-mode access control:
  - all (semua user)
  - premium (khusus premium)
  - specific (user tertentu)
* Setup: `.setjadibot <mode>`

### 🌤️ Weather Auto-Broadcast
* Realtime data Open-Meteo & wttr.in
* Dual weather system (V1 & V2)
* 4 cycle: pagi, siang, sore, malam
* Auto-broadcast ke grup aktif
* Default OFF saat pairing baru

### 🕒 Adzan 3-Layer Notification
* Layer 1: Reminder 15 menit sebelum
* Layer 2: Adzan + audio
* Layer 3: Iqamah announcement
* Default OFF saat pairing baru

### 💼 Auto-Loker
* Multiple job sources
* Thumbnail + logo perusahaan
* Auto-expiration filtering
* Default OFF saat pairing baru

### 🎨 Menu System
* Multiple variations: image, box-style, buttons, video, list
* 6 tombol: Kategori, Info, All Menu, Tanya AI, Rules, Owner
* Welcome/Goodbye: random variations

### 📋 Plugin About Rara
* Info creator (Aizat)
* Script info, statistik bot
* Link ke `.menu`, `.owner`, `.donasi`

### 🆕 Fitur Baru v3.3

### 💰 Daily Claim System (V1 + V2)
* V1: Streak 7 hari, base 200 Gold + 50 Exp
* V2: Streak + lucky roll + milestone + weekly bonus
* Milestone: 3/7/14/30 hari (bonus besar)
* Lucky roll: 1/7 chance bonus random
* Premium: x2 multiplier semua reward

### 👁️ Auto Status View (Unified)
* Gabungan auto read + auto react story
* `.autostatusview read/react/all on/off`
* Non-blocking processing

### 🛡️ Anti-Spam Suite (3 Layer)
* Antispam DM — proteksi private chat (mute system)
* Antispam Menu V2 — rate limit `.menu`/`.allmenu` di grup
* Antispam Fitur — rate limit command fitur di grup
* Owner bypass semua limit

### 📝 Personal Reminder
* `.remind <waktu> <teks>` — set pengingat pribadi
* Support s/m/h/d/w duration
* Anti-spam: max 3 creation per 60s

### 📊 Advanced Polling
* `.poll` — voting dengan auto-close timer
* Multi-choice support
* Real-time update

### 🔘 Navigation Buttons System (.menunav)
* Tombol Kembali → kembali ke menu utama
* Tombol Tanya AI → context-aware AI help
* Toggle global: `.menunav on/off`
* Toggle per-grup: `.menunav group on/off/reset`

### 🏪 Toko & Order Management System
* `.toko add <nama>|<harga>|<kategori>` — Tambah produk
* `.toko list` — Lihat semua produk
* `.toko del <id>` — Hapus produk
* `.belanja <id>` — Belanja produk
* Auto-notifikasi ke buyer saat order dibuat

### 💳 Payment System (.setpayment)
* Cash/COD
* QRIS (image-based)
* E-Wallet (GoPay, OVO, DANA, ShopeePay)
* Bank Transfer (BCA, BNI, Mandiri, BRI)
* `.setpayment add <type>|<detail>` — Tambah metode
* `.setpayment list` — Lihat semua metode

### 🌍 BMKG Auto-Earthquake Notification
* Auto-fetch data gempa terbaru
* Shakemap support (image)
* Auto-broadcast ke grup aktif
* Default OFF saat pairing baru

### 🚪 Member Join Request System
Sistem notifikasi & approval member yang request join grup:
* `.approvalmember on/off` — Aktifkan/matikan mode persetujuan
* `.togglejoinreq owner/admin/all on/off` — Toggle notifikasi
* `.setujugabung <nomor> <linkgrup>` — Setujui member
* `.tolakgabung <nomor> <linkgrup>` — Tolak member
* Notifikasi otomatis dengan nama user, grup, waktu, link

### 🎙️ Auto React Voice Note (.autoreactvn)
* `.autoreactvn set trigger1,trigger2,trigger3` — Bulk assign
* `.autoreactvn on/off` — Aktifkan/matikan
* `.autoreactvn jeda <detik>` — Set cooldown
* Cooldown terpisah: 5s private chat, 15s group

### 🔒 Premium Gate Voice Note
* User non-premium akses fitur premium → auto play VN
* VN auto play saat trigger `.daftar`
* Owner only: semua command management

---

## 📂 Kategori Plugin (34 Kategori)

| Kategori | Jumlah | Deskripsi |
|----------|--------|-----------|
| **AI** | 45 | GPT, DeepSeek, Gemini, Claude, Text2Img, ToAnime, dll |
| **Anime** | 2 | MyWaifu, AutoAnimeWinbu |
| **Asupan** | 4 | Asupan TikTok, Bocil, Ukhty |
| **Canvas** | 20 | FakeChat, IQC, MusicCard, Kalender, FakeStory, dll |
| **Cek** | 48 | CekKarakter (cantik, ganteng, bucin, hoki, dll) |
| **Clan** | 9 | Create, Invite, Join, War, Leaderboard |
| **Convert** | 1 | Audio FX |
| **Download** | 25 | YT, TikTok, IG, Facebook, Spotify, Mediafire, dll |
| **Fun** | 32 | Game casual, jokes, interaksi |
| **Game** | 36 | Tebak kata, math, quiz, casino, dll |
| **Group** | 101 | Admin tools, anti-link, welcome, kick, mute, dll |
| **Info** | 13 | Info grup, info channel, cek nomor, dll |
| **Islamic** | 2 | Al-Quran, motivasi Islamic |
| **JPM** | 1 | Jeda Push Menu |
| **Main** | 20 | Menu, owner, rules, donasi, ping, leaderboard |
| **Media** | 2 | Media tools |
| **Owner** | 147 | Broadcast, set bot, panel, VPS, backup, dll |
| **Panel** | 22 | Panel management, roles, cpanel |
| **Primbon** | 8 | Zodiak, jodoh, nomer hoki, dll |
| **Pushkontak** | 1 | Push kontak grup |
| **Random** | 12 | Random image, quotes, facts |
| **Religi** | 4 | Konten religi |
| **RPG** | 67 | Adventure, mining, battle, crafting, economy |
| **Search** | 39 | Google, Pinterest, Spotify, YouTube, dll |
| **Stalker** | 14 | IG, TikTok, GitHub, YouTube, Discord, ML, FF, dll |
| **Sticker** | 24 | Sticker maker, smeme, emojimix, dll |
| **Store** | 14 | Toko, order, payment |
| **Tools** | 52 | Carbon, converter, dafont, deploy, dll |
| **TTS** | 2 | Text to speech |
| **User** | 17 | Register, premium, profile, limit |
| **Utility** | 3 | Utility tools |
| **VPS** | 6 | VPS management |

**Total: 794 Plugin**

---

## 🚀 Cara Install

### Requirements
* Node.js v20–22
* npm atau yarn
* Ffmpeg (untuk fitur audio/video)
* Git

### Langkah Install

```bash
# Clone repo
git clone https://github.com/itsmeeaizat/Rara-Whatsapp-Bot-Multi-Device.git
cd Rara-Whatsapp-Bot-Multi-Device

# Install dependencies
npm install

# Jalankan bot
npm start
```

### Pairing
* Scan QR Code yang muncul di terminal
* Atau gunakan Pairing Code: ketik di bot `.getcode`
* Bot akan otomatis connect setelah scan/pairing

---

## ⚙️ Konfigurasi

Edit `config.js` untuk mengatur:
* **Bot Name** — Nama bot
* **Owner** — Nama & nomor owner
* **API Keys** — Isi API key milikmu (Groq, Google, dll)
* **Prefix** — Command prefix (default: `.`)
* **Saluran WA** — Set link saluran untuk broadcast
* **Panel** — Konfigurasi panel hosting

```javascript
// config.js
export default {
  name: "Rara Multi Device",
  owner: {
    name: "Aizat",
    number: "6212345678910"
  },
  developer: "Aizat",
  // ... lainnya
}
```

---

## 📋 Command Dasar

| Command | Fungsi |
|---------|--------|
| `.menu` | Tampilkan menu utama |
| `.allmenu` | Tampilkan semua menu |
| `.owner` | Info owner |
| `.donasi` | Info donasi |
| `.rules` | Rules bot |
| `.ping` | Cek status bot |
| `.daftar` | Daftar sebagai user |
| `.jadibot` | Jadibot (multi-device) |
| `.daftarsewa` | Daftar sewa bot |
| `.aboutnova` | Info bot lengkap |

---

## 🛠️ Deploy ke Pterodactyl Panel

1. Upload file bot ke server
2. Buat server baru di Pterodactyl (Node.js egg)
3. Set startup command: `node index.js`
4. Start server, scan QR/pairing code
5. Bot siap digunakan

---

## 📝 Credits

* **Developer:** Aizat
* **Website:** [aizat-studio.my.id](https://aizat-studio.my.id)
* **Base:** Baileys (Multi-Device)
* **Thanks to:** All contributors & API providers

---

## ⚠️ Disclaimer

Bot ini dibuat untuk tujuan edukasi dan hiburan. Gunakan dengan bijak dan sesuai dengan ketentuan WhatsApp. Developer tidak bertanggung jawab atas penyalahgunaan bot.

---

<div align="center">
  <b>🌟 Rara Multi Device v3.3 🌟</b>
  <p>Developed by Aizat</p>
</div>

# PRD — Website Ulang Tahun Ana Ayuningtyas
**Version:** 1.0  
**Status:** Ready to Build  
**Deploy target:** GitHub Pages (gratis)

---

## 1. Problem Statement

Tidak ada cara yang berkesan dan personal untuk mengucapkan selamat ulang tahun ke-18 kepada Ana Ayuningtyas selain pesan biasa. Dibutuhkan sebuah website interaktif bertema Cars (Pixar) yang terasa personal, menyentuh, dan memorable — bisa dibagikan lewat link.

---

## 2. Target User

**Primary user — Ana Ayuningtyas**
- Perempuan, 18 tahun
- Suka film Cars / Pixar
- Buka website dari HP (mobile-first)
- Tidak perlu login atau input apapun — langsung menikmati

**Secondary user — Pembuat (Fanskey)**
- Tidak perlu coding manual — semua dikerjakan AI
- Butuh hasil yang bisa langsung di-deploy gratis
- Ingin bisa update foto dengan mudah

---

## 3. Goals & Non-Goals

### Goals ✅
- Website bisa dibuka lewat link dan langsung jalan
- Ada animasi Lightning McQueen & Mater
- Pesan personal tampil jelas dan menyentuh
- Galeri foto berdua
- Audio otomatis play saat dibuka
- Bisa di-share linknya ke Ana

### Non-Goals ❌
- Tidak perlu login / database
- Tidak perlu CMS atau admin panel
- Tidak perlu komentar atau interaksi dari Ana
- Tidak perlu SEO
- Tidak perlu multi-bahasa

---

## 4. User Stories

- Sebagai Ana, saya ingin langsung disambut animasi seru saat buka link, supaya saya langsung excited.
- Sebagai Ana, saya ingin membaca pesan personal yang tulus, supaya saya merasa dihargai.
- Sebagai Ana, saya ingin melihat foto-foto kenangan kami, supaya saya merasa momen ini istimewa.
- Sebagai Ana, saya ingin ada musik yang otomatis main, supaya suasananya makin seru.
- Sebagai Fanskey, saya ingin bisa share link ke Ana dengan mudah, supaya dia bisa buka kapan saja.
- Sebagai Fanskey, saya ingin website gratis dan tidak perlu bayar hosting, supaya tidak keluar biaya.

---

## 5. Fitur — MVP / v2 / Nanti

### MVP (Wajib ada sekarang)
| Fitur | Deskripsi |
|---|---|
| Intro screen | Layar gelap + Mater muncul + banner "Happy Birthday" |
| Main screen | McQueen + konfeti + nama Ana + teks ulang tahun ke-18 |
| Pesan personal | Teks ucapan terima kasih yang personal dari Fanskey |
| Galeri foto | Slideshow foto berdua, swipe-able di mobile |
| Background music | Life is a Highway autoplay + tombol mute |
| Share button | Tombol copy link atau share native HP |
| Responsive | Tampil bagus di HP dan laptop |

### v2 (Kalau ada waktu)
| Fitur | Deskripsi |
|---|---|
| Efek suara | Klakson Mater saat pertama buka |
| Animasi race | McQueen ngebut ke finish line lalu pesan muncul |
| Countdown | Hitung mundur ke jam lahir Ana |

### Nanti / Nice-to-have
| Fitur | Deskripsi |
|---|---|
| Easter egg | Klik Mater 5x → dialog lucu muncul |
| Mode malam | Toggle siang/malam Radiator Springs |
| Video message | Embed video ucapan singkat |

---

## 6. Functional Requirements (MVP Detail)

### FR-01 — Intro Screen
- Layar gelap muncul pertama kali
- Animasi Mater masuk dari kiri (CSS animation / GIF / PNG sprite)
- Teks: *"Ka-chow! Ada yang ultah nih... 🏁"*
- Durasi 2.5 detik, lalu otomatis transisi ke Main Screen
- Audio engine-start.mp3 play saat ini

### FR-02 — Main Birthday Screen
- Background: Radiator Springs (CSS gradient atau gambar)
- McQueen animasi masuk dari kanan
- Konfeti jatuh dari atas (pakai library `canvas-confetti`)
- Teks utama: `Happy 18th Birthday, Ana Ayuningtyas!`
- Sub-teks: `Selamat memasuki lintasan baru kehidupan! 🏁`
- Tombol scroll down ke pesan personal

### FR-03 — Pesan Personal
- Section terpisah di bawah main screen
- Frame/border gaya retro racing
- Isi pesan (sudah final, jangan diubah AI):
  > *"Ana, makasih udah jadi temen yang luar biasa baik. Makasih udah selalu mau dengerin semua ceritaku, di saat seneng maupun susah. Kamu itu lebih dari sekedar temen — kamu salah satu orang yang bikin hari-hariku jauh lebih berarti. 💛 Semoga di umur 18 ini, semua impianmu tercapai dan hidupmu sebahagia Radiator Springs! 🌅 Ka-chow! 🏁"*

### FR-04 — Galeri Foto
- Carousel/slideshow horizontal
- Swipe di mobile, klik panah di desktop
- Placeholder slot: `foto1.jpg` s/d `foto5.jpg` di `/assets/photos/`
- Frame: gaya poster Cars / pit crew card
- Caption opsional di bawah tiap foto

### FR-05 — Audio
- `life-is-a-highway-bg.mp3` loop pelan (volume 30%) sejak Main Screen
- Tombol 🔊/🔇 fixed di pojok kanan atas
- `engine-start.mp3` play sekali di Intro Screen

### FR-06 — Share Button
- Tombol "Bagikan ke Ana 💌" di bagian bawah
- Klik → Web Share API (native share HP) atau fallback copy link ke clipboard
- Toast notifikasi: *"Link berhasil disalin! 📋"*

---

## 7. Data Model

Tidak ada database. Semua data statis di file HTML/JS.

```
Entitas: Konten Website
- nama_penerima      : "Ana Ayuningtyas"
- umur               : 18
- pesan_personal     : string (hardcoded di HTML)
- daftar_foto        : array path string ["foto1.jpg", ...]
- musik_aktif        : boolean (state JS)
```

---

## 8. Edge Cases & Failure States

| Kondisi | Penanganan |
|---|---|
| Audio diblok browser | Tombol play manual muncul otomatis |
| Foto tidak ditemukan | Tampilkan placeholder bertema Cars |
| Web Share API tidak support | Fallback: copy link ke clipboard |
| Koneksi lambat | Semua asset lokal, tidak ada API call |
| Buka di desktop | Layout menyesuaikan, tetap fungsional |
| User klik share sebelum ada link | Tombol disabled sampai di-deploy |

---

## 9. Success Metrics

| Metrik | Target |
|---|---|
| Ana bisa buka website tanpa error | ✅ 100% |
| Semua scene tampil mulus di HP Ana | ✅ |
| Audio berjalan (atau ada fallback) | ✅ |
| Foto tampil semua | ✅ |
| Link bisa di-share dan dibuka orang lain | ✅ |
| Ana bilang suka / terharu 😄 | 🎯 Goal utama |

---

## 10. Open Questions

| # | Pertanyaan | Status |
|---|---|---|
| 1 | Tanggal ulang tahun Ana kapan? | ❓ Belum dikonfirmasi |
| 2 | Foto berapa lembar dan sudah siap? | ❓ Belum diterima |
| 3 | Ada caption khusus untuk tiap foto? | ❓ Opsional |
| 4 | Nama GitHub akun Fanskey? | ❓ Dibutuhkan untuk deploy GitHub Pages |
| 5 | Mau ada nama pengirim di pesan? ("Dari: ...") | ❓ Belum dikonfirmasi |

---

## 🚀 Cara Deploy (GitHub Pages — Gratis)

1. Buat repo baru di GitHub: `hbd-ana`
2. Upload semua file project ke repo
3. Masuk Settings → Pages → pilih branch `main`
4. Website live di: `https://[username].github.io/hbd-ana`
5. Share link itu ke Ana!

---

*PRD ini siap dipakai sebagai prompt ke AI (Cursor/Copilot/Claude) untuk generate kode langsung.*

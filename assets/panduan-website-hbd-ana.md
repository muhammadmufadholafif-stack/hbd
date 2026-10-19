# 🏁 Project Brief: Website Ulang Tahun Ana Ayuningtyas
> Panduan pengerjaan untuk developer — buka di IDX / editor manapun

---

## 📌 Overview

| | |
|---|---|
| **Nama penerima** | Ana Ayuningtyas |
| **Momen** | Ulang Tahun ke-18 |
| **Tema** | Film Cars (Pixar) |
| **Target device** | Mobile & Desktop (responsive) |
| **Tech stack** | HTML + CSS + JavaScript (vanilla, tanpa framework) |

---

## 🎨 Visual & Tema

### Karakter yang wajib ada
- **Lightning McQueen** — karakter utama, muncul dengan animasi masuk
- **Mater** — karakter komedi, nyeret Lightning atau nganterin pesan

### Palet Warna
| Nama | Hex | Dipakai untuk |
|---|---|---|
| Racing Red | `#CC0000` | Aksen utama, McQueen |
| Sunset Orange | `#FF6B2B` | Highlight, tombol |
| Sky Blue | `#87CEEB` | Background langit Radiator Springs |
| Asphalt Dark | `#1A1A2E` | Background malam/gelap |
| Warm Sand | `#F5DEB3` | Teks, area konten |

### Tipografi
- **Heading:** Font bold bergaya retro racing — pakai Google Fonts `Bebas Neue` atau `Racing Sans One`
- **Body/pesan:** Font bersih & readable — `Lato` atau `Nunito`
- **Aksen:** Efek plat nomor untuk nama "ANA AYUNINGTYAS"

### Background
- Radiator Springs: langit biru, jalan gurun, bukit merah
- Bisa pakai ilustrasi SVG sederhana atau CSS gradient

---

## 🎬 Alur Website (Scene by Scene)

### Scene 1 — Intro / Loading Screen
- Layar gelap penuh
- Suara mesin mobil menyala (`autoplay`, pakai file audio MP3/OGG kecil)
- Mater muncul dari kiri, nyeret banner tulisan:  
  **"KA-CHOW! Ada yang ultah nih... 🏁"**
- Durasi: ~2–3 detik, lalu otomatis lanjut ke Scene 2

### Scene 2 — Main Birthday Screen
- Lightning McQueen masuk dari kanan dengan animasi slide
- Konfeti/balon jatuh dari atas
- Teks besar di tengah:
  ```
  Happy 18th Birthday,
  Ana Ayuningtyas! 🎉
  ```
- Sub-teks kecil di bawah:  
  *"Selamat memasuki lintasan baru kehidupan!"*

### Scene 3 — Pesan Personal
- Scroll atau klik tombol `"Buka Pesan 💌"`
- Pesan muncul dengan animasi fade:
  ```
  Ana,
  
  Makasih udah jadi temen yang luar biasa baik.
  Makasih udah selalu mau dengerin semua ceritaku,
  di saat seneng maupun susah.
  Kamu itu lebih dari sekedar temen —
  kamu salah satu orang yang bikin hari-hariku
  jauh lebih berarti. 💛
  
  Semoga di umur 18 ini, semua impianmu
  tercapai dan hidupmu sebahagia Radiator Springs! 🌅
  
  Ka-chow! 🏁
  ```
- Frame/border: gaya pit stop atau retro racing

### Scene 4 — Galeri Foto
- Judul: **"Our Pit Stop Moments 📸"**
- Slideshow/carousel foto kalian berdua
- Frame: poster ala Cars / kartu pit crew
- Navigasi: tombol kiri-kanan atau swipe (mobile-friendly)
- **Catatan developer:** foto akan diberikan terpisah, siapkan slot dengan nama file:  
  `foto1.jpg`, `foto2.jpg`, dst. di folder `/assets/photos/`

### Scene 5 — Penutup
- Mater muncul lagi, dialog bubble:  
  *"I knowed I made a good choice bein' your friend. Happy Birthday, Ana! 🤠"*
- Lightning McQueen ngebut keluar layar
- Tombol: `"🎉 Rayakan Lagi!"` → reload ke Scene 1

---

## 🔊 Audio

| Audio | Trigger | File |
|---|---|---|
| Suara mesin mobil | Autoplay saat buka | `engine-start.mp3` |
| "Life is a Highway" (instrumental/pendek) | Loop pelan di background | `life-is-a-highway-bg.mp3` |
| Klakson Mater | Saat Mater muncul | `mater-horn.mp3` |

> ⚠️ Semua audio harus bisa di-mute — tambahkan tombol 🔊/🔇 di pojok layar

---

## 📁 Struktur Folder

```
hbd-ana/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── photos/
│   │   ├── foto1.jpg
│   │   ├── foto2.jpg
│   │   └── ...
│   ├── audio/
│   │   ├── engine-start.mp3
│   │   ├── life-is-a-highway-bg.mp3
│   │   └── mater-horn.mp3
│   └── images/
│       ├── mcqueen.png      ← PNG transparan
│       ├── mater.png        ← PNG transparan
│       └── radiator-bg.jpg  ← Background Radiator Springs
```

---

## 📱 Responsiveness

- Mobile first — pastikan tampil bagus di layar 360px ke atas
- Animasi tetap smooth di HP (hindari animasi berat)
- Font size minimum 16px untuk body text

---

## ✅ Checklist Sebelum Selesai

- [ ] Semua scene berjalan mulus
- [ ] Foto sudah masuk dan tampil di galeri
- [ ] Audio autoplay + tombol mute berfungsi
- [ ] Responsive di mobile & desktop
- [ ] Pesan personal sudah diisi dengan benar
- [ ] Nama "Ana Ayuningtyas" tampil jelas
- [ ] Test di Chrome & browser lain

---

*Brief dibuat untuk project website ulang tahun pribadi.*  
*Sesuaikan foto dan detail pesan sebelum dikirim ke Ana! 💛*

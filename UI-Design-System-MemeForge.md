# UI Design System — MemeForge

- **Versi:** 1.0
- **Tanggal:** 2026-10-09
- **Prinsip:** Elegan, nyaman di mata, fokus pada kanvas — bukan pada UI.

---

## 1. Design Direction

Arah visual: **"Creative Studio Minimal"** — dark mode bernuansa studio (bukan hitam pekat, melainkan gelap lembut), aksen warna playful tapi sophistication, banyak ruang kosong (whitespace), dan hierarki tipografi yang jelas.

Alasan:
- Editor meme adalah aplikasi produktivitas kreatif — pengguna menghabiskan waktu lama menatap kanvas.
- Warna gelap lembut mengurangi fatigue saat editing dan membuat warna meme (yang cerah) kontras secara natural.
- Aksen warna dipakai hemat, hanya pada aksi penting, agar mata tidak lelah.

---

## 2. Palet Warna

### 2.1 Warna Dasar (Neutrals — Dark Studio)

| Token | Hex | Pemakaian |
|---|---|---|
| `bg-primary` | `#12141A` | Background utama aplikasi |
| `bg-surface` | `#1A1D26` | Kartu, panel sidebar, modal |
| `bg-elevated` | `#232733` | Toolbar, dropdown, hover state |
| `border-subtle` | `#2E3342` | Garis pembatas, outline input |
| `text-primary` | `#F2F4F8` | Judul, teks utama |
| `text-secondary` | `#9BA3B4` | Label, deskripsi, metadata |
| `text-muted` | `#5C6373` | Placeholder, teks non-aktif |

> Catatan: biru-keunguan sangat halus pada neutrals (bukan abu polos) agar terasa elegan, bukan muram.

### 2.2 Warna Aksen

| Token | Hex | Pemakaian |
|---|---|---|
| `accent-primary` | `#7C6CFF` | Tombol utama (CTA), active state, progress |
| `accent-hover` | `#9384FF` | Hover tombol utama |
| `accent-soft` | `rgba(124,108,255,0.12)` | Background chip/tag terpilih, highlight halus |
| `success` | `#3ECF8E` | Sukses export, indikator tersimpan |
| `danger` | `#FF6B6B` | Hapus, error, reject upload |
| `warning` | `#FFB648` | Ukuran file besar, limit mendekati |

### 2.3 Kanvas & Editor

| Token | Hex | Pemakaian |
|---|---|---|
| `canvas-bg` | `#0D0F14` | Area di belakang kanvas (beda dari bg agar kanvas "mengambang") |
| `canvas-grid` | `rgba(255,255,255,0.04)` | Grid halus di belakang kanvas (opsional, toggle) |
| `selection-outline` | `#7C6CFF` | Border objek terpilih di kanvas |
| `selection-handle` | `#FFFFFF` | Handle resize/rotate |

### 2.4 Aturan Pemakaian Warna

- Rasio kontras teks: minimal **4.5:1** (memenuhi WCAG AA).
- `accent-primary` hanya untuk 1 aksi utama per layar (aturan "satu CTA layar").
- Konten meme pengguna boleh warna apapun — UI harus "mundur" (netrals dominan).
- Jangan pakai gradasi mencolok di background; gradasi hanya boleh lembut di hero landing page (jika ada).

---

## 3. Tipografi

### 3.1 Pemilihan Font

| Peran | Font | Alasan |
|---|---|---|
| **UI & body** | **Inter** | Geometris-humanis, sangat terbaca di ukuran kecil, nyaman untuk bacaan panjang tanpa membuat mata cepat bosan |
| **Judul & angka** | **Sora** | Karakter modern dengan karakter, dipakai hemat (h1, h2, angka statistik) |
| **Font meme (teks di kanvas)** | **Bebas Neue, Anton, Archivo Black, Comic Neue, Impact fallback** | Pilihan font meme klasik & modern, user bisa ganti |

> Catatan: Font UI (Inter + Sora) memiliki x-height tinggi dan spacing nyaman — terbukti menurunkan eye strain untuk aplikasi berdurasi lama.

### 3.2 Skala Type

| Token | Ukuran | Berat | Pemakaian |
|---|---|---|---|
| `display` | 32px / 40px | Sora 700 | Judul halaman utama |
| `h1` | 24px / 32px | Sora 600 | Judul section |
| `h2` | 18px / 26px | Sora 600 | Judul kartu, panel |
| `body` | 14px / 22px | Inter 400 | Teks umum UI |
| `body-lg` | 16px / 24px | Inter 400 | Deskripsi, empty state |
| `label` | 12px / 16px | Inter 500 | Label form, chip |
| `caption` | 11px / 14px | Inter 400 | Metadata, timestamp |
| `button` | 14px / 20px | Inter 600 | Semua tombol |

### 3.3 Aturan Tipografi

- Line-height minimal 1.5 untuk body text.
- Jangan gunakan font-size < 11px.
- Teks meme default di kanvas: Anton 48px, putih, outline hitam (preset klasik).
- Hindari lebih dari 2 font UI dalam satu layar.

---

## 4. Layout & Struktur Halaman

### 4.1 Struktur Global Aplikasi (3 Zona)

```
┌────────────────────────────────────────────────────────────┐
│  TOPBAR  (56px)  Logo | Nama Proyek | Export | Avatar      │
├──────────┬───────────────────────────────────┬─────────────┤
│          │                                   │             │
│ SIDEBAR  │           CANVAS AREA             │  PANEL      │
│ (64px    │     (flexible, centered)          │  KANAN      │
│ icons)   │                                   │  (280px)    │
│          │                                   │             │
├──────────┴───────────────────────────────────┴─────────────┤
│  BOTTOM TIMEBAR (video mode)  ▶ |──●──────────|  00:03 / 10  │
└────────────────────────────────────────────────────────────┘
```

- **Topbar:** global action (export, save, nama meme). Selalu terlihat.
- **Sidebar kiri (icon rail 64px):** Tools — Select, Text, Sticker, Draw, Upload, Template. Expandable.
- **Canvas area:** kanvas di tengah, bisa zoom (fit/fill/100%), checkerboard halus di belakang transparansi.
- **Panel kanan (280px, collapsible):** kontekstual sesuai tool aktif (misal: pilih teks → muncul properti font/warna/outline).
- **Bottom bar:** hanya muncul di mode video (timeline/frame picker).

### 4.2 Halaman: Landing / Login

- Hero tengah: headline `display` + sub-headline `body-lg` + satu CTA `accent-primary` ("Mulai Membuat").
- Background: `bg-primary` dengan glow radial lembut `accent-primary` opacity 6% di pojok.
- Login card: width 400px, centered, `bg-surface`, border `border-subtle`, radius 16px.

### 4.3 Halaman: Dashboard / Galeri

- Grid kartu meme (thumbnail 4:3), gap 16px, radius 12px.
- Hover: overlay gradient gelap + aksi cepat (Edit, Unduh, Hapus).
- Empty state: ilustrasi minimal + teks `body-lg` + CTA.

### 4.4 Halaman: Editor (Inti)

- Layout sesuai 4.1.
- Saat upload: drag-drop overlay penuh, border dashed `accent-primary`.
- Kanvas diberi subtle shadow agar "mengambang" di atas `canvas-bg`.
- Panel kanan berbentuk tab: **Text | Style | Layers** agar tidak scroll panjang.

### 4.5 Spacing & Grid

- Base unit: **8px** (4px untuk fine-tuning).
- Padding panel: 16px. Padding kartu: 16–24px.
- Radius: tombol/input 10px, kartu 12px, modal 16px, kanvas preview 8px.
- Max content width dashboard: 1280px, padding samping 24px.

---

## 5. Komponen Kunci

| Komponen | Spesifikasi |
|---|---|
| **Button Primary** | `accent-primary`, teks putih, radius 10px, height 40px, hover `accent-hover` |
| **Button Secondary** | `bg-elevated`, teks `text-primary`, border `border-subtle` |
| **Button Danger** | `danger` dengan teks putih, konfirmasi modal sebelum eksekusi |
| **Input** | `bg-surface`, border `border-subtle`, focus ring `accent-primary` 2px |
| **Slider (video)** | Track `border-subtle`, thumb & fill `accent-primary`, tinggi 4px |
| **Chip / Tag** | `accent-soft` bg, teks `accent-primary`, radius full |
| **Toast** | Muncul kanan-bawah, `bg-elevated`, icon status (success/danger), auto-dismiss 4 detik |
| **Modal** | Backdrop `rgba(0,0,0,0.6)` + blur 8px, radius 16px |
| **Tooltip** | `bg-elevated`, teks `caption`, delay 400ms |

---

## 6. Mode & State

- **Dark mode default.** Light mode opsional fase 2 (token warna sudah siap di struktur).
- State wajib: default, hover, active/focus, disabled, loading (spinner di dalam tombol).
- Loading skeleton untuk galeri & template.
- Export progress: progress bar di topbar dengan persentase.

---

## 7. Aksesibilitas & Kenyamanan

- Kontras AA minimum (4.5:1 teks, 3:1 UI non-teks).
- Semua aksi keyboard-accessible; shortcut editor: `T` (teks), `V` (select), `Delete` (hapus), `Ctrl+Z/Y`.
- Hindari animasi > 300ms; gunakan `ease-out`.
- Reduksi gerakan otomatis jika user mengaktifkan `prefers-reduced-motion`.

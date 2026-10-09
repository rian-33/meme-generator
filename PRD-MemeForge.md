# PRD — MemeForge: Website Meme Generator (Foto & Video)

- **Versi:** 1.0 (MVP)
- **Tanggal:** 2026-10-06
- **Status:** Draft

---

## 1. Ringkasan Produk

MemeForge adalah editor meme berbasis browser yang mendukung dua jenis input: gambar statis dan video. Pengguna dapat menambahkan teks, sticker, dan elemen lain di atas canvas, lalu mengekspor hasilnya sebagai gambar (PNG/JPG) atau GIF — semua tanpa instalasi aplikasi.

**Kesimpulan kritis:** MVP fokus pada 1 persona utama (Creator casual + konten). Fitur komunitas ditunda ke fase 2 untuk menyederhanakan auth, storage, dan moderasi.

---

## 2. Penentuan User (Persona)

| Persona | Kebutuhan Utama |
|---|---|
| **Creator casual** | Upload foto → tambah teks → unduh cepat |
| **Creator konten** | Edit meme dari video (ambil frame, GIF), template trending |
| **Viewer (opsional)** | Jelajah & unduh meme publik (jika fitur komunitas aktif di fase 2) |

---

## 3. Tujuan Produk

- Waktu buat meme < 2 menit dari upload hingga unduh.
- Mendukung 2 input: gambar statis & video (ekstrak frame / jadi GIF).
- Editor berbasis browser, tanpa install aplikasi.

---

## 4. Tech Stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Frontend | **React + TypeScript + Vite** | Ekosistem editor canvas kuat, hiring mudah |
| Canvas/teks | **Fabric.js / Konva.js** | Drag-resize-rotate teks & sticker di canvas |
| Video | **ffmpeg.wasm** | Proses video (ekstrak frame, GIF) client-side, hemat biaya server |
| Backend/DB | **Supabase** | Auth, Postgres, Storage, Row Level Security dalam 1 platform |
| Hosting | **Vercel** | Deploy cepat, CDN global |

---

## 5. Use Case Diagram (UML)

```
        ┌──────────────┐
        │   Creator    │
        └──────┬───────┘
   ┌───────────┼──────────────┐
   │           │              │
Register/Login │              │
   │      ┌────▼─────┐   ┌────▼─────┐
   └─────►│Kelola Meme│   │ Template │
          └────┬─────┘   └────┬─────┘
   ┌───────────┼──────────────┼────────┐
   │           │              │        │
Upload Foto  Upload Video  Pilih      Tambah
   │        (ekstrak frame) Template   Teks/Sticker
   └───────────┴──────┬───────┴────────┘
                      │
              ┌───────▼────────┐
              │ Preview & Edit │
              └───────┬────────┘
              ┌───────▼────────┐
              │ Simpan/Unduh   │
              └────────────────┘
```

---

## 6. Flowchart (Proses Utama)

```
Start → Login/Auth (Supabase)
  │
  ├─► Upload Media ──► Validasi tipe & ukuran ──► Reject? ──► End
  │                        │
  ├─► [Video] ──► ffmpeg.wasm ekstrak frame / konversi GIF
  │                        │
  ├─► Load ke Canvas ──► Tambah teks/sticker ──► Resize/Rotate
  │                        │
  ├─► Preview ──► Export (canvas.toBlob / gif.js)
  │                        │
  └─► Simpan ke Supabase Storage ──► Insert metadata ke DB ──► End
```

---

## 7. Class Diagram

```
┌────────────┐        ┌────────────┐        ┌────────────┐
│    User    │        │    Meme    │        │  Template  │
├────────────┤ 1    * ├────────────┤ *    1 ├────────────┤
│ id: uuid   │───────►│ id: uuid   │◄───────│ id: uuid   │
│ email      │        │ user_id    │        │ name       │
│ avatar_url │        │ title      │        │ url        │
│ created_at │        │ media_type │        │ category   │
└────────────┘        │ file_url   │        └────────────┘
                      │ is_public  │
                      │ created_at │
                      └─────┬──────┘
                            │ 1
                      ┌─────▼──────┐
                      │ MemeLayer  │
                      ├────────────┤
                      │ id: uuid   │
                      │ meme_id    │
                      │ type(text/ │
                      │  sticker)  │
                      │ x, y, w, h │
                      │ rotation   │
                      │ properties │
                      └────────────┘
```

---

## 8. Database (Supabase / PostgreSQL)

```sql
-- Users dihandle Supabase Auth (auth.users), profil:
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  avatar_url text,
  created_at timestamptz default now()
);

create table memes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text,
  media_type text check (media_type in ('image','gif','video')),
  file_url text not null,
  thumbnail_url text,
  is_public boolean default false,
  created_at timestamptz default now()
);

create table templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_url text not null,
  category text,
  created_at timestamptz default now()
);

create table meme_layers (
  id uuid primary key default gen_random_uuid(),
  meme_id uuid references memes(id) on delete cascade,
  layer_type text check (layer_type in ('text','sticker','image')),
  position jsonb not null,   -- {x, y, width, height, rotation}
  properties jsonb,          -- {text, font, size, color, ...}
  z_index int default 0
);

-- Storage buckets: 'memes' (private per user), 'templates' (public), 'thumbnails'
-- RLS: user hanya bisa CRUD data & file miliknya sendiri
alter table memes enable row level security;
create policy "own memes" on memes
  using (auth.uid() = user_id);
```

**Catatan kritis:** Simpan layer sebagai JSONB agar editor bisa load ulang untuk edit ulang — jangan hanya simpan hasil export.

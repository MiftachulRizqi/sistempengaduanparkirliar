# 🚗 Sistem Pengaduan Parkir Liar

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/Status-Active-success)

Website ini merupakan aplikasi berbasis web yang digunakan untuk memudahkan masyarakat dalam melaporkan pelanggaran parkir liar secara online dengan fitur lengkap seperti lokasi, foto, deskripsi, dan monitoring status laporan secara real-time.

---

## 🌐 Live Demo

🔗 https://sistempengaduanparkirliar.vercel.app  

---

## 🎯 Tujuan Sistem

Sistem ini dibuat untuk:
- Mempermudah masyarakat dalam melaporkan parkir liar
- Membantu pihak terkait dalam monitoring laporan
- Menyediakan sistem pelaporan berbasis digital yang cepat dan transparan

---

## ✨ Fitur Utama

### 📍 Pelaporan Parkir Liar
Pengguna dapat mengirim laporan dengan:
- Nama pelapor
- Lokasi kejadian (berbasis map)
- Deskripsi kejadian
- Upload foto bukti

---

### 🗺️ Peta Laporan
- Menampilkan semua laporan dalam bentuk peta
- Menggunakan Leaflet
- Setiap laporan ditampilkan sebagai marker

---

### 📊 Dashboard Data Laporan (Premium UI)
Menampilkan statistik:
- Total laporan
- Menunggu
- Diproses
- Selesai

Dilengkapi dengan:
- Glass effect
- Gradient UI
- Mini dashboard modern

---

### 📄 Detail Laporan (Dynamic Routing)
Halaman dinamis:

/laporan/[id]

Menampilkan:
- Foto laporan
- Nama pelapor
- Lokasi
- Deskripsi
- Status laporan

---

### ⚡ Real-time Data
- Data diambil langsung dari Supabase
- Sinkron otomatis antara frontend dan backend
- Update data tanpa reload manual

---

### 📷 Upload Foto (Supabase Storage)
- File gambar disimpan di Supabase Storage
- URL gambar disimpan di database
- Ditampilkan di halaman service & detail laporan

---

## 🧠 Teknologi yang Digunakan

| Teknologi | Fungsi |
|----------|--------|
| Next.js (App Router) | Framework utama |
| React | UI Library |
| TypeScript | Type Safety |
| Supabase | Backend (Database + Storage) |
| Bootstrap 5 | Styling |
| Leaflet | Peta |
| Vercel | Deployment |

---

## 🏗️ Struktur Project

```bash
project-root/
│
├── public/
│   └── image/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── laporan/
│   │   │   │      └── list/
│   │   │   │       └── route.ts
│   │   │   └── route.ts
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── laporan/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx
│   │   │
│   │   ├── team/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── BootstrapClient.tsx
│   │   ├── ClientCounter.tsx
│   │   ├── Footer.tsx
│   │   ├── MapComponent.tsx
│   │   ├── MapLaporan.tsx
│   │   ├── MapLaporanClient.tsx
│   │   ├── MapPicker.tsx
│   │   └── Navbar.tsx
│   │
│   ├── data/
│   │   ├── laporan.json
│   │   └── team.json
│   │
│   ├── lib/
│   │   └──supabaseServer.ts
│   │
│   └── styles/
│       ├── contact.css
│       ├── footer.css
│       ├── global.css
│       ├── home.css
│       ├── laporan.css
│       ├── navbar.css
│       ├── services.css
│       └── team.css
```

```

## 🗄️ Struktur Data

### Database (Supabase)

Table: laporan

| Field | Tipe |
|------|------|
| id | number |
| nama | string |
| lokasi | string |
| deskripsi | string |
| foto | string (URL) |
| status | string |
| created_at | timestamp |

---

### Storage (Supabase)

uploads/
└── laporan/
    └── foto.png

---

## 🔌 API Endpoint

### GET Laporan
/api/laporan/list

### POST Laporan
/api/laporan

---

## ⚙️ Environment Variables

Buat file `.env.local`

NEXT_PUBLIC_SUPABASE_URL=your_url  
SUPABASE_SERVICE_ROLE_KEY=your_key  

---

## ▶️ Cara Menjalankan Project

### 1. Clone repository
git clone https://github.com/username/repository.git

### 2. Install dependency
npm install

### 3. Jalankan project
npm run dev

---

## 🚀 Deployment

Project ini di-deploy menggunakan:

Vercel

Setiap push ke GitHub akan otomatis deploy.

---

## 🎨 UI / UX Design

- Glass effect modern UI
- Gradient background
- Dashboard statistik interaktif
- Responsive (mobile friendly)
- Clean & minimal design

---

## 📸 Screenshot

Tambahkan screenshot di folder:

public/
  home.png
  services.png
  dashboard.png



---

## 📈 Pengembangan Selanjutnya

- [ ] Filter laporan berdasarkan status
- [ ] Login Admin
- [ ] Edit & delete laporan
- [ ] Notifikasi laporan
- [ ] Dashboard Admin

---

## 👨‍💻 Developer

**Kelompok 22 – Studi Independen PT VINIX7 AURUM**  

💼 Divisi: Web Development & UI/UX  

**Miftachul Rizqi**  
Mahasiswa D4 Manajemen Informatika  
Universitas Negeri Surabaya  

**Muhammad Ilham Mushidiq**  
Mahasiswa D4 Manajemen Informatika  
Universitas Negeri Surabaya  

**Mochammad Roudho Brammastyo**  
Mahasiswa D4 Manajemen Informatika  
Universitas Negeri Surabaya  


---

## ⭐ Dukungan

Jika project ini membantu:

Berikan ⭐ di repository ini

---

## 📄 License

Project ini dibuat untuk keperluan pembelajaran dan pengembangan sistem.
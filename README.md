# 🎓 Sertifikat QR — Mode Dummy (Tanpa Backend)

Project ini adalah versi **preview tanpa backend** dari sistem sertifikat QR.  
Semua data peserta sudah di-hardcode di `src/data/peserta.js`.

---

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

Buka di browser: **http://localhost:5173**

---

## 🔑 Akun Login

| Role   | Username                  | PIN     |
|--------|---------------------------|---------|
| User   | Alfansyah Ghifari         | 12345   |
| User   | Muhamad Rasya Arkarisa    | 12345   |
| User   | Aulia Wulandari           | 12345   |
| User   | (semua peserta lainnya)   | 12345   |

> Ketik nama peserta di kolom Nama, atau klik "Lihat akun demo" di halaman login.

---

## 📁 Struktur Folder

```
src/
├── data/
│   └── peserta.js          ← DATA DUMMY semua peserta (edit di sini!)
├── pages/
│   ├── LoginPage.jsx        ← Halaman login (dummy, tanpa API)
│   ├── PublikSertifikat.jsx ← Halaman publik saat QR di-scan
│   ├── components/
│   │   └── SertifikatCard.jsx ← Canvas sertifikat (ganti dgn <img> saat backend siap)
│   ├── User/
│   │   ├── HalamanUser.jsx  ← Profil user + tombol QR
│   │   └── QrSertifikat.jsx ← Tampilan QR permanen user
│   └── Admin/
│       └── LogAbsensi.jsx   ← Dashboard admin - daftar semua peserta
├── App.jsx                  ← Router utama
└── index.css                ← Styling global
```

---

## 🔗 Route yang Tersedia

| URL                    | Keterangan                                      |
|------------------------|-------------------------------------------------|
| `/user`                | Dashboard user (butuh login sebagai peserta)    |
| `/user/sertifikat`     | QR sertifikat permanen user                     |
| `/sertifikat/:id`      | **Halaman PUBLIK** — hasil scan QR, no login    |

---

## ✏️ Edit Data Peserta

Buka `src/data/peserta.js` dan edit array `DUMMY_PESERTA`:

```js
{
  id: 13,                          // ← ID unik (menentukan URL QR)
  username: "Alfansyah Ghifari",   // ← Nama peserta
  no_hp: "089535200505",           // ← Nomor HP
  email: "alfansyah@email.com",    // ← Email
  nama_jurusan: "Pengembangan web dengan node JS",
  role_id: 2,                      // ← 2 = user biasa
}
```

---

## 🔄 Saat Backend Sudah Siap

1. Di `LoginPage.jsx` — ganti `loginDummy()` dengan `axios.post('/api/auth/login')`
2. Di `PublikSertifikat.jsx` — ganti `getPesertaById()` dengan `axios.get('/api/peserta/publik/:id')`
3. Di `SertifikatCard.jsx` — ganti Canvas dengan `<img src={url_foto_sertifikat} />`
4. Di `QrSertifikat.jsx` — QR value sudah benar (pakai ID), tidak perlu diubah ✅

---

## 📸 Foto Sertifikat

Saat ini foto sertifikat di-generate otomatis lewat Canvas (untuk demo).  
Untuk foto asli, di backend simpan URL foto ke database, lalu di `PublikSertifikat.jsx`:

```jsx
// Ganti SertifikatCard dengan ini:
<img src={peserta.foto_sertifikat_url} alt="Sertifikat" style={{ width: "100%" }} />
```

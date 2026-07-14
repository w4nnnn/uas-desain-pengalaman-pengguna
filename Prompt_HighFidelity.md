Act as an Expert UI/UX Designer and Senior Frontend Developer. 
Tugas kamu adalah membuat "High-Fidelity Prototype" berbasis HTML dan Tailwind CSS untuk aplikasi "Manajemen Pre-Order (PO) & Down Payment (DP) UMKM Kuliner". 

Aplikasi ini adalah "Two-Sided UI", artinya terdapat antarmuka untuk Pelanggan (B2C) dan Admin/Pemilik Usaha (B2B). 
Ubah kerangka rancangan wireframe (low-fidelity) ini menjadi desain akhir (High-Fidelity) yang sangat profesional, modern, estetik, dan siap pakai.

### ATURAN DESIGN SYSTEM & STYLING UTAMA:
1. Framework: Gunakan Tailwind CSS (via CDN) dan Material Symbols (Google Fonts).
2. Tipografi: Gunakan font 'Poppins' untuk Heading dan 'Inter' untuk Body text.
3. Warna Sisi Pelanggan (B2C): 
   - Primary: Orange (#FF7A00) yang menggugah selera untuk tombol CTA utama.
   - Background: Off-white/Light Gray (#F9FAFB).
   - Feel: Ramah, hangat, banyak white-space, dan fokus pada kemudahan checkout.
4. Warna Sisi Admin (B2B/Dashboard): 
   - Primary: Navy Blue (#1E3A8A) atau Blue (#2563EB).
   - Background: Abu-abu sangat terang (#F3F4F6) dengan Card putih murni (#FFFFFF) dan shadow tipis.
   - Feel: Padat informasi, dashboard analitik, terstruktur dengan rapi.
5. Warna Status (State Colors): 
   - Lunas/Selesai: Emerald Green (#10B981) + Background hijau transparan.
   - DP/Diproses: Amber/Yellow (#F59E0B) + Background kuning transparan.
   - Belum Bayar/Jatuh Tempo: Red (#EF4444) + Background merah transparan.
6. Kualitas High-Fidelity: Gunakan rounded corners (rounded-xl, rounded-2xl), soft drop-shadows (shadow-sm, shadow-md), border halus (border-gray-100), foto makanan/avatar sungguhan (gunakan resource placeholder image dari Unsplash), dan efek hover transition pada tombol.

### HALAMAN YANG HARUS DIBUAT (Total 9 Halaman):
Tolong buatkan kode HTML untuk 9 halaman berikut. Kamu bisa memisahkannya dengan komentar pemisah yang sangat jelas di dalam satu file, atau menjadikannya view yang dapat ditoggle dengan sedikit JS dasar:

==================================================
BAGIAN 1: SISI ADMIN (Tablet/Desktop View / Lebar Penuh)
==================================================
1. Login Admin: 
   - Form login (Email & Password), logo toko UMKM, desain bersih dan profesional.
2. Dashboard Admin (Beranda): 
   - Sidebar navigasi kiri.
   - Header dengan ucapan selamat datang dan ringkasan pendapatan hari ini.
   - Tabel/List daftar pesanan yang butuh dikonfirmasi dan jadwal kirim hari ini.
3. Daftar Pesanan (Kelola Pesanan):
   - Tabel berisi seluruh pesanan/history.
   - Ada filter tab status (Baru, Diproses, Selesai) dan fitur pencarian (Search Bar).
4. Detail Pesanan (Admin):
   - Layout 2 kolom (atau grid responsif).
   - Kolom Kiri: Informasi pemesan & detail pesanan kustom (varian, ukuran).
   - Kolom Kanan: Foto bukti transfer DP dan tombol aksi (Konfirmasi Pembayaran/Tolak/Selesai).

==================================================
BAGIAN 2: SISI PELANGGAN (Mobile-First / Max Width 480px, layout ditengah)
==================================================
5. Login / Daftar Pelanggan:
   - Form simpel (Email/No. HP) untuk pelanggan masuk agar riwayat pesanannya tersimpan.
6. Katalog & Form PO:
   - Grid/List produk dengan FOTO KUE/MAKANAN NYATA (Unsplash), nama, dan harga.
   - Ada modal/bottom-sheet Form Pemesanan: input tanggal pengiriman, dan kolom catatan kustom.
7. Pembayaran & Upload DP:
   - Rincian subtotal pesanan dan perhitungan wajib DP otomatis (misal 50%).
   - Info rekening bank penerima dan area upload (drag & drop) foto struk bukti pembayaran.
8. Riwayat Pesanan Saya:
   - Navigasi tab untuk "Aktif" dan "Riwayat".
   - Menampilkan list card (kartu) pesanan pelanggan beserta badge statusnya.
9. Lacak Pesanan / Detail:
   - Rincian ringkasan item spesifik.
   - Timeline vertikal status pesanan (Menunggu Konfirmasi -> DP Diterima -> Diproses -> Dikirim -> Selesai).

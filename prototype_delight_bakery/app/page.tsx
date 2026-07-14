import Link from "next/link";
import { Icon } from "@/components/icon";
import { RouteCard } from "@/components/route-card";

const ADMIN_ROUTES = [
  {
    href: "/admin/login",
    label: "Login Admin",
    description: "Form login email + password dengan logo Delight Bakery.",
    icon: "lock",
    meta: "Masuk",
  },
  {
    href: "/admin",
    label: "Dashboard Admin",
    description:
      "Statistik pendapatan, pesanan aktif, dan jadwal kirim hari ini.",
    icon: "dashboard",
    meta: "Beranda",
  },
  {
    href: "/admin/orders",
    label: "Kelola Pesanan",
    description:
      "Tabel pesanan dengan filter status (Baru/Diproses/Selesai) + search.",
    icon: "receipt_long",
    meta: "List",
  },
  {
    href: "/admin/orders/PO-102",
    label: "Detail Pesanan (Admin)",
    description:
      "Rincian pesanan, bukti DP, dan aksi konfirmasi/tolak/selesai.",
    icon: "inventory_2",
    meta: "Detail",
  },
  {
    href: "/admin/profile",
    label: "Profil Admin",
    description:
      "Info akun, statistik toko, pengaturan & keluar (logout).",
    icon: "person",
    meta: "Profil",
  },
];

const CUSTOMER_ROUTES = [
  {
    href: "/login",
    label: "Login / Daftar Pelanggan",
    description: "Tab Masuk & Daftar, dengan background foto bakery.",
    icon: "login",
    meta: "Auth",
  },
  {
    href: "/katalog",
    label: "Katalog & Form PO",
    description:
      "Grid produk, bottom-sheet pemesanan dengan jumlah & tanggal kirim.",
    icon: "storefront",
    meta: "Katalog",
  },
  {
    href: "/pembayaran",
    label: "Pembayaran & Upload DP",
    description:
      "Rincian tagihan, rekening tujuan, dan upload bukti transfer DP.",
    icon: "payments",
    meta: "Bayar DP",
  },
  {
    href: "/pesanan",
    label: "Riwayat Pesanan",
    description:
      "Tab Aktif & Riwayat dengan kartu pesanan + badge status warna.",
    icon: "history",
    meta: "Riwayat",
  },
  {
    href: "/pesanan/PO-102",
    label: "Lacak Pesanan",
    description:
      "Timeline vertikal status pesanan dari konfirmasi sampai selesai.",
    icon: "timeline",
    meta: "Tracking",
  },
  {
    href: "/profil",
    label: "Profil Pelanggan",
    description:
      "Info akun, alamat tersimpan, bantuan & keluar (logout).",
    icon: "person",
    meta: "Profil",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold text-primary"
          >
            <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
              <Icon name="bakery_dining" size={20} filled={1} />
            </span>
            Delight Bakery
          </Link>
          <span className="hidden sm:inline-flex text-xs font-bold uppercase tracking-widest text-muted-foreground">
            High-Fidelity Prototype · 9 Halaman
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-5 py-10 md:py-14 space-y-12">
        {/* Hero */}
        <section className="text-center md:text-left space-y-3">
          <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Icon name="design_services" size={14} filled={1} />
            High-Fidelity Prototype
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight tracking-tight text-balance">
            Pre-Order &amp; Down Payment untuk{" "}
            <span className="text-primary">UMKM Kuliner</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Sistem dua sisi (two-sided UI) untuk{" "}
            <strong className="text-foreground">Admin/Owner</strong> (Navy,
            dashboard padat informasi) dan{" "}
            <strong className="text-foreground">Pelanggan</strong> (Orange,
            mobile-first, fokus checkout). Pilih halaman untuk masuk ke
            prototype.
          </p>
        </section>

        {/* Customer section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-primary">
                Sisi Pelanggan (B2C)
              </h2>
              <p className="text-sm text-muted-foreground">
                Orange · mobile-first · checkout yang ramah &amp; hangat.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              6 Halaman
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMER_ROUTES.map((r) => (
              <RouteCard key={r.href} {...r} tone="customer" />
            ))}
          </div>
        </section>

        {/* Admin section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900">
                Sisi Admin (B2B)
              </h2>
              <p className="text-sm text-muted-foreground">
                Navy · dashboard analitik · kelola pesanan &amp; konfirmasi DP.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              5 Halaman
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADMIN_ROUTES.map((r) => (
              <RouteCard key={r.href} {...r} tone="admin" />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-5 py-6 text-xs text-muted-foreground text-center">
          © 2024 Delight Bakery · High-Fidelity Prototype · Built with Next.js
          + Tailwind v4 + shadcn/ui
        </div>
      </footer>
    </div>
  );
}

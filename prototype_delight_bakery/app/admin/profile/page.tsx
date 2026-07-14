"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

// Admin user — hardcoded for prototype (single admin in mock system)
const ADMIN = {
  name: "Admin Delight",
  role: "Pemilik Toko",
  phone: "+62 812-1234-5678",
  email: "admin@delightbakery.com",
  joined: "Januari 2024",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=faces",
};

export default function AdminProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <AdminShell>
      <div className="py-8 px-4 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Page Header */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Profil Admin
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Informasi akun administrator Delight Bakery.
          </p>
        </section>

        {/* Profile Card */}
        <section className="bg-card rounded-2xl shadow-sm border border-border p-5 md:p-6 flex items-center gap-4 md:gap-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 overflow-hidden">
            <img
              alt={ADMIN.name}
              src={ADMIN.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold text-foreground font-heading truncate">
                {ADMIN.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                <Icon name="verified" size={12} filled={1} />
                {ADMIN.role}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
              <Icon name="mail" size={14} />
              <p className="text-xs truncate">{ADMIN.email}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
              <Icon name="phone" size={14} />
              <p className="text-xs truncate">{ADMIN.phone}</p>
            </div>
          </div>
        </section>

        {/* Account Stats */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <StatTile label="Bergabung" value={ADMIN.joined} icon="calendar_today" />
          <StatTile
            label="Total Pesanan"
            value="128"
            icon="receipt_long"
            suffix="pcs"
          />
          <StatTile
            label="Rating Toko"
            value="4.9"
            icon="star"
            suffix="/ 5.0"
            className="col-span-2 md:col-span-1"
          />
        </section>

        {/* Menu List */}
        <section className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <MenuRow
            icon="store"
            label="Pengaturan Toko"
            subtitle="Nama, alamat, jam buka"
          />
          <Divider />
          <MenuRow
            icon="bar_chart"
            label="Laporan Penjualan"
            subtitle="Rekap pendapatan & pesanan"
          />
          <Divider />
          <MenuRow icon="help" label="Bantuan & FAQ" />
          <Divider />
          <MenuRow
            icon="info"
            label="Tentang Aplikasi"
            subtitle="Versi 1.0.0"
          />
        </section>

        {/* Logout */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl",
              "border-2 border-red-200 bg-red-50 text-red-600",
              "font-bold text-sm tracking-wider uppercase",
              "hover:bg-red-100 active:scale-[0.98] transition-all"
            )}
          >
            <Icon name="logout" size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </AdminShell>
  );
}

function Divider() {
  return <div className="h-px bg-border mx-5" />;
}

function MenuRow({
  icon,
  label,
  subtitle,
}: {
  icon: string;
  label: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center gap-4 px-5 py-4 text-left",
        "hover:bg-muted active:bg-muted/70 transition-colors"
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon name={icon} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <Icon name="chevron_right" size={20} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function StatTile({
  label,
  value,
  icon,
  suffix,
  className,
}: {
  label: string;
  value: string;
  icon: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-sm border border-border p-4 flex items-center gap-3",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon name={icon} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-base font-bold text-foreground truncate">
          {value}
          {suffix && (
            <span className="text-xs font-medium text-muted-foreground ml-1">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icon";
import { CUSTOMERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ProfilPage() {
  const router = useRouter();
  // Single logged-in customer in this prototype
  const user = CUSTOMERS[0];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <CustomerShell>
      <main className="flex-1 flex flex-col w-full px-5 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Profil Saya
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola informasi akun dan preferensi Anda.
          </p>
        </div>

        {/* Profile Card */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] shrink-0 overflow-hidden">
            <img
              alt={user.name}
              src={user.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 font-heading truncate">
              {user.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <Icon name="phone" size={14} />
              <p className="text-xs truncate">{user.phone}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <Icon name="location_on" size={14} />
              <p className="text-xs truncate">{user.address}</p>
            </div>
          </div>
        </section>

        {/* Menu List */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <MenuRow
            icon="location_on"
            label="Alamat Tersimpan"
            subtitle={user.address}
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
        <div className="mt-auto pb-2">
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
      </main>
    </CustomerShell>
  );
}

function Divider() {
  return <div className="h-px bg-gray-100 mx-5" />;
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
        "hover:bg-gray-50 active:bg-gray-100 transition-colors"
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] shrink-0">
        <Icon name={icon} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <Icon name="chevron_right" size={20} className="text-gray-400 shrink-0" />
    </button>
  );
}

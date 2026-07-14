import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Icon } from "@/components/icon";
import { Card } from "@/components/ui/card";
import { formatIDR } from "@/lib/utils";
import { DASHBOARD_STATS, DELIVERIES_TODAY } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="py-8 px-4 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Welcome Header */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading">Halo, Admin!</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Berikut ringkasan operasional bisnis Anda hari ini.
          </p>
        </section>

        {/* Bento Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DASHBOARD_STATS.map((stat, i) => {
            // First card (i === 0) is revenue
            // Second card (i === 1) is active orders
            // Third card (i === 2) is pending DP
            return (
              <div
                key={stat.label}
                className="bg-card p-4 flex flex-col gap-2 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label === "Pendapatan Hari Ini" ? "Pendapatan" : stat.label}
                  </span>
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Icon name={stat.icon} size={20} filled={1} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.label === "Pendapatan Hari Ini" ? formatIDR(4500000) : stat.value}
                </div>
                {stat.label === "Pendapatan Hari Ini" && (
                  <div className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2">
                    <Icon name="trending_up" size={14} />
                    {stat.delta}
                  </div>
                )}
                {stat.label === "Pesanan Aktif" && (
                  <div className="text-xs font-medium text-muted-foreground mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {stat.sub}
                  </div>
                )}
                {stat.label === "Menunggu DP" && (
                  <div className="text-xs font-medium text-amber-600 mt-2 flex items-center gap-1">
                    <Icon name="info" size={14} className="text-amber-600" />
                    {stat.sub}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Upcoming Deliveries */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 font-heading">Jadwal Kirim Terdekat</h2>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Hari Ini
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {DELIVERIES_TODAY.map((delivery) => (
              <div
                key={delivery.code}
                className="bg-card p-4 rounded-2xl shadow-sm border border-border flex items-center justify-between hover:border-primary/20 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex w-10 h-10 items-center justify-center bg-muted rounded-xl text-muted-foreground">
                    <Icon name="package_2" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary">{delivery.code}</span>
                    <span className="text-sm text-muted-foreground font-medium">
                      {delivery.customer}
                      <span className="text-xs opacity-60 ml-1">• {delivery.qty}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {delivery.time}
                  </span>
                  <span
                    className={`text-[11px] font-bold flex items-center gap-1 uppercase tracking-wide ${
                      delivery.statusLabel === "Siap Kirim"
                        ? "text-emerald-600"
                        : delivery.statusLabel === "Proses Packing"
                        ? "text-amber-600"
                        : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        delivery.statusLabel === "Siap Kirim"
                          ? "bg-emerald-500"
                          : delivery.statusLabel === "Proses Packing"
                          ? "bg-amber-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {delivery.statusLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/admin/orders" className="self-center md:self-start">
            <button className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-primary/95 transition-all duration-200 shadow-md flex items-center gap-2">
              Lihat Semua Jadwal <Icon name="arrow_forward" size={18} />
            </button>
          </Link>
        </section>
      </div>
    </AdminShell>
  );
}

import Link from "next/link";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icon";
import { StatusBadge } from "@/components/status-badge";
import { formatIDR, formatDateID, cn } from "@/lib/utils";
import {
  ORDERS,
  TIMELINE_BY_STATUS,
  STATUS_LABEL,
  type OrderStatus,
} from "@/lib/mock-data";

// Material Symbols mapping to status
const STATUS_ICONS: Record<OrderStatus, string> = {
  menunggu_konfirmasi: "schedule",
  dp_diterima: "payments",
  diproses: "build",
  dikirim: "local_shipping",
  selesai: "check_circle",
  ditolak: "cancel",
};

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <CustomerShell>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <Icon name="error" size={32} />
          </div>
          <h2 className="text-xl font-bold">Pesanan Tidak Ditemukan</h2>
          <p className="text-muted-foreground max-w-xs text-sm">
            Maaf, kami tidak menemukan pesanan dengan nomor ID {id}. Pastikan link lacak pesanan yang Anda masukkan sudah benar.
          </p>
          <Link
            href="/pesanan"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/95 transition-colors"
          >
            <Icon name="arrow_back" size={18} />
            Kembali ke Pesanan Saya
          </Link>
        </div>
      </CustomerShell>
    );
  }

  const timeline = TIMELINE_BY_STATUS[order.status] || [];
  const sisa = order.total - order.paid;

  // Let's determine styling of Status Summary
  const isDiproses = order.status === "diproses";
  const isDikirim = order.status === "dikirim";
  const isSelesai = order.status === "selesai";
  const isDitolak = order.status === "ditolak";

  let statusColor = "text-muted-foreground";
  let statusDotColor = "bg-muted-foreground";

  if (isDiproses || order.status === "menunggu_konfirmasi" || order.status === "dp_diterima") {
    statusColor = "text-amber-500";
    statusDotColor = "bg-amber-500";
  } else if (isDikirim) {
    statusColor = "text-indigo-500";
    statusDotColor = "bg-indigo-500";
  } else if (isSelesai) {
    statusColor = "text-emerald-500";
    statusDotColor = "bg-emerald-500";
  } else if (isDitolak) {
    statusColor = "text-red-500";
    statusDotColor = "bg-red-500";
  }

  return (
    <CustomerShell>
      {/* Top Bar / Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 h-16 w-full bg-card border-b border-border">
        <Link
          href="/pesanan"
          aria-label="Kembali"
          className="flex items-center text-foreground transition-colors duration-200 active:scale-95"
        >
          <Icon name="arrow_back" size={24} />
        </Link>
        <h1 className="text-lg font-bold text-foreground">Lacak Pesanan #{id}</h1>
        <div className="w-6 h-6" /> {/* Spacer */}
      </header>

      {/* Main Content */}
      <div className="flex-1 px-5 pt-6 pb-24 space-y-6 max-w-md mx-auto w-full">
        
        {/* Order Status Summary */}
        <section className="bg-card p-5 rounded-2xl shadow-sm border border-border flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Status Pesanan
            </p>
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full animate-pulse", statusDotColor)} />
              <span className={cn("text-xl font-bold uppercase", statusColor)}>
                {STATUS_LABEL[order.status]}
              </span>
            </div>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Estimasi Tiba</p>
              <p className="text-base font-semibold text-foreground">
                {formatDateID(order.shipDate)}
              </p>
            </div>
            <Icon name="event" size={24} className="text-muted-foreground/45" />
          </div>
        </section>

        {/* Riwayat Perjalanan / Timeline */}
        <section className="bg-card p-5 rounded-2xl shadow-sm border border-border">
          <h2 className="text-lg font-bold mb-6 text-foreground">Riwayat Perjalanan</h2>
          <div className="relative space-y-10 pl-12">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-border" />

            {timeline.map((event, idx) => {
              const iconName = STATUS_ICONS[event.status] || "help_outline";

              return (
                <div key={idx} className="relative">
                  {/* Circle marker */}
                  <div
                    className={cn(
                      "absolute -left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ring-4 ring-card",
                      event.done && !event.active
                        ? "bg-emerald-500 text-white"
                        : event.active
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                        : "bg-card border-2 border-border"
                    )}
                  >
                    {event.done && !event.active ? (
                      <Icon name="check" size={18} className="text-white font-bold" />
                    ) : event.active ? (
                      <Icon name={iconName} size={18} className="text-white" filled={1} />
                    ) : null}
                  </div>

                  {/* Text Details */}
                  <h3
                    className={cn(
                      "text-base font-semibold",
                      event.done ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {event.label}
                  </h3>

                  {event.date && (
                    <p
                      className={cn(
                        "text-xs mt-0.5",
                        event.active ? "text-amber-500 font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {event.date}
                    </p>
                  )}

                  {event.description && (
                    <p
                      className={cn(
                        "text-sm mt-2 leading-relaxed",
                        event.done ? "text-muted-foreground" : "text-muted-foreground/60"
                      )}
                    >
                      {event.description}
                    </p>
                  )}

                  {/* Courier Info Card (Render only if event is active and order has courier) */}
                  {event.active && order.courier && (
                    <div className="mt-4 p-4 rounded-xl border border-border bg-muted/50 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                          <Icon name="person" size={24} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{order.courier.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Kurir Internal Delight Bakery
                          </p>
                        </div>
                      </div>
                      <a
                        href={`tel:${order.courier.phone}`}
                        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 active:scale-95 transition-transform"
                      >
                        <Icon name="call" size={20} filled={1} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Rincian Item */}
        <section className="bg-card p-5 rounded-2xl shadow-sm border border-border space-y-6">
          <h3 className="text-lg font-bold text-foreground">Rincian Item</h3>
          
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground mt-1">{item.variant} (x{item.qty})</p>
                  )}
                </div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap">
                  {formatIDR(item.unitPrice * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-border" />

          {/* Payment Reminder */}
          {sisa > 0 && (
            <div className="bg-muted p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="info" size={20} className="text-primary" filled={1} />
                <p className="text-sm font-bold text-foreground">Perhatian Pelunasan</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sisa tagihan sebesar{" "}
                <span className="font-bold text-primary">{formatIDR(sisa)}</span> harap dilunasi saat pesanan tiba.
              </p>
            </div>
          )}
        </section>
      </div>
    </CustomerShell>
  );
}

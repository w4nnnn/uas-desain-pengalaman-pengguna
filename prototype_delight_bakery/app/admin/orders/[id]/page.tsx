import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Icon } from "@/components/icon";
import { StatusBadge } from "@/components/status-badge";
import { ORDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatIDR, formatDateID } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailPesananPage({ params }: Props) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <Icon name="error" size={48} className="text-destructive mb-4" />
          <h1 className="text-xl font-bold mb-2">Pesanan tidak ditemukan</h1>
          <p className="text-muted-foreground mb-6">
            Maaf, pesanan dengan ID "{id}" tidak dapat ditemukan di sistem kami.
          </p>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 py-2.5 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all text-sm"
          >
            <Icon name="arrow_back" size={18} />
            Kembali ke Daftar Pesanan
          </Link>
        </div>
      </AdminShell>
    );
  }

  const { customer } = order;

  return (
    <AdminShell>
      <div className="min-h-screen bg-background text-foreground antialiased flex flex-col pb-32">
        {/* CUSTOM Top App Bar inside main content (NOT replacing AdminShell) */}
        <header className="sticky top-16 z-30 w-full bg-card border-b border-border flex justify-between items-center px-4 h-16 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <Icon name="arrow_back" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Detail Pesanan #{order.id}</h1>
          </div>
          <button className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors flex items-center justify-center">
            <Icon name="more_vert" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow pt-6 px-4 w-full max-w-2xl mx-auto flex flex-col gap-6">
          {/* Customer Info Section (above Rincian Pesanan card) */}
          <div className="bg-card p-4 rounded-xl border border-border flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex-shrink-0">
              <img
                src={customer.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=faces"}
                alt={customer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-foreground truncate">{customer.name}</h3>
              <p className="text-xs text-muted-foreground truncate mb-1">{customer.phone}</p>
              <p className="text-xs text-muted-foreground truncate">{customer.address}</p>
            </div>
          </div>

          {/* Rincian Section */}
          <section className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Icon name="inventory_2" className="text-primary text-xl" />
                Rincian Pesanan
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Kategori: {item.variant?.startsWith("Custom:") ? "Signature Cake" : "Pastry"}
                      </span>
                    </div>
                    <span className="text-sm font-semibold bg-muted px-2 py-1 rounded text-foreground whitespace-nowrap flex-shrink-0">
                      x {item.qty}
                    </span>
                  </div>
                ))}
              </div>

              {order.notes && (
                <div className="mt-2">
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Catatan Pembeli
                  </h3>
                  <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                    <p className="text-sm text-blue-900 leading-relaxed italic">
                      "{order.notes}"
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center py-3 px-4 bg-muted/20 rounded-lg border border-border mt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="calendar_today" className="text-lg" />
                  <span className="text-sm">Tgl Kirim Diminta</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {formatDateID(order.shipDate)}
                </span>
              </div>
            </div>
          </section>

          {/* Status Pembayaran Section */}
          <section className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30 flex justify-between items-center">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Icon name="payments" className="text-primary text-xl" />
                Status Pembayaran
              </h2>
              <StatusBadge status={order.status} variant="subtle" />
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Pesanan</span>
                  <span className="text-sm font-medium">{formatIDR(order.total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">DP Dibayarkan (50%)</span>
                  <span className="text-sm font-bold text-primary">{formatIDR(order.dpAmount)}</span>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Bukti Transfer DP
                </h3>
                {order.proofImage ? (
                  <div className="group relative w-full h-40 border border-border rounded-xl overflow-hidden cursor-pointer">
                    <img
                      src={order.proofImage}
                      alt="Bukti Transfer DP"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white text-muted-foreground flex items-center justify-center">
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="group relative w-full h-40 border-2 border-dashed border-border bg-muted/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <div className="flex flex-col items-center gap-2">
                      <Icon name="add_a_photo" className="text-muted-foreground group-hover:text-primary transition-colors text-3xl" />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        Klik untuk unggah foto
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative mt-4 pt-4 border-t border-dashed border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-muted-foreground">Sisa Tagihan</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatIDR(order.total - order.paid)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 w-full bg-card/85 backdrop-blur-md border-t border-border p-4 z-50">
          <div className="max-w-2xl mx-auto flex gap-3">
            <button className="flex-1 py-3.5 px-4 border border-border text-foreground bg-card hover:bg-muted font-semibold rounded-lg active:scale-[0.98] transition-all text-sm">
              Tolak
            </button>
            <button className="flex-[2] py-3.5 px-4 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold rounded-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2">
              <Icon name="check_circle" className="text-lg" />
              Konfirmasi DP &amp; Proses
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

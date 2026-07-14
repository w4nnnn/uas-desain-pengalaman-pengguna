"use client";

import Link from "next/link";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icon";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn, formatDateID } from "@/lib/utils";
import { ORDERS } from "@/lib/mock-data";

export default function OrderHistoryPage() {
  // Filter orders:
  // - AKTIF: status !== 'selesai' (e.g. menunggu_konfirmasi, dp_diterima, diproses, dikirim, ditolak is usually in history/riwayat or active depending on system, but requirement says RIWAYAT = status === 'selesai' or 'ditolak' if any)
  const activeOrders = ORDERS.filter(
    (order) => order.status !== "selesai" && order.status !== "ditolak"
  );
  
  const historyOrders = ORDERS.filter(
    (order) => order.status === "selesai" || order.status === "ditolak"
  );

  return (
    <CustomerShell>
      <main className="flex-1 flex flex-col w-full px-5 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Pesanan Saya
          </h2>
        </div>

        {/* Tabs Navigation using custom styled tabs matching design */}
        <Tabs defaultValue="aktif" className="w-full flex flex-col gap-6">
          <TabsList className="inline-flex w-full overflow-x-auto hide-scrollbar justify-start bg-muted/60 p-1.5 rounded-2xl h-auto gap-1 border border-border/50">
            <TabsTrigger
              value="aktif"
              className={cn(
                "flex-1 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=active]:font-bold",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Aktif
            </TabsTrigger>
            <TabsTrigger
              value="riwayat"
              className={cn(
                "flex-1 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=active]:font-bold",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Riwayat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aktif" className="outline-none">
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <Icon name="receipt_long" size={48} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium">Belum ada pesanan</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {activeOrders.map((order) => {
                  const itemsName = order.items.map((i) => i.name).join(", ");
                  const orderTitle =
                    itemsName.length > 60
                      ? itemsName.substring(0, 57) + "..."
                      : itemsName;
                  const isWaitingOrDp =
                    order.status === "menunggu_konfirmasi" ||
                    order.status === "dp_diterima";

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-4 overflow-hidden"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Food Image */}
                        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          <img
                            alt={orderTitle}
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&q=80"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-24">
                          <div>
                            <div className="flex justify-between items-start">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                                {order.id}
                              </p>
                              {/* Status Badge */}
                              <StatusBadge status={order.status} size="xs" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                              {orderTitle}
                            </h3>
                            <div className="flex items-center gap-1 mt-1 text-gray-500">
                              <Icon name="calendar_today" size={16} />
                              <p className="text-xs">
                                Kirim: {formatDateID(order.shipDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end pt-3 border-t border-gray-100">
                        {isWaitingOrDp ? (
                          <Link
                            href={`/pesanan/${order.id}`}
                            className="text-primary font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors border border-primary text-center"
                          >
                            DETAIL PESANAN
                          </Link>
                        ) : (
                          <Link
                            href={`/pesanan/${order.id}`}
                            className="bg-primary text-white font-bold text-xs tracking-wider uppercase px-6 py-2 rounded-lg hover:brightness-110 transition-all shadow-md shadow-primary/20 text-center"
                          >
                            LACAK PESANAN
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="riwayat" className="outline-none">
            {historyOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <Icon name="receipt_long" size={48} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium">Belum ada pesanan</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {historyOrders.map((order) => {
                  const itemsName = order.items.map((i) => i.name).join(", ");
                  const orderTitle =
                    itemsName.length > 60
                      ? itemsName.substring(0, 57) + "..."
                      : itemsName;

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-4 overflow-hidden opacity-85"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Food Image */}
                        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 grayscale-[25%]">
                          <img
                            alt={orderTitle}
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&q=80"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-24">
                          <div>
                            <div className="flex justify-between items-start">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                                {order.id}
                              </p>
                              {/* Status Badge */}
                              <StatusBadge status={order.status} size="xs" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                              {orderTitle}
                            </h3>
                            <div className="flex items-center gap-1 mt-1 text-gray-500">
                              <Icon name="calendar_today" size={16} />
                              <p className="text-xs">
                                Terkirim: {formatDateID(order.shipDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end pt-3 border-t border-gray-100">
                        <Link
                          href="/katalog"
                          className="text-gray-500 font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-center"
                        >
                          PESAN LAGI
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </CustomerShell>
  );
}

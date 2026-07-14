"use client";

import * as React from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { Icon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { ORDERS } from "@/lib/mock-data";
import { cn, formatDateID, formatIDR } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = React.useState("masuk");
  const [search, setSearch] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"desc" | "asc">("desc");

  // Count tabs based on paymentStatus
  const masukCount = React.useMemo(() => {
    return ORDERS.filter((o) => o.paymentStatus === "belum_bayar").length;
  }, []);

  const prosesCount = React.useMemo(() => {
    return ORDERS.filter((o) => o.paymentStatus === "dp").length;
  }, []);

  const selesaiCount = React.useMemo(() => {
    return ORDERS.filter((o) => o.paymentStatus === "lunas").length;
  }, []);

  // Filter & sort orders
  const getFilteredOrders = React.useCallback(
    (tabValue: string) => {
      return ORDERS.filter((order) => {
        // 1. Tab filter
        const matchesTab =
          tabValue === "masuk"
            ? order.paymentStatus === "belum_bayar"
            : tabValue === "proses"
            ? order.paymentStatus === "dp"
            : order.paymentStatus === "lunas";

        if (!matchesTab) return false;

        // 2. Search query filter
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchId = order.id.toLowerCase().includes(query);
          const matchCustomer = order.customer.name.toLowerCase().includes(query);
          return matchId || matchCustomer;
        }

        return true;
      }).sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
    },
    [search, sortOrder]
  );

  const renderOrdersGrid = (tabValue: string) => {
    const list = getFilteredOrders(tabValue);

    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-2xl border border-border shadow-sm">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
            <Icon name="search_off" size={24} />
          </div>
          <h3 className="font-bold text-base text-foreground">
            Tidak ada pesanan ditemukan
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Coba cari dengan kata kunci lain atau ubah filter status Anda.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="block bg-card rounded-xl p-5 shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    alt={order.customer.name}
                    className="w-full h-full object-cover"
                    src={order.customer.avatar}
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                    #{order.id}
                  </span>
                  <h3 className="font-bold text-base md:text-lg text-foreground">
                    {order.customer.name}
                  </h3>
                  <span className="text-xs font-semibold text-primary block mt-0.5">
                    {formatIDR(order.total)}
                  </span>
                </div>
              </div>
              <span className="text-muted-foreground/50 group-hover:text-primary transition-colors">
                <Icon name="chevron_right" size={20} />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-muted/50 rounded-lg p-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
                  Tgl Kirim
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatDateID(order.shipDate)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
                  Status Pembayaran
                </span>
                <div className="flex items-center">
                  <StatusBadge status={order.status} withDot size="xs" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto px-4 mt-6 pb-24 md:pb-8 flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Kelola Pesanan
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pantau dan proses seluruh pesanan Pre-Order pelanggan.
          </p>
        </div>

        {/* Search + Filter Row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Cari ID, Nama Pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-card border border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary text-sm shadow-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
            className="h-12 px-5 bg-card border border-border flex items-center justify-center gap-2 hover:bg-muted transition-all rounded-xl shadow-sm text-foreground shrink-0"
          >
            <Icon
              name="filter_list"
              size={20}
              className={cn("transition-transform", sortOrder === "asc" && "rotate-180")}
            />
            <span className="hidden md:inline text-sm font-medium">
              {sortOrder === "desc" ? "Terbaru" : "Terlama"}
            </span>
          </button>
        </div>

        {/* Tab Navigation & Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col gap-6">
          <TabsList
            variant="line"
            className="flex w-full overflow-x-auto hide-scrollbar justify-start border-b border-border bg-transparent p-0 h-auto gap-0"
          >
            <TabsTrigger
              value="masuk"
              className={cn(
                "px-6 py-3 rounded-none border-b-2 text-sm font-semibold whitespace-nowrap bg-transparent hover:bg-transparent after:hidden transition-all duration-200",
                activeTab === "masuk"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Masuk/Baru
              <span
                className={cn(
                  "ml-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors",
                  activeTab === "masuk"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {masukCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="proses"
              className={cn(
                "px-6 py-3 rounded-none border-b-2 text-sm font-semibold whitespace-nowrap bg-transparent hover:bg-transparent after:hidden transition-all duration-200",
                activeTab === "proses"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Diproses
              <span
                className={cn(
                  "ml-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors",
                  activeTab === "proses"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {prosesCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="selesai"
              className={cn(
                "px-6 py-3 rounded-none border-b-2 text-sm font-semibold whitespace-nowrap bg-transparent hover:bg-transparent after:hidden transition-all duration-200",
                activeTab === "selesai"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Selesai
              <span
                className={cn(
                  "ml-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors",
                  activeTab === "selesai"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {selesaiCount}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="masuk" className="mt-0">
            {renderOrdersGrid("masuk")}
          </TabsContent>
          <TabsContent value="proses" className="mt-0">
            {renderOrdersGrid("proses")}
          </TabsContent>
          <TabsContent value="selesai" className="mt-0">
            {renderOrdersGrid("selesai")}
          </TabsContent>
        </Tabs>
      </div>
    </AdminShell>
  );
}

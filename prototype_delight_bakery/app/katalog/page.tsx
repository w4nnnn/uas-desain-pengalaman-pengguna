"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icon";
import { PRODUCTS, type Product } from "@/lib/mock-data";
import { formatIDR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function KatalogPage() {
  const router = useRouter();

  // Selected product in sheet
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(PRODUCTS[0]);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Cart/ordering state for the active product
  const [quantity, setQuantity] = React.useState(1);
  const [shipDate, setShipDate] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // Track if user has added/ordered anything (to show floating subtotal bar)
  // Whenever they fill a qty and/or have an item in order
  const [lastOrderedProduct, setLastOrderedProduct] = React.useState<Product | null>(null);
  const [lastOrderedQty, setLastOrderedQty] = React.useState(0);

  // Handle open sheet for specific product
  const handlePesanClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setNotes("");
    setIsSheetOpen(true);
  };

  // Stepper controls
  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    }
  };

  // Submit order action -> redirects to /pembayaran
  const handleLanjutPembayaran = (e: React.FormEvent) => {
    e.preventDefault();
    // Save last order details to show floating bar, but here we directly navigate
    // according to spec: "navigates to /pembayaran"
    // We can also store in localStorage or state if needed, but simple router push works:
    router.push("/pembayaran");
  };

  // Favorite states (optional favorite icon top-right on first card)
  const [isFavorited, setIsFavorited] = React.useState(true);

  // Calculate totals
  const currentTotalPrice = selectedProduct.price * quantity;
  const lastOrderedTotalPrice = lastOrderedProduct ? lastOrderedProduct.price * lastOrderedQty : 0;

  // Function to simulate clicking "Pesan" on floating bar
  const handleFloatingBarClick = () => {
    if (lastOrderedProduct) {
      setSelectedProduct(lastOrderedProduct);
      setQuantity(lastOrderedQty);
      setIsSheetOpen(true);
    }
  };

  return (
    <CustomerShell>
      {/* Top App Bar - sticky, inside main, above the sheet */}
      <header className="sticky top-0 w-full flex justify-between items-center px-5 h-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30">
        <div className="flex items-center gap-3">
          <button className="text-gray-800 p-2 rounded-full active:bg-gray-100 transition-colors">
            <Icon name="menu" size={24} />
          </button>
          <span className="text-xl font-bold tracking-tight text-[#FF7A00] font-heading">
            Delight Bakery
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-gray-800 p-2 rounded-full active:bg-gray-100 transition-colors">
            <Icon name="search" size={24} />
          </button>
          <button className="text-gray-800 p-2 rounded-full active:bg-gray-100 transition-colors relative">
            <Icon name="shopping_cart" size={24} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF7A00] text-[10px] text-white flex items-center justify-center rounded-full font-bold">
              1
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-4 pb-24 px-5">
        {/* Store Info Card */}
        <section className="mb-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] shrink-0">
            <Icon name="store" size={28} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 font-heading">
              Delight Bakery
            </h2>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Pemesanan khusus kue kering dan basah buatan rumah dari Delight Bakery.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product, idx) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs group flex flex-col"
            >
              <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                <img
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={product.image}
                />
                {idx === 0 && (
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-xs active:scale-95 transition-transform z-10"
                  >
                    <Icon
                      name="favorite"
                      size={18}
                      className={cn(isFavorited ? "text-[#FF7A00]" : "text-gray-300")}
                      filled={isFavorited ? 1 : 0}
                    />
                  </button>
                )}
              </div>
              <div className="p-3.5 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[#FF7A00] font-bold text-xs mb-3">
                  {formatIDR(product.price)}{" "}
                  <span className="text-gray-500 font-normal text-[10px]">
                    / {product.unit}
                  </span>
                </p>
                <Button
                  onClick={() => handlePesanClick(product)}
                  className="mt-auto w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white py-2 px-3 rounded-xl font-semibold text-xs active:scale-95 transition-all h-9"
                >
                  Pesan
                </Button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Floating Subtotal Bar */}
      {lastOrderedProduct && lastOrderedQty > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-white/80 backdrop-blur-md border border-[#FF7A00]/20 rounded-2xl p-4 shadow-xl flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF7A00] mb-0.5">
                Subtotal
              </span>
              <span className="text-base font-bold text-gray-900">
                {formatIDR(lastOrderedTotalPrice)}
              </span>
            </div>
            <Button
              onClick={handleFloatingBarClick}
              className="bg-[#FF7A00] hover:bg-[#E66E00] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-[#FF7A00]/20 active:scale-95 transition-transform text-xs h-9"
            >
              <span>Pesan</span>
              <Icon name="shopping_basket" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Sheet Order Form */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl max-h-[85vh] flex flex-col p-0 border-t border-gray-200 bg-white"
          showCloseButton={false}
        >
          {/* Drag handle bar */}
          <div className="w-full flex flex-col items-center pt-3 pb-3 shrink-0">
            <div className="w-10 h-1 bg-gray-200 rounded-full mb-3"></div>
            <div className="w-full px-5 flex justify-between items-center">
              <SheetHeader className="p-0">
                <SheetTitle className="text-lg font-bold text-gray-900 font-heading">
                  Detail Pesanan
                </SheetTitle>
              </SheetHeader>
              <button
                type="button"
                className="p-1.5 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition-transform"
                onClick={() => setIsSheetOpen(false)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="px-5 pb-6 overflow-y-auto flex-grow">
            {/* Product Summary Block */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl mb-5">
              <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0 shadow-xs">
                <img
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  src={selectedProduct.image}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-base text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="text-[#FF7A00] font-bold text-sm mt-1">
                  {formatIDR(selectedProduct.price)} / {selectedProduct.unit}
                </p>
              </div>
            </div>

            <form onSubmit={handleLanjutPembayaran} className="space-y-5">
              {/* Quantity Stepper */}
              <div>
                <Label className="block text-xs font-bold mb-2.5 text-gray-900">
                  Pilih Jumlah
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 w-max border border-gray-200/50">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={decrementQty}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-xs active:scale-90 transition-transform disabled:opacity-30 text-gray-700"
                    >
                      <Icon name="remove" size={16} />
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={handleQtyChange}
                      min="1"
                      className="w-12 text-center border-none focus:ring-0 font-bold bg-transparent p-0 text-sm h-8"
                    />
                    <button
                      type="button"
                      onClick={incrementQty}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-xs active:scale-90 transition-transform text-gray-700"
                    >
                      <Icon name="add" size={16} />
                    </button>
                  </div>
                  <span className="text-gray-500 text-xs italic">
                    Minimal order 1 unit
                  </span>
                </div>
              </div>

              {/* Delivery Schedule */}
              <div>
                <Label className="block text-xs font-bold mb-2.5 text-gray-900">
                  Jadwal Pengiriman
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    required
                    value={shipDate}
                    onChange={(e) => setShipDate(e.target.value)}
                    className="w-full border-gray-200 bg-gray-50 rounded-xl p-4 text-xs font-medium focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] appearance-none border h-12 pr-10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <Icon name="calendar_today" size={18} />
                  </span>
                </div>
              </div>

              {/* Catatan Khusus */}
              <div>
                <Label className="block text-xs font-bold mb-2.5 text-gray-900">
                  Catatan Khusus
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border-gray-200 bg-gray-50 rounded-xl p-3 text-xs focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] resize-none placeholder-gray-400 border min-h-20"
                  placeholder="Misal: 'Tolong kemas untuk kado ulang tahun'"
                  rows={3}
                />
              </div>

              {/* Form submit is handled by the sticky footer button */}
              <button type="submit" className="hidden" id="submit-form-btn" />
            </form>
          </div>

          {/* Sticky Footer */}
          <div className="px-5 pt-3 pb-6 border-t border-gray-200 bg-white shrink-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-medium">
                  Total Pembayaran
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {formatIDR(currentTotalPrice)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={() => {
                // Update floating bar state before redirecting, just in case
                setLastOrderedProduct(selectedProduct);
                setLastOrderedQty(quantity);
                
                // Programmatically trigger form submit
                const submitBtn = document.getElementById("submit-form-btn");
                if (submitBtn) {
                  submitBtn.click();
                } else {
                  router.push("/pembayaran");
                }
              }}
              className="w-full bg-[#FF7A00] hover:bg-[#E66E00] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#FF7A00]/20 active:scale-[0.98] transition-transform h-12"
            >
              Lanjut ke Pembayaran
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </CustomerShell>
  );
}

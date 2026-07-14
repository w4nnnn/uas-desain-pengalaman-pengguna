"use client";

import { useState } from "react";
import Link from "next/link";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icon";
import { cn, formatIDR } from "@/lib/utils";
import { BANK_ACCOUNTS } from "@/lib/mock-data";

export default function PembayaranPage() {
  const [selectedBankId, setSelectedBankId] = useState<string>("bca");
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleCopy = (bankId: string, number: string) => {
    navigator.clipboard.writeText(number).catch((err) => {
      console.error("Gagal menyalin teks: ", err);
    });
    setCopiedBankId(bankId);
    setTimeout(() => {
      setCopiedBankId(null);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <CustomerShell>
      <main className="max-w-md mx-auto p-5 space-y-6 pt-24 relative">
        {/* Top app bar (sticky inside main, before content) */}
        <header className="absolute top-0 left-0 right-0 h-16 flex justify-between items-center px-5 bg-card border-b border-neutral-200 z-50">
          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="hover:bg-muted p-2 rounded-full flex items-center justify-center transition-colors text-foreground"
            >
              <Icon name="arrow_back" />
            </Link>
            <h1 className="text-lg font-bold text-foreground font-heading">
              Pembayaran & DP
            </h1>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-muted p-2 rounded-full flex items-center justify-center text-muted-foreground transition-colors">
              <Icon name="notifications" />
            </button>
          </div>
        </header>

        {/* Rincian Tagihan card */}
        <section className="bg-card rounded-2xl border border-neutral-200/50 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-foreground font-heading">
            Rincian Tagihan
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Subtotal Pesanan
              </span>
              <span className="text-sm font-medium text-foreground">
                {formatIDR(500000)}
              </span>
            </div>
            <div className="border-t border-dashed border-neutral-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-foreground">
                  Total Pembayaran
                </span>
                <span className="text-base font-bold text-primary">
                  {formatIDR(500000)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="info" className="text-amber-500" />
              <span className="text-sm font-semibold text-amber-600">
                Wajib DP (Min 50%)
              </span>
            </div>
            <span className="text-sm font-bold text-amber-600">
              {formatIDR(250000)}
            </span>
          </div>
        </section>

        {/* Pilih Rekening Tujuan section */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground px-1 font-heading">
            Pilih Rekening Tujuan
          </h2>
          <div className="space-y-3">
            {BANK_ACCOUNTS.map((bank) => {
              const isSelected = selectedBankId === bank.id;
              const isCopied = copiedBankId === bank.id;

              return (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBankId(bank.id)}
                  className={cn(
                    "bg-card rounded-2xl p-5 relative overflow-hidden transition-all cursor-pointer select-none",
                    isSelected
                      ? "border-2 border-primary shadow-sm"
                      : "border border-transparent opacity-80 hover:opacity-100 shadow-sm"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 p-2">
                      <Icon name="check_circle" className="text-primary" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={cn(
                        "w-12 h-8 rounded flex items-center justify-center text-[10px] font-bold border",
                        bank.label === "BCA"
                          ? "bg-blue-50 text-blue-800 border-blue-100"
                          : "bg-yellow-50 text-yellow-700 border-yellow-100"
                      )}
                    >
                      {bank.label}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {bank.sub}
                      </p>
                      <p className="font-semibold text-foreground">
                        {bank.number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                    <span className="text-xs text-muted-foreground italic">
                      a.n. PO UMKM Sejahtera
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(bank.id, bank.number);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-bold transition-colors",
                        isCopied
                          ? "text-green-600 hover:text-green-700"
                          : "text-primary hover:text-primary-hover"
                      )}
                    >
                      <Icon
                        name={isCopied ? "check" : "content_copy"}
                        size={14}
                      />
                      {isCopied ? "Tersalin" : "Salin Rekening"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bukti Pembayaran section */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground px-1 font-heading">
            Bukti Pembayaran
          </h2>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="payment-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="payment-upload"
              className={cn(
                "flex flex-col items-center justify-center w-full h-48 bg-card rounded-2xl border-2 border-dashed border-neutral-200 hover:border-primary hover:bg-orange-50/20 transition-all cursor-pointer group shadow-sm",
                fileName && "border-primary bg-orange-50/10"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors",
                  fileName && "bg-orange-100"
                )}
              >
                <Icon
                  name={fileName ? "task" : "add_a_photo"}
                  className="text-primary"
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold text-foreground group-hover:text-primary transition-colors",
                  fileName && "text-primary"
                )}
              >
                {fileName || "Klik untuk unggah foto"}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Format JPG, PNG (Maks 5MB)
              </p>
            </label>
          </div>
        </section>

        {/* Submit button block */}
        <div className="pt-4 pb-8">
          <Link href="/pesanan/PO-102" className="block">
            <button className="w-full bg-primary text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-orange-200 hover:bg-primary-hover transition-all active:scale-[0.98] uppercase tracking-wider">
              Kirim Bukti Pembayaran
            </button>
          </Link>
          <p className="text-[10px] text-center text-muted-foreground mt-4 px-4 leading-relaxed">
            Pastikan bukti transfer yang Anda unggah terlihat jelas dan sesuai
            dengan nominal tagihan.
          </p>
        </div>
      </main>
    </CustomerShell>
  );
}

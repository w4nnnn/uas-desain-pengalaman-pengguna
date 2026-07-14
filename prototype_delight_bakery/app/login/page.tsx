"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Tab = "masuk" | "daftar";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=80&auto=format&fit=crop";

export default function LoginPelangganPage() {
  const [tab, setTab] = useState<Tab>("daftar");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-5 overflow-hidden relative">
      {/* Background image + overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <main className="w-full max-w-sm flex flex-col gap-8 relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Brand logo area */}
        <header className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-2xl shadow-lg flex items-center justify-center mb-2">
            <Icon name="bakery_dining" size={36} filled={1} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Delight Bakery
          </h1>
          <p className="text-white/80 text-sm">Rasa Autentik di Setiap Gigitan</p>
        </header>

        {/* Auth card */}
        <section className="bg-card shadow-xl shadow-black/10 rounded-2xl flex flex-col overflow-hidden border border-white/20">
          {/* Tab switcher */}
          <div className="flex border-b border-border" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "masuk"}
              onClick={() => setTab("masuk")}
              className={cn(
                "flex-1 py-5 font-heading text-sm font-semibold transition-colors duration-200",
                tab === "masuk"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              Masuk
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "daftar"}
              onClick={() => setTab("daftar")}
              className={cn(
                "flex-1 py-5 font-heading text-sm font-semibold transition-colors duration-200",
                tab === "daftar"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              Daftar
            </button>
          </div>

          {/* Form */}
          <form
            className="p-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {tab === "daftar" && (
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="nama"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1"
                >
                  Nama Lengkap
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama lengkap"
                  className="bg-muted/50 h-12 rounded-xl text-sm"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="nohp"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1"
              >
                No HP
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  +62
                </span>
                <Input
                  id="nohp"
                  name="nohp"
                  type="tel"
                  placeholder="81234567890"
                  className="bg-muted/50 h-12 rounded-xl pl-12 pr-4 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    tab === "daftar" ? "Minimal 8 karakter" : "Masukkan password"
                  }
                  className="bg-muted/50 h-12 rounded-xl pr-12 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full"
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility_off"}
                    size={20}
                  />
                </button>
              </div>
            </div>

            {/* Primary action */}
            <Link href="/katalog" className="block">
              <Button
                type="button"
                className="w-full mt-2 bg-primary text-white py-6 rounded-xl font-heading text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
              >
                {tab === "daftar" ? "Daftar Sekarang" : "Masuk"}
              </Button>
            </Link>

            <p className="text-[11px] text-center text-muted-foreground px-2 leading-relaxed">
              Dengan {tab === "daftar" ? "mendaftar" : "masuk"}, Anda menyetujui{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">
                Syarat &amp; Ketentuan
              </span>{" "}
              kami.
            </p>
          </form>
        </section>

        {/* Secondary action */}
        <div className="text-center">
          <Link
            href="/katalog"
            className="inline-flex items-center justify-center gap-2 mx-auto bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 font-medium text-sm text-white/90 hover:text-white hover:bg-white/15 transition-colors duration-200"
          >
            Lanjutkan sebagai Tamu
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 text-white/40 text-[10px] uppercase tracking-widest pointer-events-none text-center">
        © 2024 Delight Bakery Co.
      </div>
    </div>
  );
}

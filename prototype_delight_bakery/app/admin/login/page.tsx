"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  return (
    <div className="theme-admin min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Minimal Top Bar with just the brand mark for context */}
      <header className="h-16 bg-card border-b border-border shadow-sm flex items-center">
        <div className="max-w-6xl w-full mx-auto px-4 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-bold text-primary tracking-tight"
          >
            <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
              <Icon name="bakery_dining" size={20} filled={1} />
            </span>
            Delight Bakery
          </Link>
        </div>
      </header>

      {/* Main Centered Login Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6">
          {/* Logo Section */}
          <header className="flex flex-col items-center gap-3 mb-2">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Icon name="business_center" size={36} className="text-primary-foreground" />
            </div>
            <div className="text-center">
              <h2 className="text-primary font-heading font-bold text-xl tracking-tight">Delight Bakery</h2>
            </div>
          </header>

          {/* Login Card */}
          <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-heading font-bold text-foreground">Login Pemilik</h1>
              <p className="text-muted-foreground text-sm mt-1">Silakan masuk ke akun pengelola Anda</p>
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email / No. HP
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Icon name="mail" size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    className="w-full pl-11 pr-4 py-3 h-11 text-sm bg-card border border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-muted-foreground/50"
                    id="email"
                    name="email"
                    placeholder="contoh@email.com"
                    type="text"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Link className="text-xs font-semibold text-primary hover:underline" href="#">
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Icon name="lock" size={20} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    className="w-full pl-11 pr-4 py-3 h-11 text-sm bg-card border border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-muted-foreground/50"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              {/* Submit Button wrapping Link */}
              <div className="mt-2">
                <Link href="/admin" className="block w-full">
                  <Button
                    type="button"
                    className="w-full bg-primary text-primary-foreground py-3.5 h-12 rounded-xl font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Masuk Ke Dashboard
                    <Icon name="arrow_forward" size={18} />
                  </Button>
                </Link>
              </div>
            </form>
          </section>

          {/* Footer Info */}
          <footer className="text-center">
            <p className="text-muted-foreground text-xs">© 2024 Delight Bakery. Seluruh Hak Cipta Dilindungi.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

# Delight Bakery — Pre-Order & Down Payment Prototype

High-fidelity Next.js 16 prototype for a **bakery pre-order system with down-payment (DP) flow**. Built for UAS *Desain Pengalaman Pengguna* (User Experience Design Final Project).

**Role context:** Two distinct interfaces — **Customer** (mobile-first phone frame) and **Admin** (desktop-first dashboard).

---

## 🎯 Project Overview

| Aspect | Details |
|--------|---------|
| **Domain** | UMKM kuliner — Delight Bakery (kue kering, basah, bolu, pastry) |
| **Core Flow** | Katalog → Pesan (bottom sheet) → Pembayaran DP (50% min) → Upload bukti → Lacak status |
| **Admin Flow** | Login → Dashboard (stats + jadwal kirim) → Kelola Pesanan (tabs + search) → Detail + Konfirmasi DP |
| **Fidelity** | High-fidelity — real icons, realistic data, interactive states, responsive shells |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router, React 19, Turbopack) |
| **Styling** | Tailwind CSS v4 + CSS Variables (design tokens) |
| **UI Kit** | shadcn/ui-style components (Radix primitives via @shadcn/react) |
| **Icons** | Material Symbols Outlined (Google Fonts CDN) |
| **Fonts** | Inter (UI) + Poppins (Headings) via `next/font` |
| **State** | React hooks (`useState`, `useMemo`, `useCallback`) — no global store |
| **Data** | Single `lib/mock-data.ts` — products, customers, orders, timeline, banks |
| **Forms** | Native `<form>` + controlled inputs (no form lib) |
| **Notifications** | sonner (toast) ready, not yet wired |
| **Lint/Type** | ESLint 9 + TypeScript 5 (strict) |

**Key dependencies:**
```json
{
  "next": "16.2.10",
  "react": "19.2.4",
  "@shadcn/react": "^0.2.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.6.0",
  "lucide-react": "^1.24.0",
  "date-fns": "^4.4.0"
}
```

---

## 📁 Project Structure

```
prototype_delight_bakery/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, Material Symbols, metadata
│   ├── globals.css                # Tailwind v4 + CSS variables (design tokens)
│   ├── page.tsx                   # Landing: route cards → /admin/* and /login
│   ├── login/
│   │   └── page.tsx               # Customer login (placeholder)
│   ├── katalog/
│   │   └── page.tsx               # Customer home — product grid + order bottom sheet
│   ├── pesanan/
│   │   ├── page.tsx               # Customer order history (tabs: Aktif / Riwayat)
│   │   └── [id]/
│   │       └── page.tsx           # Customer track order (timeline + courier)
│   ├── pembayaran/
│   │   └── page.tsx               # DP payment — bank selection + upload bukti
│   ├── profil/
│   │   └── page.tsx               # Customer profile (info + menu + logout)
│   └── admin/
│       ├── layout.tsx             # (implicit via AdminShell in each page)
│       ├── page.tsx               # Dashboard — stats + jadwal kirim hari ini
│       ├── login/
│       │   └── page.tsx           # Admin login (email/password)
│       ├── orders/
│       │   ├── page.tsx           # Order management — tabs + search + sort
│       │   └── [id]/
│       │       └── page.tsx       # Order detail — items, DP proof, confirm/reject
│       └── profile/
│           └── page.tsx           # Admin profile — stats + menu + logout
├── components/
│   ├── customer-shell.tsx         # Mobile frame + bottom nav (Beranda/Pesanan/Profil)
│   ├── admin-shell.tsx            # Desktop top nav + mobile bottom nav
│   ├── icon.tsx                   # Material Symbols wrapper (size, FILL, weight)
│   ├── status-badge.tsx           # Status pill with dot + tone mapping
│   ├── route-card.tsx             # Landing page card component
│   └── ui/                        # 60+ shadcn-style components (button, card, tabs, sheet, etc.)
├── lib/
│   ├── mock-data.ts               # Single source of truth — types + all mock data
│   └── utils.ts                   # cn(), formatIDR(), formatDateID()
├── hooks/
│   └── use-mobile.ts              # Mobile breakpoint hook
├── components.json                # shadcn config (style: "new-york", baseColor: "neutral")
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System & Tokens

### Color Palette (CSS Variables in `globals.css`)

```css
:root {
  /* Brand — Delight Orange */
  --primary: 25 95% 53%;           /* #FF7A00 */
  --primary-foreground: 0 0% 100%;
  --primary-hover: 25 95% 48%;     /* #E66E00 */

  /* Neutral */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --ring: 25 95% 53%;

  /* Status tones (used by StatusBadge) */
  --amber: 38 92% 50%;             /* menunggu_konfirmasi, diproses */
  --blue: 221 83% 53%;             /* dp_diterima */
  --indigo: 239 84% 67%;           /* dikirim */
  --emerald: 142 76% 36%;          /* selesai */
  --red: 0 84% 60%;                /* ditolak */
}
```

### Typography
| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **UI / Body** | Inter | 400, 500 | Default `font-sans` |
| **Headings** | Poppins | 400–700 | `font-heading` utility |

### Spacing & Radius
- **Base unit:** 4px (Tailwind default)
- **Card radius:** `rounded-2xl` (16px) — consistent across shells
- **Button radius:** `rounded-xl` / `rounded-2xl`
- **Icon containers:** `rounded-xl` (12px) or `rounded-full`

### Icon System
- **Library:** Material Symbols Outlined (variable font)
- **Wrapper:** `components/icon.tsx` — `Icon` component
- **Props:** `name`, `size` (px, default 20), `filled` (0 | 1), `className`
- **FILL axis:** 0 = outlined, 1 = filled (used for active states)

```tsx
<Icon name="shopping_cart" size={24} filled={1} />
```

---

## 🧩 Core Components

### Shells (Layout Wrappers)

| Shell | File | Audience | Key Features |
|-------|------|----------|--------------|
| **CustomerShell** | `components/customer-shell.tsx` | Customer (mobile) | Phone frame (`max-w-md`), sticky bottom nav (3 tabs), `children` slot |
| **AdminShell** | `components/admin-shell.tsx` | Admin (desktop + mobile) | Top app bar (brand + nav + avatar), responsive mobile bottom nav, `children` slot |

**Customer Bottom Nav:**
```ts
CUSTOMER_NAV = [
  { href: "/katalog", label: "Beranda", icon: "home" },
  { href: "/pesanan", label: "Pesanan", icon: "receipt_long" },
  { href: "/profil", label: "Profil", icon: "person" },
];
```

**Admin Nav:**
```ts
ADMIN_NAV = [
  { href: "/admin", label: "Beranda", icon: "home" },
  { href: "/admin/orders", label: "Pesanan", icon: "receipt_long" },
  { href: "/admin/profile", label: "Profil", icon: "person" },
];
```

### Reusable UI Components

| Component | File | Purpose |
|-----------|------|---------|
| **StatusBadge** | `components/status-badge.tsx` | Status pill with colored dot + label; variants: `default` \| `subtle`; sizes: `xs` \| `sm` \| `md` |
| **Icon** | `components/icon.tsx` | Material Symbols wrapper with FILL/weight/size control |
| **RouteCard** | `components/route-card.tsx` | Landing page card linking to prototype routes |

### shadcn/ui Components (in `components/ui/`)
60+ components including: `button`, `card`, `input`, `tabs`, `sheet`, `dialog`, `dropdown-menu`, `avatar`, `badge`, `separator`, `scroll-area`, `tooltip`, `sonner` (toast), etc.

---

## 📄 Page Inventory

### Customer Routes (Mobile-First, `CustomerShell`)

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing — route cards to admin & customer flows |
| `/login` | `app/login/page.tsx` | Customer login (placeholder) |
| `/katalog` | `app/katalog/page.tsx` | **Core** — product grid, sticky header, bottom sheet order form (qty stepper, date picker, notes), floating subtotal bar |
| `/pesanan` | `app/pesanan/page.tsx` | Order history — tabs **Aktif** (not selesai/ditolak) / **Riwayat** (selesai/ditolak), empty states |
| `/pesanan/[id]` | `app/pesanan/[id]/page.tsx` | Track order — status header, vertical timeline (done/active/pending), courier call button, item list, payment reminder |
| `/pembayaran` | `app/pembayaran/page.tsx` | DP payment — bill summary, bank selection (BCA/Mandiri), copy account, upload bukti transfer, submit → redirect to order detail |
| `/profil` | `app/profil/page.tsx` | Profile — avatar + name/phone/address, menu (Alamat, Bantuan, Tentang), red logout button |

### Admin Routes (Desktop-First, `AdminShell`)

| Route | File | Description |
|-------|------|-------------|
| `/admin/login` | `app/admin/login/page.tsx` | Admin login form (email/password, forgot password link) |
| `/admin` | `app/admin/page.tsx` | Dashboard — 3 stat cards (Pendapatan, Pesanan Aktif, Menunggu DP) + jadwal kirim hari ini (3 items) + CTA to orders |
| `/admin/orders` | `app/admin/orders/page.tsx` | Order management — search, sort (newest/oldest), 3 tabs (Masuk/Baru, Diproses, Selesai) with badges, grid cards |
| `/admin/orders/[id]` | `app/admin/orders/[id]/page.tsx` | Order detail — sticky top bar, customer info, items, notes, payment status + DP proof upload, fixed bottom CTA (Tolak / Konfirmasi DP & Proses) |
| `/admin/profile` | `app/admin/profile/page.tsx` | Admin profile — avatar + name/role/email/phone, stat tiles (join date, total orders, rating), menu (Pengaturan Toko, Laporan, Bantuan, Tentang), logout |

---

## 🗄 Data Model (`lib/mock-data.ts`)

### Core Types

```ts
type OrderStatus =
  | "menunggu_konfirmasi"
  | "dp_diterima"
  | "diproses"
  | "dikirim"
  | "selesai"
  | "ditolak";

type PaymentStatus = "belum_bayar" | "dp" | "lunas";

type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
};

type Product = {
  id: string;
  name: string;
  unit: string;           // "Toples", "Loyang", "Roll", "Box (50 pcs)"
  price: number;          // IDR
  image: string;          // Unsplash URL
  category: string;       // "Kue Kering", "Kue Basah", "Bolu", "Pastry", "Tradisional"
  description?: string;
};

type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
  variant?: string;
};

type Order = {
  id: string;             // "PO-102"
  customer: Customer;
  items: OrderItem[];
  total: number;
  dpAmount: number;       // 50% of total
  paid: number;           // amount already paid
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shipDate: string;       // ISO date
  createdAt: string;      // ISO date
  notes?: string;
  proofImage?: string;    // DP bukti URL
  courier?: { name: string; phone: string };
};
```

### Static Data Arrays
| Array | Count | Description |
|-------|-------|-------------|
| `PRODUCTS` | 6 | Nastar, Kastengel, Brownies, Bolu Gulung, Croissant Box, Kue Tampah |
| `CUSTOMERS` | 4 | Budi, Siti, Toko Makmur, Katering Bu Yayuk |
| `ORDERS` | 4 | PO-102..PO-105 with varied statuses |
| `TIMELINE_BY_STATUS` | 6 | Step definitions per status (label, date, description, done/active) |
| `DASHBOARD_STATS` | 3 | Revenue, active orders, pending DP |
| `DELIVERIES_TODAY` | 3 | Today's delivery schedule |
| `BANK_ACCOUNTS` | 2 | BCA (active), Mandiri |

### Utility Functions (`lib/utils.ts`)
```ts
cn(...inputs)                 // clsx + tailwind-merge
formatIDR(value)              // 50000 → "Rp 50.000"
formatDateID(value)           // "2024-10-24" → "24 Okt 2024"
```

---

## 🔄 Key User Flows

### Customer: Pre-Order + DP
```
1. /katalog              → Browse 6 products (grid 2-col)
2. Tap "Pesan"           → Bottom sheet opens (selected product)
3. Set qty, date, notes  → Stepper + date input + textarea
4. "Lanjut ke Pembayaran"→ Router push to /pembayaran
5. /pembayaran           → See bill (subtotal = DP 50%)
6. Select bank (BCA/Mandiri) → Copy account number
7. Upload bukti transfer → File input + preview
8. "Kirim Bukti"         → Redirect to /pesanan/PO-XXX
9. /pesanan/[id]         → Track timeline, see courier, payment reminder
```

### Admin: Order Management
```
1. /admin/login          → Email + password → /admin
2. /admin                → Dashboard stats + today's deliveries
3. /admin/orders         → Search + sort + 3 tabs (Masuk/Proses/Selesai)
4. Tap order card        → /admin/orders/PO-XXX
5. Review items, notes   → Check DP proof image
6. Bottom CTA            → "Tolak" OR "Konfirmasi DP & Proses"
```

---

## 🎭 Interactive States & Polish

| Element | States Implemented |
|---------|-------------------|
| **Buttons** | `hover`, `active:scale-[0.98]`, `focus-visible:ring`, `disabled:opacity-30` |
| **Bottom Sheet (Sheet)** | Drag handle, `max-h-[85vh]`, sticky footer CTA, form submit via hidden button |
| **Tabs** | Custom styled `TabsTrigger` with badge counts, `data-[state=active]` styling |
| **Bank Selection** | Radio-card pattern: `border-2 border-primary` + check icon when selected |
| **File Upload** | Dashed border → `hover:border-primary`, selected → `border-primary bg-orange-50/10` |
| **Timeline** | Vertical line, animated pulse on active step, check icons for done, courier card on active shipping |
| **Order Cards** | Hover `border-primary/30`, status badge tone per status |
| **Search** | Real-time filter on ID + customer name |
| **Sort Toggle** | Rotate icon `rotate-180` on asc/desc |

---

## 📱 Responsive Strategy

| Breakpoint | Customer | Admin |
|------------|----------|-------|
| **< 640px** | Phone frame (full width), bottom nav always visible | Mobile bottom nav, stacked cards |
| **640–1024px** | Centered `max-w-md` phone frame | 2-col grids, top nav visible |
| **> 1024px** | Same phone frame (centered) | Full desktop layout, `max-w-4xl`/`max-w-5xl`, side-by-side stats |

**CSS Variables** handle light/dark readiness (though only light theme used).

---

## 🚀 Getting Started

```bash
# Install deps (pnpm recommended)
pnpm install

# Dev server (Turbopack)
pnpm dev

# Production build
pnpm build && pnpm start

# Lint
pnpm lint
```

**Environment:** Node 20+, pnpm 9+ (or npm/yarn)

**Port:** `http://localhost:3000`

---

## 🧪 Testing the Prototype

### Quick Smoke Test Checklist

| Flow | Steps | Expected |
|------|-------|----------|
| **Customer order** | `/katalog` → tap "Pesan" → fill qty/date/notes → "Lanjut" → `/pembayaran` → pick bank → upload → submit | Lands on `/pesanan/PO-XXX` with timeline |
| **Track order** | `/pesanan` → tap "Lacak" on active order | Timeline shows correct status, courier card appears on `dikirim` |
| **Admin dashboard** | `/admin/login` → submit → `/admin` | 3 stat cards + 3 deliveries |
| **Admin orders** | `/admin/orders` → search "PO-102" → switch tabs | Filtered results per paymentStatus |
| **Admin detail** | Tap order card → `/admin/orders/PO-102` | Items, notes, DP proof, bottom CTA |
| **Profile pages** | `/profil` (customer) & `/admin/profile` (admin) | Info card + menu list + logout button |

---

## 📝 Design Decisions & Rationale

| Decision | Reason |
|----------|--------|
| **Single mock-data file** | Single source of truth — timeline, orders, customers stay in sync across pages |
| **No global state (Redux/Zustand)** | Prototype scope is small; React hooks + router state sufficient |
| **Material Symbols variable font** | One font file, 4 axes (FILL, wght, GRAD, opsz) — iconic flexibility, tiny bundle |
| **Bottom sheet for order form** | Mobile-native pattern; keeps context (product image visible behind sheet) |
| **Payment status tabs (admin)** | Business logic: `paymentStatus` drives tab (belum_bayar → Masuk, dp → Proses, lunas → Selesai) |
| **Sticky top bar on detail pages** | Back button + title always accessible; doesn't fight shell nav |
| **Fixed bottom CTA on admin detail** | Thumb-zone action for confirm/reject — critical path |
| **Floating subtotal bar (customer)** | Persistent "add to cart" affordance without leaving product grid |

---

## 📦 Extending the Prototype

### Add a New Product
1. Add entry to `PRODUCTS` in `lib/mock-data.ts`
2. Image: use Unsplash or local `public/`
3. Category must match existing or add new

### Add Order Status
1. Add to `OrderStatus` union type
2. Add entry to `STATUS_LABEL`, `STATUS_TONE`
3. Add timeline in `TIMELINE_BY_STATUS`
4. Add icon mapping in `app/pesanan/[id]/page.tsx` (`STATUS_ICONS`)
5. Update admin tab logic if payment flow changes

### Add Admin Page
1. Create `app/admin/new-page/page.tsx`
2. Wrap in `<AdminShell>`
3. Add nav item to `ADMIN_NAV` in `components/admin-shell.tsx`

### Enable Dark Mode
1. Add `dark:` variants in `globals.css`
2. Toggle via `next-themes` (already in deps)
3. Update `StatusBadge` tones for dark backgrounds

---

## 📚 References & Credits

- **Next.js App Router** — [docs](https://nextjs.org/docs/app)
- **shadcn/ui** — [ui.shadcn.com](https://ui.shadcn.com) (component patterns copied/adapted)
- **Material Symbols** — [fonts.google.com/icons](https://fonts.google.com/icons?icon.set=Material+Symbols)
- **Tailwind CSS v4** — [tailwindcss.com](https://tailwindcss.com)
- **Unsplash** — Product/customer/avatar images (demo only)

---

## 📄 License

Academic project — UAS *Desain Pengalaman Pengguna* SMT 6. Not for production use. Images from Unsplash (demo).

---

*Generated for Delight Bakery Prototype — July 2025*
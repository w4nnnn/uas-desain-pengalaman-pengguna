/**
 * Shared mock data — single source of truth across all 9 pages so
 * navigation flows between pages stay consistent (e.g. order list → detail).
 */

export type OrderStatus =
  | "menunggu_konfirmasi"
  | "dp_diterima"
  | "diproses"
  | "dikirim"
  | "selesai"
  | "ditolak";

export type PaymentStatus = "belum_bayar" | "dp" | "lunas";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
};

export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
  variant?: string;
};

export type TimelineEvent = {
  status: OrderStatus;
  label: string;
  date?: string;
  time?: string;
  description?: string;
  done: boolean;
  active?: boolean;
};

export type Order = {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  dpAmount: number; // 50% of total
  paid: number; // amount already paid
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shipDate: string; // ISO
  createdAt: string; // ISO
  notes?: string;
  proofImage?: string;
  courier?: { name: string; phone: string };
};

/* ---------- Products ---------- */
export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "Nastar Klasik",
    unit: "Toples",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80&auto=format&fit=crop",
    category: "Kue Kering",
    description:
      "Nastar lembut dengan selai nanas homemade, cocok untuk hampers.",
  },
  {
    id: "p-002",
    name: "Kastengel Keju",
    unit: "Toples",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop",
    category: "Kue Kering",
    description: "Kastengel dengan keju edam premium, renyah dan gurih.",
  },
  {
    id: "p-003",
    name: "Brownies Panggang",
    unit: "Loyang",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&auto=format&fit=crop",
    category: "Kue Basah",
    description: "Brownies cokelat belgi panggang, fudgy dan moist.",
  },
  {
    id: "p-004",
    name: "Bolu Gulung Moka",
    unit: "Roll",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80&auto=format&fit=crop",
    category: "Bolu",
    description: "Bolu gulung lembut dengan krim moka dan taburan meses.",
  },
  {
    id: "p-005",
    name: "Croissant Butter Box",
    unit: "Box (50 pcs)",
    price: 2500000,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop",
    category: "Pastry",
    description: "Croissant butter premium, cocok untuk hotel & katering.",
  },
  {
    id: "p-006",
    name: "Kue Tampah Tradisional",
    unit: "Tampah",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80&auto=format&fit=crop",
    category: "Tradisional",
    description: "Kue tampah tradisional untuk acara syukuran & kenduri.",
  },
];

export const CUSTOMERS: Customer[] = [
  {
    id: "c-001",
    name: "Budi Santoso",
    phone: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 12, Bandung",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    id: "c-002",
    name: "Siti Aminah",
    phone: "+62 813-9876-5432",
    address: "Jl. Asia Afrika No. 88, Jakarta",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&crop=faces",
  },
  {
    id: "c-003",
    name: "Toko Makmur",
    phone: "+62 821-1111-2222",
    address: "Jl. Sudirman Kav. 5, Surabaya",
    avatar:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&q=80&auto=format&fit=crop",
  },
  {
    id: "c-004",
    name: "Katering Bu Yayuk",
    phone: "+62 822-3333-4444",
    address: "Jl. Diponegoro No. 21, Yogyakarta",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=faces",
  },
];

const today = new Date();
const isoOffset = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const ORDERS: Order[] = [
  {
    id: "PO-102",
    customer: CUSTOMERS[0],
    items: [
      {
        productId: "p-005",
        name: "Croissant Butter Box",
        qty: 50,
        unitPrice: 50000,
        variant: "Classic, Reguler",
      },
      {
        productId: "p-006",
        name: "Custom Wedding Cake Tier 3",
        qty: 1,
        unitPrice: 2700000,
        variant: "Custom: Happy Wedding Budi & Siti",
      },
    ],
    total: 5400000,
    dpAmount: 2700000,
    paid: 2700000,
    status: "diproses",
    paymentStatus: "dp",
    shipDate: isoOffset(2),
    createdAt: isoOffset(-4),
    notes:
      "Tolong di kuenya ditulis 'Happy Wedding Budi & Siti'. Pastikan krimnya aman dan tidak penyok saat pengiriman ya kak.",
    proofImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop",
    courier: { name: "Bpk. Budi", phone: "+62 812-1111-2222" },
  },
  {
    id: "PO-103",
    customer: CUSTOMERS[1],
    items: [
      {
        productId: "p-001",
        name: "Nastar Klasik",
        qty: 10,
        unitPrice: 85000,
      },
      {
        productId: "p-002",
        name: "Kastengel Keju",
        qty: 8,
        unitPrice: 95000,
      },
    ],
    total: 1610000,
    dpAmount: 805000,
    paid: 805000,
    status: "dp_diterima",
    paymentStatus: "dp",
    shipDate: isoOffset(3),
    createdAt: isoOffset(-3),
    notes: "Untuk hampers pernikahan, tolong bungkus金色 ya.",
  },
  {
    id: "PO-104",
    customer: CUSTOMERS[2],
    items: [
      {
        productId: "p-003",
        name: "Brownies Panggang",
        qty: 20,
        unitPrice: 65000,
      },
    ],
    total: 1300000,
    dpAmount: 650000,
    paid: 0,
    status: "menunggu_konfirmasi",
    paymentStatus: "belum_bayar",
    shipDate: isoOffset(4),
    createdAt: isoOffset(-1),
  },
  {
    id: "PO-105",
    customer: CUSTOMERS[3],
    items: [
      {
        productId: "p-006",
        name: "Kue Tampah Tradisional",
        qty: 30,
        unitPrice: 180000,
      },
    ],
    total: 5400000,
    dpAmount: 2700000,
    paid: 2700000,
    status: "selesai",
    paymentStatus: "lunas",
    shipDate: isoOffset(-1),
    createdAt: isoOffset(-7),
  },
];

/* Timeline — used by Lacak Pesanan */
export const TIMELINE_BY_STATUS: Record<OrderStatus, TimelineEvent[]> = {
  menunggu_konfirmasi: [
    {
      status: "menunggu_konfirmasi",
      label: "Menunggu Konfirmasi",
      date: "20 Okt 2024, 09:00 WIB",
      description: "Pesanan Anda telah diterima dan sedang menunggu konfirmasi penjual.",
      done: true,
    },
    {
      status: "dp_diterima",
      label: "DP Diterima",
      description: "Pembayaran DP telah dikonfirmasi.",
      done: false,
    },
    {
      status: "diproses",
      label: "Diproses",
      description: "Pesanan mulai diproduksi.",
      done: false,
    },
    {
      status: "dikirim",
      label: "Dikirim",
      description: "Pesanan sedang dalam perjalanan.",
      done: false,
    },
    {
      status: "selesai",
      label: "Selesai",
      description: "Pesanan tiba dan pelunasan selesai.",
      done: false,
    },
  ],
  dp_diterima: [
    {
      status: "menunggu_konfirmasi",
      label: "Menunggu Konfirmasi",
      date: "20 Okt 2024, 09:00 WIB",
      description: "Pesanan Anda telah diterima dan sedang menunggu konfirmasi penjual.",
      done: true,
    },
    {
      status: "dp_diterima",
      label: "DP Diterima",
      date: "21 Okt 2024, 14:30 WIB",
      description: "Pembayaran DP telah dikonfirmasi. Pesanan mulai diproduksi.",
      done: true,
    },
    {
      status: "diproses",
      label: "Diproses",
      description: "Pesanan sedang diproduksi.",
      done: false,
    },
    {
      status: "dikirim",
      label: "Dikirim",
      description: "Pesanan sedang dalam perjalanan.",
      done: false,
    },
    {
      status: "selesai",
      label: "Selesai",
      description: "Pesanan tiba dan pelunasan selesai.",
      done: false,
    },
  ],
  diproses: [
    {
      status: "menunggu_konfirmasi",
      label: "Menunggu Konfirmasi",
      date: "20 Okt 2024, 09:00 WIB",
      description: "Pesanan Anda telah diterima dan sedang menunggu konfirmasi penjual.",
      done: true,
    },
    {
      status: "dp_diterima",
      label: "DP Diterima",
      date: "21 Okt 2024, 14:30 WIB",
      description: "Pembayaran DP telah dikonfirmasi. Pesanan mulai diproduksi.",
      done: true,
    },
    {
      status: "diproses",
      label: "Diproses",
      date: "22 Okt 2024, 10:15 WIB",
      description: "Pesanan sedang dalam tahap produksi.",
      done: true,
      active: true,
    },
    {
      status: "dikirim",
      label: "Dikirim",
      description: "Pesanan sedang dalam perjalanan.",
      done: false,
    },
    {
      status: "selesai",
      label: "Selesai",
      description: "Pesanan tiba dan pelunasan selesai.",
      done: false,
    },
  ],
  dikirim: [
    {
      status: "menunggu_konfirmasi",
      label: "Menunggu Konfirmasi",
      date: "20 Okt 2024, 09:00 WIB",
      description: "Pesanan Anda telah diterima dan sedang menunggu konfirmasi penjual.",
      done: true,
    },
    {
      status: "dp_diterima",
      label: "DP Diterima",
      date: "21 Okt 2024, 14:30 WIB",
      description: "Pembayaran DP telah dikonfirmasi. Pesanan mulai diproduksi.",
      done: true,
    },
    {
      status: "diproses",
      label: "Diproses",
      date: "22 Okt 2024, 10:15 WIB",
      description: "Pesanan sedang dalam tahap produksi.",
      done: true,
    },
    {
      status: "dikirim",
      label: "Dikirim",
      date: "23 Okt 2024, 08:00 WIB",
      description: "Pesanan sedang dalam perjalanan ke alamat tujuan.",
      done: true,
      active: true,
    },
    {
      status: "selesai",
      label: "Selesai",
      description: "Pesanan tiba dan pelunasan selesai.",
      done: false,
    },
  ],
  selesai: [
    {
      status: "menunggu_konfirmasi",
      label: "Menunggu Konfirmasi",
      date: "18 Okt 2024, 09:00 WIB",
      description: "Pesanan Anda telah diterima.",
      done: true,
    },
    {
      status: "dp_diterima",
      label: "DP Diterima",
      date: "18 Okt 2024, 14:30 WIB",
      description: "Pembayaran DP telah dikonfirmasi.",
      done: true,
    },
    {
      status: "diproses",
      label: "Diproses",
      date: "19 Okt 2024, 08:00 WIB",
      description: "Pesanan sedang diproduksi.",
      done: true,
    },
    {
      status: "dikirim",
      label: "Dikirim",
      date: "20 Okt 2024, 09:00 WIB",
      description: "Pesanan dalam perjalanan.",
      done: true,
    },
    {
      status: "selesai",
      label: "Selesai",
      date: "20 Okt 2024, 14:00 WIB",
      description: "Pesanan tiba dan diterima oleh pelanggan.",
      done: true,
    },
  ],
  ditolak: [
    {
      status: "menunggu_konfirmasi",
      label: "Pesanan Ditolak",
      date: "20 Okt 2024, 09:00 WIB",
      description:
        "Maaf, pesanan Anda tidak dapat kami proses. Silakan hubungi admin untuk info lebih lanjut.",
      done: true,
    },
  ],
};

/* Indonesian status labels & colors — used by StatusBadge */
export const STATUS_LABEL: Record<OrderStatus, string> = {
  menunggu_konfirmasi: "Menunggu Konfirmasi",
  dp_diterima: "DP Diterima",
  diproses: "Diproses",
  dikirim: "Dikirim",
  selesai: "Selesai",
  ditolak: "Ditolak",
};

export const STATUS_TONE: Record<
  OrderStatus,
  {
    fg: string;
    bg: string;
    ring: string;
    dot?: string;
  }
> = {
  menunggu_konfirmasi: {
    fg: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
  },
  dp_diterima: {
    fg: "text-blue-700",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
  },
  diproses: {
    fg: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
  },
  dikirim: {
    fg: "text-indigo-700",
    bg: "bg-indigo-50",
    ring: "ring-indigo-200",
    dot: "bg-indigo-500",
  },
  selesai: {
    fg: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
  },
  ditolak: {
    fg: "text-red-700",
    bg: "bg-red-50",
    ring: "ring-red-200",
    dot: "bg-red-500",
  },
};

/* Dashboard summary cards (bento) */
export const DASHBOARD_STATS = [
  {
    label: "Pendapatan Hari Ini",
    value: "Rp 4.500.000",
    delta: "+12% dari minggu lalu",
    deltaPositive: true,
    icon: "payments",
  },
  {
    label: "Pesanan Aktif",
    value: "24",
    sub: "Dalam proses produksi",
    icon: "local_shipping",
  },
  {
    label: "Menunggu DP",
    value: "8",
    sub: "Butuh konfirmasi",
    icon: "pending_actions",
  },
];

/* Today's delivery schedule (Dashboard) */
export const DELIVERIES_TODAY = [
  {
    code: "ORD-0921",
    customer: "Katering Bu Yayuk",
    qty: "50 Box",
    time: "10:00 WIB",
    statusLabel: "Siap Kirim",
    statusTone: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  {
    code: "ORD-0925",
    customer: "Toko Kopi Maju",
    qty: "100 Pcs",
    time: "14:00 WIB",
    statusLabel: "Proses Packing",
    statusTone: "text-amber-600",
    dot: "bg-amber-500",
  },
  {
    code: "ORD-0928",
    customer: "Roti Panggang 88",
    qty: "30 Loyang",
    time: "16:30 WIB",
    statusLabel: "Menunggu Kurir",
    statusTone: "text-gray-500",
    dot: "bg-gray-400",
  },
];

/* Banks (Pembayaran DP) */
export const BANK_ACCOUNTS = [
  {
    id: "bca",
    label: "BCA",
    sub: "Bank Central Asia",
    number: "1234567890",
    active: true,
  },
  {
    id: "mandiri",
    label: "MANDIRI",
    sub: "Bank Mandiri",
    number: "9876543210",
    active: false,
  },
];

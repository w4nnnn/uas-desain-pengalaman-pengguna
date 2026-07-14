const PRODUCTS = [
    {
        id: 'p1',
        name: 'Nastar Klasik',
        price: 85000,
        unit: 'Toples',
        image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&q=80&w=300&h=300',
        category: 'Kue Kering'
    },
    {
        id: 'p2',
        name: 'Kastengel Keju',
        price: 95000,
        unit: 'Toples',
        image: 'https://images.unsplash.com/photo-1579247605929-106512304dfa?auto=format&fit=crop&q=80&w=300&h=300',
        category: 'Kue Kering'
    },
    {
        id: 'p3',
        name: 'Brownies Panggang',
        price: 65000,
        unit: 'Loyang',
        image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=300&h=300',
        category: 'Kue Basah'
    },
    {
        id: 'p4',
        name: 'Bolu Gulung Moka',
        price: 75000,
        unit: 'Box',
        image: 'https://images.unsplash.com/photo-1543508282-5c1f427f023f?auto=format&fit=crop&q=80&w=300&h=300',
        category: 'Kue Basah'
    }
];

const ORDER_STATUSES = {
    WAITING_PAYMENT: 'Menunggu Pembayaran',
    VERIFYING: 'Menunggu Konfirmasi',
    PROCESSING: 'Diproses',
    DELIVERING: 'Dikirim',
    COMPLETED: 'Selesai'
};

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Simple unique ID generator
function generateId() {
    return 'PO-' + Math.floor(Math.random() * 10000);
}

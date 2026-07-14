// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('bakery_cart')) || null; // Single item PO for now based on UI
let orders = JSON.parse(localStorage.getItem('bakery_orders')) || [];

function saveCart() {
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem('bakery_orders', JSON.stringify(orders));
}

// --- CATALOG PAGE LOGIC ---
function renderCatalog() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    PRODUCTS.forEach(product => {
        grid.innerHTML += `
        <article class="bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 product-card-shadow group flex flex-col">
            <div class="aspect-square w-full relative overflow-hidden bg-surface-container">
                <img alt="${product.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${product.image}">
                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-sm text-primary">favorite</span>
                </div>
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="font-semibold text-on-surface mb-1 line-clamp-1">${product.name}</h3>
                <p class="text-primary font-bold text-sm mb-4">
                    ${formatRupiah(product.price)} <span class="text-on-surface-variant font-normal text-xs">/ ${product.unit}</span>
                </p>
                <button class="mt-auto w-full bg-primary text-white py-2.5 px-4 rounded-xl font-semibold text-sm hover:bg-[#E66E00] active:scale-95 transition-all" onclick="openProductSheet('${product.id}')">Pesan</button>
            </div>
        </article>`;
    });
}

// Sheet Logic
let currentProduct = null;
let currentQty = 1;

function openProductSheet(productId) {
    currentProduct = PRODUCTS.find(p => p.id === productId);
    currentQty = 1;
    
    // Update Sheet UI
    document.getElementById('sheetProductName').innerText = currentProduct.name;
    document.getElementById('sheetProductPrice').innerText = `${formatRupiah(currentProduct.price)} / ${currentProduct.unit}`;
    document.getElementById('sheetProductImg').src = currentProduct.image;
    
    updateSheetUI();
    
    // Show Sheet
    document.getElementById('backdrop').classList.remove('hidden');
    document.getElementById('backdrop').classList.add('opacity-100');
    document.getElementById('bottomSheet').classList.remove('translate-y-full');
}

window.closeSheet = function() {
    document.getElementById('bottomSheet').classList.add('translate-y-full');
    document.getElementById('backdrop').classList.remove('opacity-100');
    setTimeout(() => {
        document.getElementById('backdrop').classList.add('hidden');
    }, 300);
}

window.updateQty = function(change) {
    if (currentQty + change >= 1) {
        currentQty += change;
        updateSheetUI();
    }
}

function updateSheetUI() {
    document.getElementById('sheetQty').innerText = currentQty;
    document.getElementById('sheetTotal').innerText = formatRupiah(currentProduct.price * currentQty);
}

window.addToCartAndCheckout = function() {
    cart = {
        product: currentProduct,
        qty: currentQty,
        totalPrice: currentProduct.price * currentQty,
        date: new Date().toISOString()
    };
    saveCart();
    window.location.href = 'pembayaran.html';
}

// --- PAYMENT PAGE LOGIC ---
function renderPayment() {
    const paymentContainer = document.getElementById('payment-details');
    if (!paymentContainer) return;
    
    if (!cart) {
        paymentContainer.innerHTML = '<p class="p-4 text-center">Belum ada pesanan.</p>';
        return;
    }
    
    // Update UI based on cart
    document.getElementById('pay-product-name').innerText = cart.product.name;
    document.getElementById('pay-qty').innerText = `${cart.qty} ${cart.product.unit}`;
    document.getElementById('pay-price').innerText = formatRupiah(cart.product.price);
    
    // Set Total values
    const dpp = cart.totalPrice;
    const tax = dpp * 0.11; // 11% tax
    const finalTotal = dpp + tax;
    
    document.getElementById('pay-subtotal').innerText = formatRupiah(dpp);
    document.getElementById('pay-tax').innerText = formatRupiah(tax);
    document.getElementById('pay-total-bottom').innerText = formatRupiah(finalTotal);
    document.getElementById('pay-total-header').innerText = formatRupiah(finalTotal);
}

window.submitPayment = function() {
    if (!cart) return;
    
    const dpp = cart.totalPrice;
    const finalTotal = dpp + (dpp * 0.11);
    
    const newOrder = {
        id: generateId(),
        product: cart.product,
        qty: cart.qty,
        total: finalTotal,
        date: new Date().toISOString(),
        status: ORDER_STATUSES.VERIFYING
    };
    
    orders.unshift(newOrder); // Add to beginning
    saveOrders();
    
    // Clear cart
    cart = null;
    saveCart();
    
    window.location.href = 'riwayat-pesanan.html';
}

// --- HISTORY PAGE LOGIC ---
function renderHistory() {
    const historyList = document.getElementById('order-history-list');
    if (!historyList) return;
    
    if (orders.length === 0) {
        historyList.innerHTML = `
        <div class="bg-surface rounded-2xl p-6 text-center border border-outline-variant/50 shadow-sm mt-4">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-2">receipt_long</span>
            <p class="text-on-surface-variant text-sm">Belum ada riwayat pesanan.</p>
        </div>`;
        return;
    }
    
    historyList.innerHTML = orders.map(order => {
        const dateObj = new Date(order.date);
        const dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        
        return `
        <div class="bg-surface rounded-2xl p-5 border border-outline-variant/50 shadow-sm mb-4">
            <div class="flex justify-between items-center mb-4 border-b border-outline-variant/30 pb-3">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-xl">shopping_bag</span>
                    <span class="font-bold text-sm text-on-surface">${order.id}</span>
                </div>
                <span class="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">${order.status}</span>
            </div>
            
            <div class="flex gap-4 mb-4">
                <div class="w-16 h-16 bg-surface-container rounded-xl overflow-hidden shrink-0">
                    <img alt="${order.product.name}" class="w-full h-full object-cover" src="${order.product.image}">
                </div>
                <div>
                    <h3 class="font-semibold text-sm text-on-surface mb-1">${order.product.name}</h3>
                    <p class="text-xs text-on-surface-variant mb-1">${order.qty} ${order.product.unit}</p>
                    <p class="text-sm font-bold text-on-surface">${formatRupiah(order.total)}</p>
                </div>
            </div>
            
            <div class="flex gap-3 mt-2">
                <button onclick="trackOrder('${order.id}')" class="flex-1 bg-primary text-white font-bold text-xs py-2.5 rounded-xl hover:brightness-110 transition-all shadow-md shadow-primary/20">LACAK PESANAN</button>
                <button onclick="reorder('${order.product.id}')" class="flex-1 bg-primary-container text-primary font-bold text-xs py-2.5 rounded-xl hover:brightness-95 transition-all">PESAN LAGI</button>
            </div>
        </div>`;
    }).join('');
}

window.trackOrder = function(orderId) {
    localStorage.setItem('bakery_tracking_id', orderId);
    window.location.href = 'lacak-pesanan.html';
}

window.reorder = function(productId) {
    window.location.href = 'katalog.html?reorder=' + productId;
}

// --- TRACKING PAGE LOGIC ---
function renderTracking() {
    const trackingTitle = document.getElementById('tracking-id');
    if (!trackingTitle) return;
    
    const trackingId = localStorage.getItem('bakery_tracking_id');
    if (!trackingId) {
        trackingTitle.innerText = 'Order tidak ditemukan';
        return;
    }
    
    const order = orders.find(o => o.id === trackingId);
    if (order) {
        trackingTitle.innerText = `Detail Pesanan ${order.id}`;
        // Usually here we'd also update the stepper UI based on order.status
    }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on and render accordingly
    if (window.location.pathname.includes('katalog.html')) {
        renderCatalog();
        // Check if we came from 'Pesan Lagi'
        const urlParams = new URLSearchParams(window.location.search);
        const reorderId = urlParams.get('reorder');
        if (reorderId) {
            setTimeout(() => openProductSheet(reorderId), 500);
        }
    } else if (window.location.pathname.includes('pembayaran.html')) {
        renderPayment();
    } else if (window.location.pathname.includes('riwayat-pesanan.html')) {
        renderHistory();
    } else if (window.location.pathname.includes('lacak-pesanan.html')) {
        renderTracking();
    }
});

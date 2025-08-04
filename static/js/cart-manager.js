// Cart management functionality
class CartManager {
    constructor() {
        this.cart = this.loadCartFromStorage();
        this.currentLanguage = 'en';
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('lunelilas-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('lunelilas-cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Failed to save cart to storage:', error);
        }
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        
        if (cartCountElement) {
            if (count > 0) {
                cartCountElement.textContent = count;
                cartCountElement.classList.remove('hidden');
            } else {
                cartCountElement.classList.add('hidden');
            }
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCartToStorage();
        this.updateCartCount();
        this.showNotification('Added to cart!');
    }

    updateCartQuantity(productId, quantity) {
        if (quantity === 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCartToStorage();
            this.updateCartCount();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartCount();
    }

    get cartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get cartItemsCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    getCartSummary() {
        const cartTotal = this.cartTotal;
        const shipping = cartTotal > 50 ? 0 : 8.99;
        const tax = cartTotal * 0.13;
        const total = cartTotal + shipping + tax;

        return {
            subtotal: cartTotal,
            shipping: shipping,
            tax: tax,
            total: total,
            freeShipping: cartTotal >= 50
        };
    }

    renderCartSidebar() {
        const container = document.getElementById('cart-sidebar-container') || this.createCartSidebarContainer();
        const t = window.translations[this.currentLanguage];
        
        container.innerHTML = `
            <div class="cart-overlay" onclick="cartManager.closeCartSidebar()">
                <div class="cart-sidebar" onclick="event.stopPropagation()">
                    <div class="cart-sidebar-header">
                        <h2 class="font-heading text-2xl text-gray-800">${t.cart.title} (${this.cartItemsCount})</h2>
                        <button onclick="cartManager.closeCartSidebar()" class="p-2 hover:bg-lilac-100 rounded-full transition-colors duration-200">
                            <i data-lucide="x" class="h-6 w-6 text-gray-600"></i>
                        </button>
                    </div>
                    <div class="cart-sidebar-content">
                        ${this.cart.length === 0 ? this.renderEmptyCart(t) : this.renderCartItems(t)}
                    </div>
                    ${this.cart.length > 0 ? this.renderCartFooter(t) : ''}
                </div>
            </div>
        `;
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    createCartSidebarContainer() {
        const container = document.createElement('div');
        container.id = 'cart-sidebar-container';
        document.body.appendChild(container);
        return container;
    }

    renderEmptyCart(t) {
        return `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <i data-lucide="shopping-bag" class="h-8 w-8"></i>
                </div>
                <h3 class="font-heading text-xl text-gray-800 mb-2">${t.cart.empty}</h3>
                <p class="font-body text-gray-600 mb-6">${t.cart.emptyDescription}</p>
                <button onclick="window.location.href='product_list.html'" class="btn btn-primary btn-lg button-glow">${t.cart.continueShopping}</button>
            </div>
        `;
    }

    renderCartItems(t) {
        return `
            <div class="space-y-4">
                ${this.cart.map((item, index) => `
                    <div class="cart-item fade-in" style="animation-delay: ${index * 0.1}s">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <button onclick="cartManager.updateCartQuantity(${item.id}, ${Math.max(0, item.quantity - 1)})" class="quantity-btn">
                                <i data-lucide="minus" class="h-3 w-3"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button onclick="cartManager.updateCartQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">
                                <i data-lucide="plus" class="h-3 w-3"></i>
                            </button>
                        </div>
                        <button onclick="cartManager.removeFromCart(${item.id})" class="remove-btn">
                            <i data-lucide="trash-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCartFooter(t) {
        const summary = this.getCartSummary();
        
        return `
            <div class="cart-sidebar-footer">
                <div class="cart-summary">
                    <div class="cart-summary-row">
                        <span class="cart-summary-label">${t.cart.subtotal}</span>
                        <span class="cart-summary-value">$${summary.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-row">
                        <span class="cart-summary-label">${t.cart.shipping}</span>
                        <span class="cart-summary-value">${summary.shipping === 0 ? 'Free' : '$' + summary.shipping.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-row">
                        <span class="cart-summary-label">${t.cart.tax}</span>
                        <span class="cart-summary-value">$${summary.tax.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-row cart-total">
                        <span class="cart-summary-label">${t.cart.total}</span>
                        <span class="cart-summary-value">$${summary.total.toFixed(2)}</span>
                    </div>
                    ${summary.freeShipping ? `
                        <div class="bg-sage-50 border border-sage-200 rounded-lg p-3 mb-4 mt-4">
                            <p class="font-body text-sage-700 text-center text-sm font-medium">${t.cart.freeShipping}</p>
                        </div>
                    ` : ''}
                    <div class="space-y-3 mt-6">
                        <button onclick="window.location.href='checkout.html'" class="btn btn-primary w-full button-glow">
                            <i data-lucide="lock" class="h-4 w-4 mr-2"></i>
                            ${t.cart.proceedToCheckout}
                        </button>
                        <button onclick="window.location.href='cart.html'" class="btn btn-secondary w-full button-press">View Full Cart</button>
                        <button onclick="window.location.href='product_list.html'" class="btn btn-ghost w-full">${t.cart.continueShopping}</button>
                    </div>
                </div>
            </div>
        `;
    }

    toggleCartSidebar() {
        this.renderCartSidebar();
        const overlay = document.querySelector('.cart-overlay');
        const sidebar = document.querySelector('.cart-sidebar');
        
        if (overlay && sidebar) {
            overlay.classList.toggle('show');
            sidebar.classList.toggle('show');
        }
    }

    openCartSidebar() {
        this.renderCartSidebar();
        const overlay = document.querySelector('.cart-overlay');
        const sidebar = document.querySelector('.cart-sidebar');
        
        if (overlay && sidebar) {
            overlay.classList.add('show');
            sidebar.classList.add('show');
        }
    }

    closeCartSidebar() {
        const overlay = document.querySelector('.cart-overlay');
        const sidebar = document.querySelector('.cart-sidebar');
        
        if (overlay && sidebar) {
            overlay.classList.remove('show');
            sidebar.classList.remove('show');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 bg-sage-500 text-white px-6 py-3 rounded-lg shadow-lg notification-enter';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

window.CartManager = CartManager;
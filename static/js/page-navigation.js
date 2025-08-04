// Simple page navigation utility
class PageNavigation {
    static navigateTo(page) {
        const routes = {
            'home': '../index.html',
            'products': '../product_list.html',
            'product-detail': '../product_detail.html',
            'cart': '../cart.html',
            'checkout': '../checkout.html',
            'login': './login.html',
            'register': './register.html',
            'logout': './logout.html',
            'success': '../success.html',
            'cancelled': '../cancelled.html'
        };
        
        const url = routes[page];
        if (url) {
            window.location.href = url;
        } else {
            console.warn(`Unknown route: ${page}`);
        }
    }
    
    static getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        const pageMap = {
            'index': 'home',
            'product_list': 'products',
            'product_detail': 'product-detail',
            'cart': 'cart',
            'checkout': 'checkout',
            'login': 'login',
            'register': 'register',
            'logout': 'logout',
            'success': 'success',
            'cancelled': 'cancelled'
        };
        
        return pageMap[filename] || 'home';
    }
    
    static isUserLoggedIn() {
        try {
            const user = localStorage.getItem('lune-lilas-user');
            return user ? JSON.parse(user).loggedIn : false;
        } catch {
            return false;
        }
    }
    
    static requireAuth(redirectTo = 'login') {
        if (!this.isUserLoggedIn()) {
            const currentPage = this.getCurrentPage();
            this.navigateTo(redirectTo + '?return=' + encodeURIComponent(currentPage));
            return false;
        }
        return true;
    }
    
    static getUserInfo() {
        try {
            const user = localStorage.getItem('lune-lilas-user');
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    }
}

window.PageNavigation = PageNavigation;
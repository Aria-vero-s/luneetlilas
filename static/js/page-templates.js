// Shared page templates and components
class PageTemplates {
    static createHeader(currentPage = '') {
        return `
            <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16 lg:h-20">
                        <!-- Logo -->
                        <a href="index.html" class="font-heading text-2xl lg:text-3xl text-lilac-800 hover:text-lilac-600 transition-colors duration-300 elegant-accent">
                            Lune & Lilas
                        </a>
                        
                        <!-- Desktop Navigation -->
                        <nav class="hidden lg:flex items-center space-x-8">
                            <a href="product_list.html" class="font-body text-lg ${currentPage === 'shop' ? 'text-lilac-600' : 'text-gray-700'} hover:text-lilac-600 transition-all duration-300 relative group">
                                Shop
                                <span class="absolute -bottom-1 left-0 ${currentPage === 'shop' ? 'w-full' : 'w-0'} h-0.5 bg-lilac-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a href="index.html#about" class="font-body text-lg ${currentPage === 'about' ? 'text-lilac-600' : 'text-gray-700'} hover:text-lilac-600 transition-all duration-300 relative group">
                                About
                                <span class="absolute -bottom-1 left-0 ${currentPage === 'about' ? 'w-full' : 'w-0'} h-0.5 bg-lilac-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a href="salon.html" class="font-body text-lg ${currentPage === 'salon' ? 'text-lilac-600' : 'text-gray-700'} hover:text-lilac-600 transition-all duration-300 relative group">
                                Salon
                                <span class="absolute -bottom-1 left-0 ${currentPage === 'salon' ? 'w-full' : 'w-0'} h-0.5 bg-lilac-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <a href="index.html#reviews" class="font-body text-lg ${currentPage === 'reviews' ? 'text-lilac-600' : 'text-gray-700'} hover:text-lilac-600 transition-all duration-300 relative group">
                                Reviews
                                <span class="absolute -bottom-1 left-0 ${currentPage === 'reviews' ? 'w-full' : 'w-0'} h-0.5 bg-lilac-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </nav>
                        
                        <!-- Right side controls -->
                        <div class="flex items-center space-x-4">
                            <!-- Language toggle -->
                            <button id="lang-toggle" class="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-lilac-50 hover:bg-lilac-100 transition-colors duration-300 button-press">
                                <i data-lucide="globe" class="h-4 w-4 text-lilac-600"></i>
                                <span class="font-body text-sm font-medium text-lilac-700 uppercase">EN</span>
                            </button>
                            
                            <!-- Cart button -->
                            <button id="cart-toggle" class="relative p-2 rounded-full ${currentPage === 'cart' ? 'bg-lilac-100 text-lilac-600' : 'hover:bg-lilac-50'} transition-colors duration-300 button-press">
                                <i data-lucide="shopping-cart" class="h-6 w-6 ${currentPage === 'cart' ? 'text-lilac-600' : 'text-gray-700 hover:text-lilac-600'} transition-colors duration-300"></i>
                                <span id="cart-count" class="hidden absolute -top-1 -right-1 bg-lilac-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
                            </button>
                            
                            <!-- Mobile menu button -->
                            <button id="mobile-menu-toggle" class="lg:hidden p-2 rounded-md hover:bg-lilac-50 transition-colors duration-300">
                                <i data-lucide="menu" class="h-6 w-6 text-gray-700"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Mobile menu -->
                    <div id="mobile-menu" class="hidden lg:hidden border-t border-gray-200">
                        <div class="py-4 space-y-4">
                            <a href="product_list.html" class="block w-full text-left px-4 py-2 font-body text-lg ${currentPage === 'shop' ? 'text-lilac-600' : 'text-gray-700'} hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300">Shop</a>
                            <a href="index.html#about" class="block w-full text-left px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300">About</a>
                            <a href="salon.html" class="block w-full text-left px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300">Salon</a>
                            <a href="index.html#reviews" class="block w-full text-left px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300">Reviews</a>
                            <button id="mobile-cart" class="flex items-center space-x-2 px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300 w-full">
                                <i data-lucide="shopping-cart" class="h-5 w-5"></i>
                                <span>Cart</span>
                            </button>
                            ${currentPage !== 'login' && currentPage !== 'register' ? `
                                <a href="registration/login.html" class="block w-full text-left px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300">Login</a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    static createFooter() {
        return `
            <footer class="relative bg-gradient-to-br from-lilac-700 to-lilac-800 text-white overflow-hidden">
                <!-- Background decoration -->
                <div class="absolute inset-0">
                    <div class="absolute top-10 left-10 w-32 h-32 bg-lilac-600/20 rounded-full blur-3xl"></div>
                    <div class="absolute bottom-20 right-20 w-40 h-40 bg-blush-500/10 rounded-full blur-3xl"></div>
                    <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-sage-400/10 rounded-full blur-2xl"></div>
                </div>
                
                <div class="relative z-10 pt-20 pb-12">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <!-- Newsletter Section -->
                        <div class="mb-16 text-center border-b border-lilac-600/30 pb-16 fade-in">
                            <div class="max-w-2xl mx-auto">
                                <div class="inline-flex items-center justify-center w-16 h-16 bg-lilac-600/30 rounded-full mb-8 float-animation">
                                    <i data-lucide="mail" class="h-8 w-8 text-lilac-200"></i>
                                </div>
                                
                                <h3 class="font-heading text-4xl mb-4 text-white">Join Our Beauty Community</h3>
                                <p class="text-lilac-200 text-lg mb-8 font-body">Get 15% off your first order when you subscribe.</p>
                                
                                <form id="newsletter-form" class="max-w-md mx-auto">
                                    <div class="flex flex-col sm:flex-row gap-4">
                                        <input type="email" placeholder="Enter your email address" required class="flex-1 h-12 px-6 bg-white/10 border border-lilac-300/20 text-white placeholder:text-lilac-200 focus:border-lilac-400 focus:ring-lilac-400/20 rounded-full backdrop-blur-sm font-body form-input">
                                        <button type="submit" class="h-12 bg-blush-500 hover:bg-blush-600 text-white px-8 rounded-full soft-shadow gentle-hover font-body btn button-glow">Subscribe</button>
                                    </div>
                                </form>
                                
                                <p class="text-sm text-lilac-300 mt-6 font-body">We respect your privacy. Unsubscribe at any time.</p>
                            </div>
                        </div>
                        
                        <!-- Main Footer Content -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <!-- Brand section -->
                            <div class="lg:col-span-1 fade-in stagger-1">
                                <a href="index.html" class="font-heading text-3xl mb-6 text-white hover:text-lilac-200 transition-colors duration-300 elegant-accent block">Lune & Lilas</a>
                                <p class="text-lilac-200 mb-8 leading-relaxed font-body text-lg">Crafting beautiful, healthy hair with clean ingredients and salon expertise since 2020.</p>
                                
                                <div class="flex space-x-4">
                                    <button class="text-lilac-200 hover:text-white hover:bg-lilac-600/30 p-3 rounded-full gentle-hover transition-all duration-300">
                                        <i data-lucide="instagram" class="h-5 w-5"></i>
                                    </button>
                                    <button class="text-lilac-200 hover:text-white hover:bg-lilac-600/30 p-3 rounded-full gentle-hover transition-all duration-300">
                                        <i data-lucide="facebook" class="h-5 w-5"></i>
                                    </button>
                                    <button class="text-lilac-200 hover:text-white hover:bg-lilac-600/30 p-3 rounded-full gentle-hover transition-all duration-300">
                                        <i data-lucide="twitter" class="h-5 w-5"></i>
                                    </button>
                                    <button class="text-lilac-200 hover:text-white hover:bg-lilac-600/30 p-3 rounded-full gentle-hover transition-all duration-300">
                                        <i data-lucide="youtube" class="h-5 w-5"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Quick Links section -->
                            <div class="fade-in stagger-2">
                                <h4 class="font-body text-xl font-semibold mb-6 text-white">Quick Links</h4>
                                <ul class="space-y-4">
                                    <li><a href="product_list.html" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Shop All<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="product_list.html" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Hair Masks<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="product_list.html" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Serums & Oils<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="salon.html" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Salon Services<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="index.html#about" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">About Us<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                </ul>
                            </div>
                            
                            <!-- Customer Care section -->
                            <div class="fade-in stagger-3">
                                <h4 class="font-body text-xl font-semibold mb-6 text-white">Customer Care</h4>
                                <ul class="space-y-4">
                                    <li><a href="#" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Contact Us<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="#" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Shipping Info<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="#" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">Returns<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                    <li><a href="#" class="text-lilac-200 hover:text-white transition-colors font-body text-lg gentle-hover group"><span class="relative">FAQ<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span></a></li>
                                </ul>
                            </div>
                            
                            <!-- Contact Info section -->
                            <div class="fade-in stagger-4">
                                <h4 class="font-body text-xl font-semibold mb-6 text-white">Contact</h4>
                                <div class="space-y-6">
                                    <div class="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                                        <i data-lucide="map-pin" class="h-5 w-5 text-lilac-300 mt-1 flex-shrink-0"></i>
                                        <p class="text-lilac-200 font-body text-lg leading-relaxed">Montreal, QC, Canada</p>
                                    </div>
                                    
                                    <div class="flex items-center space-x-4 hover:translate-x-1 transition-transform duration-200">
                                        <i data-lucide="phone" class="h-5 w-5 text-lilac-300 flex-shrink-0"></i>
                                        <span class="text-lilac-200 font-body text-lg">1-800-LUNE-LILAS</span>
                                    </div>
                                    
                                    <div class="flex items-center space-x-4 hover:translate-x-1 transition-transform duration-200">
                                        <i data-lucide="mail" class="h-5 w-5 text-lilac-300 flex-shrink-0"></i>
                                        <span class="text-lilac-200 font-body text-lg">hello@lunelilas.com</span>
                                    </div>
                                </div>
                                
                                <!-- Salon hours -->
                                <div class="mt-8 p-6 bg-lilac-600/20 rounded-2xl border border-lilac-500/20 soft-shadow hover:scale-105 transition-transform duration-300">
                                    <p class="text-lg text-lilac-200 mb-3 font-body font-medium">Salon Hours</p>
                                    <div class="space-y-1">
                                        <p class="text-lilac-200 font-body">Tue-Sat: 9AM - 7PM</p>
                                        <p class="text-lilac-200 font-body">Sun: 10AM - 5PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Bottom bar -->
                        <div class="mt-16 pt-8 border-t border-lilac-600/30 flex flex-col sm:flex-row justify-between items-center fade-in stagger-5">
                            <p class="text-lilac-300 font-body">© 2025 Lune & Lilas. All rights reserved.</p>
                            
                            <div class="flex space-x-8 mt-4 sm:mt-0">
                                <a href="#" class="text-lilac-300 hover:text-white transition-colors font-body gentle-hover group">
                                    <span class="relative">Privacy Policy<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span>
                                </a>
                                <a href="#" class="text-lilac-300 hover:text-white transition-colors font-body gentle-hover group">
                                    <span class="relative">Terms of Service<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span>
                                </a>
                                <a href="#" class="text-lilac-300 hover:text-white transition-colors font-body gentle-hover group">
                                    <span class="relative">Accessibility<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    static createBreadcrumb(links) {
        return `
            <div class="flex items-center space-x-2 mb-8 fade-in">
                ${links.map((link, index) => `
                    ${index > 0 ? '<span class="text-gray-400">/</span>' : ''}
                    ${link.href ? `
                        <a href="${link.href}" class="flex items-center space-x-2 text-gray-600 hover:text-lilac-600 transition-colors duration-300">
                            ${link.icon ? `<i data-lucide="${link.icon}" class="h-4 w-4"></i>` : ''}
                            <span class="font-body">${link.text}</span>
                        </a>
                    ` : `
                        <span class="font-body text-gray-800">${link.text}</span>
                    `}
                `).join('')}
            </div>
        `;
    }
}

window.PageTemplates = PageTemplates;
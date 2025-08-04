// State management for the application
class AppState {
  constructor() {
    this.state = {
      language: 'en',
      currentPage: 'home',
      selectedProduct: null,
      cart: this.loadCartFromStorage(),
      shippingData: {},
      paymentData: {},
      checkoutStep: 'shipping',
      isMenuOpen: false,
      isCartSidebarOpen: false,
      isLoading: false,
      notifications: []
    };
    
    this.listeners = [];
    this.products = this.initializeProducts();
    this.reviews = this.initializeReviews();
  }
  
  // Load cart from localStorage
  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem('lunelilas-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  }
  
  // Save cart to localStorage
  saveCartToStorage() {
    try {
      localStorage.setItem('lunelilas-cart', JSON.stringify(this.state.cart));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }
  
  // Initialize products data
  initializeProducts() {
    return [
      {
        id: 1,
        name: 'Nourishing Hair Mask',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
        badge: 'Best Seller',
        category: 'hairMasks',
        rating: 4.8,
        reviews: 127,
        description: 'Transform dry, damaged hair with our deeply nourishing mask enriched with organic argan oil and shea butter.',
        ingredients: 'Organic Argan Oil, Shea Butter, Coconut Oil, Vitamin E, Aloe Vera',
        howToUse: 'Apply to damp hair from mid-length to ends. Leave for 10-15 minutes, then rinse thoroughly.',
        benefits: ['Deep hydration', 'Repairs damage', 'Adds shine', 'Strengthens hair']
      },
      {
        id: 2,
        name: 'Silk Hair Serum',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        badge: 'New',
        category: 'serumsOils',
        rating: 4.9,
        reviews: 89,
        description: 'Lightweight serum that adds instant shine and smoothness while protecting against heat damage.',
        ingredients: 'Silk Proteins, Moroccan Oil, Jojoba Oil, Vitamin B5',
        howToUse: 'Apply 2-3 drops to damp or dry hair, focusing on ends. Style as usual.',
        benefits: ['Heat protection', 'Instant shine', 'Frizz control', 'Lightweight formula']
      },
      {
        id: 3,
        name: 'Curl Defining Cream',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
        badge: 'Trending',
        category: 'styling',
        rating: 4.7,
        reviews: 156,
        description: 'Define and enhance your natural curls with this moisturizing cream that eliminates frizz.',
        ingredients: 'Shea Butter, Coconut Oil, Flaxseed Extract, Glycerin',
        howToUse: 'Apply to damp hair, scrunch gently, and air dry or diffuse.',
        benefits: ['Defines curls', 'Reduces frizz', 'Long-lasting hold', 'Natural ingredients']
      },
      {
        id: 4,
        name: 'Lavender Hair Oil',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
        badge: 'Professional',
        category: 'serumsOils',
        rating: 4.6,
        reviews: 203,
        description: 'Calming lavender oil blend that nourishes hair and scalp while promoting relaxation.',
        ingredients: 'Lavender Essential Oil, Sweet Almond Oil, Rosemary Extract',
        howToUse: 'Massage into scalp and hair 30 minutes before washing, or use as overnight treatment.',
        benefits: ['Scalp health', 'Aromatherapy', 'Deep nourishment', 'Promotes growth']
      },
      {
        id: 5,
        name: 'Volumizing Shampoo',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
        category: 'shampooConditioner',
        rating: 4.5,
        reviews: 178,
        description: 'Gentle cleansing shampoo that adds volume and body to fine, limp hair.',
        ingredients: 'Rice Protein, Biotin, Panthenol, Natural Surfactants',
        howToUse: 'Massage into wet hair, lather, and rinse. Follow with conditioner.',
        benefits: ['Adds volume', 'Gentle cleansing', 'Strengthens hair', 'Sulfate-free']
      },
      {
        id: 6,
        name: 'Repair Treatment',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
        category: 'treatments',
        rating: 4.8,
        reviews: 92,
        description: 'Intensive treatment for severely damaged hair, restoring strength and elasticity.',
        ingredients: 'Keratin, Collagen, Peptides, Ceramides',
        howToUse: 'Apply to clean, towel-dried hair. Leave for 20 minutes, then rinse.',
        benefits: ['Rebuilds structure', 'Intense repair', 'Restores elasticity', 'Salon-grade formula']
      }
    ];
  }
  
  // Initialize reviews data
  initializeReviews() {
    return [
      {
        id: 1,
        username: "sarah_chen",
        displayName: "Sarah Chen",
        location: "Toronto",
        timeAgo: "2h",
        rating: 5,
        review: {
          en: "Just left @lunelilas and I'm OBSESSED 😍 The hair mask completely transformed my damaged hair. After just one use, my hair feels like silk! #hairgoals #selfcare",
          fr: "Je viens de quitter @lunelilas et je suis OBSÉDÉE 😍 Le masque capillaire a complètement transformé mes cheveux abîmés. Après une seule utilisation, mes cheveux sont comme de la soie ! #cheveux #soins"
        },
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b048?w=100&h=100&fit=crop&crop=face",
        product: {
          en: "Nourishing Hair Mask",
          fr: "Masque Capillaire Nourrissant"
        },
        likes: 247,
        comments: 18,
        verified: true
      },
      {
        id: 2,
        username: "emma.rdz",
        displayName: "Emma Rodriguez",
        location: "Vancouver",
        timeAgo: "4h",
        rating: 5,
        review: {
          en: "3 months with the silk serum and my hair has never been healthier ✨ The natural ingredients really make a difference. Thank you @lunelilas! #cleanhaircare #natural",
          fr: "3 mois avec le sérum soyeux et mes cheveux n'ont jamais été aussi sains ✨ Les ingrédients naturels font vraiment la différence. Merci @lunelilas ! #soinsnatural #bio"
        },
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        product: {
          en: "Silk Hair Serum",
          fr: "Sérum Capillaire Soyeux"
        },
        likes: 156,
        comments: 24,
        verified: false
      },
      {
        id: 3,
        username: "marie_dubois_",
        displayName: "Marie Dubois",
        location: "Montreal",
        timeAgo: "6h",
        rating: 5,
        review: {
          en: "Finally found my holy grail for curly hair! 🥰 The curl defining cream is a total game-changer - defined curls with zero frizz. Curly girls, you NEED this! #curlyhair #frizzfree",
          fr: "J'ai enfin trouvé mon Saint Graal pour cheveux bouclés ! 🥰 La crème définition boucles change tout - boucles définies sans frisottis. Les filles aux cheveux bouclés, vous en avez BESOIN ! #cheveusboucles"
        },
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        product: {
          en: "Curl Defining Cream",
          fr: "Crème Définition Boucles"
        },
        likes: 389,
        comments: 52,
        verified: true
      },
      {
        id: 4,
        username: "jessica.kim",
        displayName: "Jessica Kim",
        location: "Calgary",
        timeAgo: "1d",
        rating: 5,
        review: {
          en: "The lavender hair oil smells like heaven and makes my hair so manageable 💜 Love that it's clean ingredients only. Self-care Sunday done right! #lavender #selflove",
          fr: "L'huile capillaire à la lavande sent le paradis et rend mes cheveux si faciles à coiffer 💜 J'adore qu'elle soit faite uniquement d'ingrédients propres. Dimanche bien-être réussi ! #lavande #soins"
        },
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        product: {
          en: "Lavender Hair Oil",
          fr: "Huile Capillaire à la Lavande"
        },
        likes: 203,
        comments: 31,
        verified: false
      }
    ];
  }
  
  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  // Notify all listeners of state changes
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
  
  // Update state
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }
  
  // Get current translations
  get t() {
    return translations[this.state.language];
  }
  
  // Actions
  setLanguage(language) {
    this.setState({ language });
  }
  
  setCurrentPage(page, productId = null) {
    this.setState({ 
      currentPage: page, 
      selectedProduct: productId,
      isMenuOpen: false 
    });
  }
  
  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  
  // Cart sidebar actions
  toggleCartSidebar() {
    this.setState({ isCartSidebarOpen: !this.state.isCartSidebarOpen });
  }
  
  openCartSidebar() {
    this.setState({ isCartSidebarOpen: true });
  }
  
  closeCartSidebar() {
    this.setState({ isCartSidebarOpen: false });
  }
  
  // Cart actions
  addToCart(product) {
    const existingItem = this.state.cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = this.state.cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...this.state.cart, { ...product, quantity: 1 }];
    }
    
    this.setState({ cart: newCart });
    this.saveCartToStorage();
    this.openCartSidebar(); // Open sidebar when adding to cart
    this.showNotification(this.t.cart ? this.t.cart.itemAdded || 'Added to cart!' : 'Added to cart!', 'success');
  }
  
  removeFromCart(productId) {
    const newCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: newCart });
    this.saveCartToStorage();
  }
  
  updateCartQuantity(productId, quantity) {
    if (quantity === 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const newCart = this.state.cart.map(item => 
      item.id === productId 
        ? { ...item, quantity }
        : item
    );
    
    this.setState({ cart: newCart });
    this.saveCartToStorage();
  }
  
  clearCart() {
    this.setState({ cart: [] });
    this.saveCartToStorage();
  }
  
  // Cart calculations
  get cartItemsCount() {
    return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  get cartTotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  // Checkout actions
  setShippingData(data) {
    this.setState({ shippingData: { ...this.state.shippingData, ...data } });
  }
  
  setPaymentData(data) {
    this.setState({ paymentData: { ...this.state.paymentData, ...data } });
  }
  
  setCheckoutStep(step) {
    this.setState({ checkoutStep: step });
  }
  
  // Notifications
  showNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type
    };
    
    this.setState({ 
      notifications: [...this.state.notifications, notification] 
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 3000);
  }
  
  removeNotification(id) {
    this.setState({ 
      notifications: this.state.notifications.filter(n => n.id !== id) 
    });
  }
  
  // Product helpers
  getProduct(id) {
    return this.products.find(p => p.id === parseInt(id));
  }
  
  getProductsByCategory(category) {
    if (category === 'all') return this.products;
    return this.products.filter(p => p.category === category);
  }
  
  getFeaturedProducts() {
    return this.products.slice(0, 4);
  }
  
  // Navigation helper
  navigate(page, productId = null) {
    this.setCurrentPage(page, productId);
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL (basic routing)
    const url = page === 'home' ? '/' : `/#${page}${productId ? `/${productId}` : ''}`;
    window.history.pushState({ page, productId }, '', url);
  }
  
  // Scroll to section
  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Create global app state instance
window.appState = new AppState();

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
  if (event.state) {
    window.appState.setCurrentPage(event.state.page, event.state.productId);
  }
});

// Initialize routing based on current URL
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const [page, productId] = hash.split('/');
    window.appState.setCurrentPage(page, productId ? parseInt(productId) : null);
  }
});
// Main application entry point
class LuneLilasApp {
  constructor() {
    this.appElement = document.getElementById('app-content');
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.currentComponents = [];
    
    // Subscribe to state changes
    window.appState.subscribe((state) => {
      this.render();
    });
    
    // Initialize the app
    this.init();
  }
  
  async init() {
    // Hide loading overlay after a short delay
    setTimeout(() => {
      this.loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        this.loadingOverlay.style.display = 'none';
      }, 300);
    }, 800);
    
    // Initial render
    this.render();
    
    // Setup scroll animations
    this.setupScrollAnimations();
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }
  
  render() {
    // Clear current content
    this.appElement.innerHTML = '';
    
    // Get current state
    const { state } = window.appState;
    
    // Render based on current page
    switch (state.currentPage) {
      case 'products':
        this.renderProductList();
        break;
      case 'product-detail':
        this.renderProductDetail();
        break;
      case 'checkout':
        this.renderCheckout();
        break;
      case 'salon':
        this.renderSalonPage();
        break;
      case 'home':
      default:
        this.renderHomePage();
        break;
    }
    
    // Always render cart sidebar
    this.renderCartSidebar();
    
    // Reinitialize icons after render
    window.utils.initializeLucideIcons();
  }
  
  renderHomePage() {
    // Create main layout
    const header = window.createHeader();
    const main = window.utils.createElement('main');
    const footer = window.createFooter();
    
    // Add homepage sections
    main.appendChild(window.homepageComponents.createHeroSection());
    main.appendChild(window.homepageComponents.createFeaturedProducts());
    main.appendChild(window.homepageComponents.createAboutSection());
    main.appendChild(window.homepageComponents.createWhySection());
    main.appendChild(window.homepageComponents.createReviewsSection());
    
    // Append to app
    this.appElement.appendChild(header);
    this.appElement.appendChild(main);
    this.appElement.appendChild(footer);
  }
  
  renderProductList() {
    const page = this.createBasicPage('All Products', () => {
      return this.createProductListContent();
    });
    this.appElement.appendChild(page);
  }
  
  renderProductDetail() {
    const { state } = window.appState;
    const product = window.appData.PRODUCTS_DATA.find(p => p.id === state.selectedProduct);
    
    if (!product) {
      window.appState.navigate('products');
      return;
    }
    
    const page = this.createBasicPage(product.name, () => {
      return this.createProductDetailContent(product);
    });
    this.appElement.appendChild(page);
  }
  
  renderCheckout() {
    const page = this.createBasicPage('Checkout', () => {
      return this.createCheckoutContent();
    });
    this.appElement.appendChild(page);
  }
  
  renderSalonPage() {
    const page = this.createBasicPage('Salon', () => {
      return this.createSalonContent();
    });
    this.appElement.appendChild(page);
  }
  
  renderCartSidebar() {
    // Remove existing cart sidebar if present
    const existingCartSidebar = document.querySelector('.cart-overlay');
    if (existingCartSidebar) {
      existingCartSidebar.remove();
    }
    
    // Add cart sidebar to body (not app content)
    const cartSidebar = window.createCartSidebar();
    document.body.appendChild(cartSidebar);
  }
  
  createBasicPage(title, contentCreator) {
    const pageContainer = window.utils.createElement('div', 'min-h-screen bg-background');
    
    // Add header
    pageContainer.appendChild(window.createHeader());
    
    // Add main content
    const main = window.utils.createElement('main', 'flex-1');
    main.appendChild(contentCreator());
    pageContainer.appendChild(main);
    
    // Add footer
    pageContainer.appendChild(window.createFooter());
    
    return pageContainer;
  }
  
  createProductListContent() {
    const { t } = window.appState;
    const { createElement } = window.utils;
    
    const section = createElement('section', 'py-12 min-h-screen');
    const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    
    // Breadcrumb
    const breadcrumb = createElement('div', 'flex items-center space-x-2 mb-8 fade-in');
    const backButton = createElement('button', 'flex items-center space-x-2 text-gray-600 hover:text-lilac-600 transition-colors duration-300');
    backButton.innerHTML = '<i data-lucide="arrow-left" class="h-4 w-4"></i><span class="font-body">Home</span>';
    backButton.onclick = () => window.appState.navigate('home');
    breadcrumb.appendChild(backButton);
    
    // Header
    const header = createElement('div', 'text-center mb-12 fade-in');
    const title = createElement('h1', 'font-heading text-5xl mb-4 text-gray-800 elegant-accent', [t.productList.title]);
    const subtitle = createElement('p', 'font-body text-xl text-gray-600 max-w-2xl mx-auto', [t.productList.subtitle]);
    header.appendChild(title);
    header.appendChild(subtitle);
    
    // Products grid
    const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8');
    
    window.appData.PRODUCTS_DATA.forEach((product, index) => {
      const productCard = window.homepageComponents.createProductCard(product, index);
      grid.appendChild(productCard);
    });
    
    container.appendChild(breadcrumb);
    container.appendChild(header);
    container.appendChild(grid);
    section.appendChild(container);
    
    return section;
  }
  
  createProductDetailContent(product) {
    const { t } = window.appState;
    const { createElement, createIcon, formatPrice } = window.utils;
    
    const section = createElement('section', 'py-12 min-h-screen');
    const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    
    // Breadcrumb
    const breadcrumb = createElement('div', 'flex items-center space-x-2 mb-8 fade-in');
    const backButton = createElement('button', 'flex items-center space-x-2 text-gray-600 hover:text-lilac-600 transition-colors duration-300');
    backButton.innerHTML = '<i data-lucide="arrow-left" class="h-4 w-4"></i><span class="font-body">Back to Products</span>';
    backButton.onclick = () => window.appState.navigate('products');
    breadcrumb.appendChild(backButton);
    
    // Product details
    const productGrid = createElement('div', 'grid lg:grid-cols-2 gap-16');
    
    // Image side
    const imageContainer = createElement('div', 'fade-in');
    const image = createElement('img', 'w-full h-96 lg:h-[500px] object-cover rounded-3xl soft-shadow-lg');
    image.src = product.image;
    image.alt = product.name;
    imageContainer.appendChild(image);
    
    // Info side
    const infoContainer = createElement('div', 'fade-in stagger-1');
    
    const productName = createElement('h1', 'font-heading text-4xl mb-4 text-gray-800', [product.name]);
    const productPrice = createElement('p', 'font-body text-2xl font-semibold text-lilac-600 mb-6', [formatPrice(product.price)]);
    
    // Rating
    const ratingContainer = createElement('div', 'flex items-center space-x-2 mb-6');
    const stars = createElement('div', 'flex space-x-1');
    
    for (let i = 0; i < 5; i++) {
      const star = createIcon('star', 'w-5 h-5');
      star.className += i < Math.floor(product.rating) ? ' text-yellow-400 fill-current' : ' text-gray-300';
      stars.appendChild(star);
    }
    
    const ratingText = createElement('span', 'font-body text-gray-600', [`${product.rating} (${product.reviews} reviews)`]);
    ratingContainer.appendChild(stars);
    ratingContainer.appendChild(ratingText);
    
    // Description
    const description = createElement('p', 'font-body text-lg text-gray-600 leading-relaxed mb-8', [product.description]);
    
    // Benefits
    if (product.benefits) {
      const benefitsContainer = createElement('div', 'mb-8');
      const benefitsTitle = createElement('h3', 'font-body text-lg font-semibold text-gray-800 mb-4', ['Key Benefits:']);
      const benefitsList = createElement('ul', 'space-y-2');
      
      product.benefits.forEach(benefit => {
        const listItem = createElement('li', 'flex items-center space-x-2');
        const checkIcon = createIcon('check', 'w-4 h-4 text-lilac-600');
        const benefitText = createElement('span', 'font-body text-gray-600', [benefit]);
        listItem.appendChild(checkIcon);
        listItem.appendChild(benefitText);
        benefitsList.appendChild(listItem);
      });
      
      benefitsContainer.appendChild(benefitsTitle);
      benefitsContainer.appendChild(benefitsList);
      infoContainer.appendChild(benefitsContainer);
    }
    
    // Add to cart button
    const addToCartButton = createElement('button', 'btn btn-primary btn-lg w-full button-glow gentle-hover', ['Add to Cart']);
    addToCartButton.onclick = () => window.appState.addToCart(product);
    
    infoContainer.appendChild(productName);
    infoContainer.appendChild(productPrice);
    infoContainer.appendChild(ratingContainer);
    infoContainer.appendChild(description);
    infoContainer.appendChild(addToCartButton);
    
    productGrid.appendChild(imageContainer);
    productGrid.appendChild(infoContainer);
    
    container.appendChild(breadcrumb);
    container.appendChild(productGrid);
    section.appendChild(container);
    
    return section;
  }
  
  createCheckoutContent() {
    const { t } = window.appState;
    const { createElement } = window.utils;
    
    const section = createElement('section', 'py-12 min-h-screen');
    const container = createElement('div', 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8');
    
    // Simple checkout placeholder
    const content = createElement('div', 'text-center py-20 fade-in');
    const title = createElement('h1', 'font-heading text-4xl mb-4 text-gray-800', ['Checkout Coming Soon']);
    const subtitle = createElement('p', 'font-body text-xl text-gray-600 mb-8', ['Our secure checkout process is currently in development.']);
    
    const backButton = createElement('button', 'btn btn-secondary btn-lg gentle-hover mr-4', ['Back to Shopping']);
    backButton.onclick = () => window.appState.navigate('products');
    
    const viewCartButton = createElement('button', 'btn btn-primary btn-lg gentle-hover', ['View Cart']);
    viewCartButton.onclick = () => window.appState.openCartSidebar();
    
    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(backButton);
    content.appendChild(viewCartButton);
    
    container.appendChild(content);
    section.appendChild(container);
    
    return section;
  }
  
  createSalonContent() {
    const { t } = window.appState;
    const { createElement } = window.utils;
    
    const section = createElement('section', 'py-12 min-h-screen');
    const container = createElement('div', 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8');
    
    // Simple salon placeholder
    const content = createElement('div', 'text-center py-20 fade-in');
    const title = createElement('h1', 'font-heading text-4xl mb-4 text-gray-800', ['Salon Booking Coming Soon']);
    const subtitle = createElement('p', 'font-body text-xl text-gray-600 mb-8', ['Online salon booking will be available soon.']);
    
    const backButton = createElement('button', 'btn btn-secondary btn-lg gentle-hover', ['Back to Home']);
    backButton.onclick = () => window.appState.navigate('home');
    
    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(backButton);
    
    container.appendChild(content);
    section.appendChild(container);
    
    return section;
  }
  
  setupScrollAnimations() {
    // Use Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes cart sidebar
      if (e.key === 'Escape' && window.appState.state.isCartSidebarOpen) {
        window.appState.closeCartSidebar();
      }
      
      // Ctrl/Cmd + K opens cart sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.appState.toggleCartSidebar();
      }
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new LuneLilasApp();
});
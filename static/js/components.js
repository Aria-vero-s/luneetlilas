// Component creation utilities
function createElement(tag, className = '', children = []) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
  
  return element;
}

function createIcon(iconName, className = 'w-6 h-6') {
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', iconName);
  icon.className = className;
  return icon;
}

// Header Component
function createHeader() {
  const { t, state } = window.appState;
  
  const header = createElement('header', 'sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200');
  
  const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  const nav = createElement('div', 'flex items-center justify-between h-16 lg:h-20');
  
  // Logo
  const logo = createElement('button', 'font-heading text-2xl lg:text-3xl text-lilac-800 hover:text-lilac-600 transition-colors duration-300 elegant-accent', [t.brand]);
  logo.onclick = () => window.appState.navigate('home');
  
  // Desktop Navigation
  const desktopNav = createElement('nav', 'hidden lg:flex items-center space-x-8');
  
  const navItems = [
    { key: 'shop', page: 'products' },
    { key: 'about', page: 'home', scrollTo: 'about' },
    { key: 'salon', page: 'salon' },
    { key: 'reviews', page: 'home', scrollTo: 'reviews' }
  ];
  
  navItems.forEach((item, index) => {
    const navButton = createElement('button', 
      'font-body text-lg text-gray-700 hover:text-lilac-600 transition-all duration-300 relative group', 
      [t.nav[item.key]]
    );
    
    navButton.innerHTML += '<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-lilac-500 transition-all duration-300 group-hover:w-full"></span>';
    
    navButton.onclick = () => {
      if (item.scrollTo && state.currentPage === 'home') {
        window.appState.scrollToSection(item.scrollTo);
      } else if (item.scrollTo) {
        window.appState.navigate('home');
        setTimeout(() => window.appState.scrollToSection(item.scrollTo), 100);
      } else {
        window.appState.navigate(item.page);
      }
    };
    
    // Add stagger animation
    navButton.style.animationDelay = `${index * 0.1}s`;
    navButton.classList.add('fade-in');
    
    desktopNav.appendChild(navButton);
  });
  
  // Right side controls
  const rightControls = createElement('div', 'flex items-center space-x-4');
  
  // Language toggle
  const langToggle = createElement('button', 'hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-lilac-50 hover:bg-lilac-100 transition-colors duration-300 button-press');
  langToggle.innerHTML = `
    <i data-lucide="globe" class="h-4 w-4 text-lilac-600"></i>
    <span class="font-body text-sm font-medium text-lilac-700 uppercase">${state.language}</span>
  `;
  langToggle.onclick = () => {
    const newLang = state.language === 'en' ? 'fr' : 'en';
    window.appState.setLanguage(newLang);
  };
  
  // Cart button
  const cartButton = createElement('button', 'relative p-2 rounded-full hover:bg-lilac-50 transition-colors duration-300 button-press');
  cartButton.innerHTML = '<i data-lucide="shopping-cart" class="h-6 w-6 text-gray-700 hover:text-lilac-600 transition-colors duration-300"></i>';
  
  // Cart count badge
  if (window.appState.cartItemsCount > 0) {
    const badge = createElement('span', 
      'absolute -top-1 -right-1 bg-lilac-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center',
      [window.appState.cartItemsCount.toString()]
    );
    badge.classList.add('fade-in');
    cartButton.appendChild(badge);
  }
  
  cartButton.onclick = () => window.appState.navigate('cart');
  
  // Mobile menu button
  const mobileMenuButton = createElement('button', 'lg:hidden p-2 rounded-md hover:bg-lilac-50 transition-colors duration-300');
  const menuIcon = state.isMenuOpen ? 'x' : 'menu';
  mobileMenuButton.innerHTML = `<i data-lucide="${menuIcon}" class="h-6 w-6 text-gray-700"></i>`;
  mobileMenuButton.onclick = () => window.appState.toggleMenu();
  
  rightControls.appendChild(langToggle);
  rightControls.appendChild(cartButton);
  rightControls.appendChild(mobileMenuButton);
  
  nav.appendChild(logo);
  nav.appendChild(desktopNav);
  nav.appendChild(rightControls);
  container.appendChild(nav);
  
  // Mobile menu
  if (state.isMenuOpen) {
    const mobileMenu = createElement('div', 'lg:hidden border-t border-gray-200');
    const mobileMenuContent = createElement('div', 'py-4 space-y-4');
    
    navItems.forEach((item, index) => {
      const mobileNavButton = createElement('button', 
        'block w-full text-left px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300',
        [t.nav[item.key]]
      );
      
      mobileNavButton.onclick = () => {
        if (item.scrollTo && state.currentPage === 'home') {
          window.appState.scrollToSection(item.scrollTo);
        } else if (item.scrollTo) {
          window.appState.navigate('home');
          setTimeout(() => window.appState.scrollToSection(item.scrollTo), 100);
        } else {
          window.appState.navigate(item.page);
        }
        window.appState.toggleMenu();
      };
      
      // Add stagger animation
      mobileNavButton.style.animationDelay = `${index * 0.1}s`;
      mobileNavButton.classList.add('slide-in-left');
      
      mobileMenuContent.appendChild(mobileNavButton);
    });
    
    // Mobile language toggle
    const mobileLangButton = createElement('button', 
      'flex items-center space-x-2 px-4 py-2 font-body text-lg text-gray-700 hover:text-lilac-600 hover:bg-lilac-50/50 rounded-lg transition-all duration-300 w-full'
    );
    mobileLangButton.innerHTML = `
      <i data-lucide="globe" class="h-5 w-5"></i>
      <span>${state.language === 'en' ? 'Français' : 'English'}</span>
    `;
    mobileLangButton.onclick = () => {
      const newLang = state.language === 'en' ? 'fr' : 'en';
      window.appState.setLanguage(newLang);
      window.appState.toggleMenu();
    };
    
    mobileMenuContent.appendChild(mobileLangButton);
    mobileMenu.appendChild(mobileMenuContent);
    container.appendChild(mobileMenu);
  }
  
  header.appendChild(container);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return header;
}

// Hero Section Component
function createHeroSection() {
  const { t } = window.appState;
  
  const section = createElement('section', 'relative py-24 bg-gradient-to-br from-lilac-50 to-blush-50 overflow-hidden');
  
  // Background decoration
  const bgDecoration = createElement('div', 'absolute inset-0');
  bgDecoration.innerHTML = `
    <div class="absolute top-20 left-10 w-40 h-40 bg-lilac-200/20 rounded-full blur-3xl float-animation"></div>
    <div class="absolute bottom-20 right-10 w-32 h-32 bg-blush-200/20 rounded-full blur-2xl float-animation" style="animation-delay: 2s;"></div>
    <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-sage-200/15 rounded-full blur-2xl float-animation" style="animation-delay: 4s;"></div>
  `;
  
  const container = createElement('div', 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  const content = createElement('div', 'text-center max-w-4xl mx-auto');
  
  const title = createElement('h1', 'font-heading text-6xl lg:text-7xl mb-8 text-lilac-800');
  title.innerHTML = `<span class="block">${t.hero.title1}</span><span class="block elegant-accent">${t.hero.title2}</span>`;
  
  const subtitle = createElement('p', 'font-body text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed fade-in stagger-2', [t.hero.subtitle]);
  
  const buttonContainer = createElement('div', 'flex flex-col sm:flex-row gap-6 justify-center fade-in stagger-3');
  
  const primaryButton = createElement('button', 'btn btn-primary btn-lg button-glow gentle-hover', [t.hero.shopHaircare]);
  primaryButton.onclick = () => window.appState.navigate('products');
  
  const secondaryButton = createElement('button', 'btn btn-secondary btn-lg gentle-hover', [t.hero.learnMore]);
  secondaryButton.onclick = () => window.appState.scrollToSection('about');
  
  buttonContainer.appendChild(primaryButton);
  buttonContainer.appendChild(secondaryButton);
  
  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(buttonContainer);
  container.appendChild(content);
  section.appendChild(bgDecoration);
  section.appendChild(container);
  
  // Add entrance animations
  title.classList.add('fade-in', 'stagger-1');
  
  return section;
}

// Featured Products Component
function createFeaturedProducts() {
  const { t } = window.appState;
  const products = window.appState.getFeaturedProducts();
  
  const section = createElement('section', 'py-20 bg-white');
  const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  
  // Header
  const header = createElement('div', 'text-center mb-16 fade-in');
  const title = createElement('h2', 'font-heading text-4xl mb-4 text-gray-800 elegant-accent', [t.featuredProducts.title]);
  const subtitle = createElement('p', 'font-body text-lg text-gray-600 max-w-2xl mx-auto', [t.featuredProducts.subtitle]);
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Products grid
  const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8');
  
  products.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    grid.appendChild(productCard);
  });
  
  // View all button
  const viewAllContainer = createElement('div', 'text-center mt-12');
  const viewAllButton = createElement('button', 'btn btn-secondary btn-lg gentle-hover', [t.featuredProducts.viewAll]);
  viewAllButton.onclick = () => window.appState.navigate('products');
  
  viewAllContainer.appendChild(viewAllButton);
  
  container.appendChild(header);
  container.appendChild(grid);
  container.appendChild(viewAllContainer);
  section.appendChild(container);
  
  return section;
}

// Product Card Component
function createProductCard(product, index = 0) {
  const { t } = window.appState;
  
  const card = createElement('div', 'card card-lift fade-in group cursor-pointer');
  card.style.animationDelay = `${index * 0.1}s`;
  
  const cardContent = createElement('div', 'card-content p-0');
  
  // Product image
  const imageContainer = createElement('div', 'relative w-full h-64 bg-gray-100 overflow-hidden');
  const image = createElement('img', 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500');
  image.src = product.image;
  image.alt = product.name;
  image.loading = 'lazy';
  
  // Badge
  if (product.badge) {
    const badge = createElement('div', 'absolute top-4 left-4 px-3 py-1 bg-lilac-600 text-white text-sm font-medium rounded-full', [t.featuredProducts[product.badge.toLowerCase().replace(' ', '')]]);
    imageContainer.appendChild(badge);
  }
  
  imageContainer.appendChild(image);
  
  // Product info
  const info = createElement('div', 'p-6');
  const name = createElement('h3', 'font-body text-xl font-semibold text-gray-800 mb-2 group-hover:text-lilac-600 transition-colors', [product.name]);
  const price = createElement('p', 'font-body text-lg font-semibold text-lilac-600 mb-4', [`$${product.price.toFixed(2)}`]);
  
  // Rating
  const ratingContainer = createElement('div', 'flex items-center space-x-2 mb-4');
  const stars = createElement('div', 'flex space-x-1');
  
  for (let i = 0; i < 5; i++) {
    const star = createIcon('star', 'w-4 h-4');
    star.className += i < Math.floor(product.rating) ? ' text-yellow-400 fill-current' : ' text-gray-300';
    stars.appendChild(star);
  }
  
  const ratingText = createElement('span', 'font-body text-sm text-gray-600', [`${product.rating} (${product.reviews} reviews)`]);
  
  ratingContainer.appendChild(stars);
  ratingContainer.appendChild(ratingText);
  
  // Add to cart button
  const addToCartButton = createElement('button', 'btn btn-primary w-full button-glow gentle-hover', [t.featuredProducts.addToCart]);
  addToCartButton.onclick = (e) => {
    e.stopPropagation();
    window.appState.addToCart(product);
  };
  
  info.appendChild(name);
  info.appendChild(price);
  info.appendChild(ratingContainer);
  info.appendChild(addToCartButton);
  
  cardContent.appendChild(imageContainer);
  cardContent.appendChild(info);
  card.appendChild(cardContent);
  
  // Navigate to product detail on card click
  card.onclick = () => window.appState.navigate('product-detail', product.id);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return card;
}

// About Section Component
function createAboutSection() {
  const { t } = window.appState;
  
  const section = createElement('section', 'py-20 bg-gradient-to-b from-white to-lilac-50/30');
  section.id = 'about';
  
  const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  const grid = createElement('div', 'grid lg:grid-cols-2 gap-16 items-center');
  
  // Content side
  const content = createElement('div', 'lg:pr-12');
  
  const title = createElement('h2', 'font-heading text-4xl mb-8 text-gray-800 elegant-accent fade-in', [t.about.title]);
  
  const paragraphs = [
    t.about.paragraph1,
    t.about.paragraph2,
    t.about.paragraph3
  ];
  
  paragraphs.forEach((text, index) => {
    const p = createElement('p', `font-body text-lg text-gray-600 leading-relaxed mb-6 fade-in stagger-${index + 2}`, [text]);
    content.appendChild(p);
  });
  
  // Quote section
  const quoteContainer = createElement('div', 'mt-12 p-6 bg-lilac-50/60 rounded-2xl border-l-4 border-lilac-400 fade-in stagger-5');
  const quote = createElement('blockquote', 'font-heading text-xl text-lilac-800 italic mb-4', [`"${t.about.quote}"`]);
  const author = createElement('div', '');
  const authorName = createElement('p', 'font-body font-semibold text-gray-800', [t.about.founder]);
  const authorTitle = createElement('p', 'font-body text-gray-600', [t.about.founderTitle]);
  
  author.appendChild(authorName);
  author.appendChild(authorTitle);
  quoteContainer.appendChild(quote);
  quoteContainer.appendChild(author);
  
  content.appendChild(quoteContainer);
  
  // Image side
  const imageContainer = createElement('div', 'relative fade-in stagger-1');
  const image = createElement('img', 'w-full h-96 lg:h-[500px] object-cover rounded-3xl soft-shadow-lg');
  image.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=700&fit=crop';
  image.alt = 'Salon interior';
  image.loading = 'lazy';
  
  // Floating decorations
  const decoration1 = createElement('div', 'absolute -bottom-8 -right-8 w-32 h-32 bg-lilac-200/30 rounded-full blur-2xl');
  const decoration2 = createElement('div', 'absolute -top-8 -left-8 w-24 h-24 bg-blush-200/40 rounded-full blur-xl');
  
  imageContainer.appendChild(image);
  imageContainer.appendChild(decoration1);
  imageContainer.appendChild(decoration2);
  
  grid.appendChild(content);
  grid.appendChild(imageContainer);
  container.appendChild(grid);
  section.appendChild(container);
  
  return section;
}

// Why Section Component
function createWhySection() {
  const { t } = window.appState;
  
  const section = createElement('section', 'py-20 bg-gradient-to-b from-lilac-50/30 to-white');
  const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  
  // Header
  const header = createElement('div', 'text-center mb-16 fade-in');
  const title = createElement('h2', 'font-heading text-4xl mb-4 text-gray-800 elegant-accent', [t.why.title]);
  const subtitle = createElement('p', 'font-body text-lg text-gray-600 max-w-2xl mx-auto', [t.why.subtitle]);
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Features grid
  const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8');
  
  const features = [
    {
      icon: 'award',
      title: t.why.salonTested.title,
      description: t.why.salonTested.description,
      color: 'lilac'
    },
    {
      icon: 'leaf',
      title: t.why.cleanIngredients.title,
      description: t.why.cleanIngredients.description,
      color: 'blush'
    },
    {
      icon: 'map-pin',
      title: t.why.craftedInMontreal.title,
      description: t.why.craftedInMontreal.description,
      color: 'lilac'
    },
    {
      icon: 'users',
      title: t.why.expertApproved.title,
      description: t.why.expertApproved.description,
      color: 'blush'
    }
  ];
  
  features.forEach((feature, index) => {
    const featureCard = createElement('div', 'card hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm fade-in card-lift');
    featureCard.style.animationDelay = `${index * 0.1}s`;
    
    const cardContent = createElement('div', 'card-content p-8 text-center');
    
    const iconContainer = createElement('div', 
      `inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
        feature.color === 'lilac' 
          ? 'bg-gradient-to-br from-lilac-100 to-lilac-200' 
          : 'bg-gradient-to-br from-blush-100 to-blush-200'
      }`
    );
    
    const icon = createIcon(feature.icon, `h-8 w-8 ${feature.color === 'lilac' ? 'text-lilac-600' : 'text-blush-600'}`);
    iconContainer.appendChild(icon);
    
    const featureTitle = createElement('h3', 'font-body text-lg font-medium text-gray-800 mb-3', [feature.title]);
    const featureDescription = createElement('p', 'font-body text-gray-600 leading-relaxed', [feature.description]);
    
    cardContent.appendChild(iconContainer);
    cardContent.appendChild(featureTitle);
    cardContent.appendChild(featureDescription);
    featureCard.appendChild(cardContent);
    
    grid.appendChild(featureCard);
  });
  
  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return section;
}

// Reviews Section Component
function createReviewsSection() {
  const { t, state } = window.appState;
  const reviews = window.appState.reviews;
  
  const section = createElement('section', 'py-20 bg-gradient-to-b from-white to-lilac-50/20');
  section.id = 'reviews';
  
  const container = createElement('div', 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8');
  
  // Header
  const header = createElement('div', 'text-center mb-16 fade-in');
  const title = createElement('h2', 'font-heading text-4xl mb-4 text-gray-800 elegant-accent', [t.reviews.title]);
  const subtitle = createElement('p', 'font-body text-lg text-gray-600', [t.reviews.subtitle]);
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Reviews grid
  const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 gap-6');
  
  reviews.forEach((review, index) => {
    const reviewCard = createReviewCard(review, index);
    grid.appendChild(reviewCard);
  });
  
  // Social media follow section
  const followSection = createElement('div', 'text-center mt-12 fade-in');
  const followText = createElement('p', 'font-body text-gray-500 mb-4', ['Follow us on social media for more real reviews!']);
  
  const socialIcons = createElement('div', 'flex justify-center space-x-4');
  
  const socialPlatforms = [
    { icon: 'instagram', gradient: 'from-purple-400 to-pink-400' },
    { icon: 'facebook', gradient: 'from-pink-400 to-red-400' },
    { icon: 'twitter', gradient: 'from-blue-400 to-blue-600' }
  ];
  
  socialPlatforms.forEach((platform, index) => {
    const socialButton = createElement('div', `w-8 h-8 bg-gradient-to-br ${platform.gradient} rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 fade-in`);
    socialButton.style.animationDelay = `${index * 0.1}s`;
    
    const socialIcon = createIcon(platform.icon, 'w-4 h-4 text-white');
    socialButton.appendChild(socialIcon);
    
    socialIcons.appendChild(socialButton);
  });
  
  followSection.appendChild(followText);
  followSection.appendChild(socialIcons);
  
  container.appendChild(header);
  container.appendChild(grid);
  container.appendChild(followSection);
  section.appendChild(container);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return section;
}

// Review Card Component
function createReviewCard(review, index = 0) {
  const { state } = window.appState;
  
  const card = createElement('div', 'card border-0 bg-white soft-shadow hover:soft-shadow-lg transition-all duration-300 overflow-hidden fade-in card-lift');
  card.style.animationDelay = `${index * 0.1}s`;
  
  const cardContent = createElement('div', 'p-0');
  
  // Post header
  const header = createElement('div', 'flex items-center justify-between p-4 border-b border-gray-100');
  
  const userInfo = createElement('div', 'flex items-center space-x-3');
  
  const avatarContainer = createElement('div', 'relative');
  const avatar = createElement('img', 'w-10 h-10 rounded-full object-cover');
  avatar.src = review.image;
  avatar.alt = review.displayName;
  avatar.loading = 'lazy';
  
  if (review.verified) {
    const verifiedBadge = createElement('div', 'absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center');
    verifiedBadge.innerHTML = '<svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
    avatarContainer.appendChild(verifiedBadge);
  }
  
  avatarContainer.appendChild(avatar);
  
  const userDetails = createElement('div', '');
  const nameAndTime = createElement('div', 'flex items-center space-x-2');
  const displayName = createElement('p', 'font-body font-semibold text-gray-800 text-sm', [review.displayName]);
  const separator = createElement('span', 'text-gray-400 text-sm', ['•']);
  const timeAgo = createElement('span', 'text-gray-500 text-sm', [review.timeAgo]);
  
  nameAndTime.appendChild(displayName);
  nameAndTime.appendChild(separator);
  nameAndTime.appendChild(timeAgo);
  
  const username = createElement('p', 'text-gray-500 text-xs', [`@${review.username} • ${review.location}`]);
  
  userDetails.appendChild(nameAndTime);
  userDetails.appendChild(username);
  
  userInfo.appendChild(avatarContainer);
  userInfo.appendChild(userDetails);
  
  const moreButton = createIcon('more-horizontal', 'h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer');
  
  header.appendChild(userInfo);
  header.appendChild(moreButton);
  
  // Post content
  const content = createElement('div', 'p-4');
  
  // Rating stars
  const rating = createElement('div', 'flex items-center space-x-1 mb-3');
  for (let i = 0; i < 5; i++) {
    const star = createIcon('star', 'h-4 w-4');
    star.className += i < review.rating ? ' text-yellow-400 fill-current' : ' text-gray-300';
    rating.appendChild(star);
  }
  
  const reviewText = createElement('p', 'font-body text-gray-800 leading-relaxed mb-4', [review.review[state.language]]);
  
  const productTag = createElement('div', 'inline-block bg-lilac-50 px-3 py-1 rounded-full');
  const productName = createElement('p', 'text-sm font-medium text-lilac-700', [review.product[state.language]]);
  productTag.appendChild(productName);
  
  content.appendChild(rating);
  content.appendChild(reviewText);
  content.appendChild(productTag);
  
  // Post footer
  const footer = createElement('div', 'flex items-center justify-between px-4 py-3 border-t border-gray-100');
  
  const interactions = createElement('div', 'flex items-center space-x-6');
  
  const likeButton = createElement('button', 'flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors');
  likeButton.innerHTML = `
    <i data-lucide="heart" class="h-5 w-5"></i>
    <span class="text-sm font-medium">${review.likes}</span>
  `;
  
  const commentButton = createElement('button', 'flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors');
  commentButton.innerHTML = `
    <i data-lucide="message-circle" class="h-5 w-5"></i>
    <span class="text-sm font-medium">${review.comments}</span>
  `;
  
  interactions.appendChild(likeButton);
  interactions.appendChild(commentButton);
  
  const shareButton = createIcon('share', 'h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer');
  
  footer.appendChild(interactions);
  footer.appendChild(shareButton);
  
  cardContent.appendChild(header);
  cardContent.appendChild(content);
  cardContent.appendChild(footer);
  card.appendChild(cardContent);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return card;
}

// Footer Component
function createFooter() {
  const { t } = window.appState;
  
  const footer = createElement('footer', 'relative bg-gradient-to-br from-lilac-700 to-lilac-800 text-white overflow-hidden');
  
  // Background decoration
  const bgDecoration = createElement('div', 'absolute inset-0');
  bgDecoration.innerHTML = `
    <div class="absolute top-10 left-10 w-32 h-32 bg-lilac-600/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-20 w-40 h-40 bg-blush-500/10 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-sage-400/10 rounded-full blur-2xl"></div>
  `;
  
  const container = createElement('div', 'relative z-10 pt-20 pb-12');
  const maxWidth = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  
  // Newsletter Section
  const newsletterSection = createNewsletterSection();
  
  // Main Footer Content
  const mainContent = createElement('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12');
  
  // Brand section
  const brandSection = createFooterBrandSection();
  
  // Quick Links section
  const quickLinksSection = createFooterQuickLinksSection();
  
  // Customer Care section
  const customerCareSection = createFooterCustomerCareSection();
  
  // Contact Info section
  const contactSection = createFooterContactSection();
  
  mainContent.appendChild(brandSection);
  mainContent.appendChild(quickLinksSection);
  mainContent.appendChild(customerCareSection);
  mainContent.appendChild(contactSection);
  
  // Bottom bar
  const bottomBar = createFooterBottomBar();
  
  maxWidth.appendChild(newsletterSection);
  maxWidth.appendChild(mainContent);
  maxWidth.appendChild(bottomBar);
  container.appendChild(maxWidth);
  footer.appendChild(bgDecoration);
  footer.appendChild(container);
  
  return footer;
}

// Newsletter Section for Footer
function createNewsletterSection() {
  const { t } = window.appState;
  
  const section = createElement('div', 'mb-16 text-center border-b border-lilac-600/30 pb-16 fade-in');
  const container = createElement('div', 'max-w-2xl mx-auto');
  
  const iconContainer = createElement('div', 'inline-flex items-center justify-center w-16 h-16 bg-lilac-600/30 rounded-full mb-8 float-animation');
  const mailIcon = createIcon('mail', 'h-8 w-8 text-lilac-200');
  iconContainer.appendChild(mailIcon);
  
  const title = createElement('h3', 'font-heading text-4xl mb-4 text-white', [t.newsletter.title]);
  const subtitle = createElement('p', 'text-lilac-200 text-lg mb-8 font-body', [t.newsletter.subtitle]);
  
  const form = createElement('form', 'max-w-md mx-auto');
  form.id = 'newsletter-form';
  
  const inputContainer = createElement('div', 'flex flex-col sm:flex-row gap-4');
  
  const emailInput = createElement('input', 'flex-1 h-12 px-6 bg-white/10 border border-lilac-300/20 text-white placeholder:text-lilac-200 focus:border-lilac-400 focus:ring-lilac-400/20 rounded-full backdrop-blur-sm font-body form-input');
  emailInput.type = 'email';
  emailInput.placeholder = t.newsletter.placeholder;
  emailInput.required = true;
  emailInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  emailInput.style.color = 'white';
  
  const submitButton = createElement('button', 'h-12 bg-blush-500 hover:bg-blush-600 text-white px-8 rounded-full soft-shadow gentle-hover font-body btn button-glow', [t.newsletter.subscribe]);
  submitButton.type = 'submit';
  
  inputContainer.appendChild(emailInput);
  inputContainer.appendChild(submitButton);
  form.appendChild(inputContainer);
  
  const privacy = createElement('p', 'text-sm text-lilac-300 mt-6 font-body', [t.newsletter.privacy]);
  
  // Form submission handler
  form.onsubmit = (e) => {
    e.preventDefault();
    const formContainer = form.parentElement;
    
    const successMessage = createElement('div', 'max-w-md mx-auto notification-enter');
    successMessage.innerHTML = `
      <div class="flex items-center justify-center space-x-3 p-4 bg-sage-500/20 border border-sage-400/30 rounded-full backdrop-blur-sm">
        <div class="w-5 h-5 bg-sage-300 rounded-full"></div>
        <p class="text-sage-200 font-medium font-body">${t.newsletter.success}</p>
      </div>
    `;
    
    formContainer.replaceChild(successMessage, form);
    
    setTimeout(() => {
      formContainer.replaceChild(form, successMessage);
      emailInput.value = '';
    }, 3000);
  };
  
  container.appendChild(iconContainer);
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(form);
  container.appendChild(privacy);
  section.appendChild(container);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return section;
}

// Footer Brand Section
function createFooterBrandSection() {
  const { t } = window.appState;
  
  const section = createElement('div', 'lg:col-span-1 fade-in stagger-1');
  
  const brandButton = createElement('button', 'font-heading text-3xl mb-6 text-white hover:text-lilac-200 transition-colors duration-300 elegant-accent');
  brandButton.textContent = t.brand;
  brandButton.onclick = () => window.appState.navigate('home');
  
  const description = createElement('p', 'text-lilac-200 mb-8 leading-relaxed font-body text-lg', [t.footer.description]);
  
  const socialContainer = createElement('div', 'flex space-x-4');
  
  const socialLinks = [
    { icon: 'instagram', name: 'Instagram' },
    { icon: 'facebook', name: 'Facebook' },
    { icon: 'twitter', name: 'Twitter' },
    { icon: 'youtube', name: 'Youtube' }
  ];
  
  socialLinks.forEach((social, index) => {
    const socialButton = createElement('button', 'text-lilac-200 hover:text-white hover:bg-lilac-600/30 p-3 rounded-full gentle-hover transition-all duration-300 fade-in');
    socialButton.style.animationDelay = `${index * 0.1}s`;
    
    const socialIcon = createIcon(social.icon, 'h-5 w-5');
    socialButton.appendChild(socialIcon);
    
    socialContainer.appendChild(socialButton);
  });
  
  section.appendChild(brandButton);
  section.appendChild(description);
  section.appendChild(socialContainer);
  
  // Reinitialize Lucide icons
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
  
  return section;
}

// Footer Quick Links Section
function createFooterQuickLinksSection() {
  const { t } = window.appState;
  
  const section = createElement('div', 'fade-in stagger-2');
  
  const title = createElement('h4', 'font-body text-xl font-semibold mb-6 text-white', [t.footer.quickLinks]);
  const linksList = createElement('ul', 'space-y-4');
  
  const links = [
    { label: t.footer.shopAll, action: () => window.appState.navigate('products') },
    { label: t.footer.hairMasks, action: () => window.appState.navigate('products') },
    { label: t.footer.serumsOils, action: () => window.appState.navigate('products') },
    { label: 'Salon Services', action: () => window.appState.navigate('salon') },
    { label: 'About Us', action: () => { window.appState.navigate('home'); setTimeout(() => window.appState.scrollToSection('about'), 100); } }
  ];
  
  links.forEach((link, index) => {
    const listItem = createElement('li', 'fade-in');
    listItem.style.animationDelay = `${index * 0.1}s`;
    
    const linkButton = createElement('button', 'text-lilac-200 hover:text-white transition-colors text-left font-body text-lg gentle-hover group');
    linkButton.onclick = link.action;
    linkButton.innerHTML = `
      <span class="relative">
        ${link.label}
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
      </span>
    `;
    
    listItem.appendChild(linkButton);
    linksList.appendChild(listItem);
  });
  
  section.appendChild(title);
  section.appendChild(linksList);
  
  return section;
}

// Footer Customer Care Section
function createFooterCustomerCareSection() {
  const { t } = window.appState;
  
  const section = createElement('div', 'fade-in stagger-3');
  
  const title = createElement('h4', 'font-body text-xl font-semibold mb-6 text-white', [t.footer.customerCare]);
  const linksList = createElement('ul', 'space-y-4');
  
  const links = [
    t.footer.contactUs,
    t.footer.shippingInfo,
    t.footer.returns,
    t.footer.faq
  ];
  
  links.forEach((linkText, index) => {
    const listItem = createElement('li', 'fade-in');
    listItem.style.animationDelay = `${index * 0.1}s`;
    
    const linkButton = createElement('button', 'text-lilac-200 hover:text-white transition-colors text-left font-body text-lg gentle-hover group');
    linkButton.innerHTML = `
      <span class="relative">
        ${linkText}
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
      </span>
    `;
    
    listItem.appendChild(linkButton);
    linksList.appendChild(listItem);
  });
  
  section.appendChild(title);
  section.appendChild(linksList);
  
  return section;
}

// Footer Contact Section
function createFooterContactSection() {
  const { t } = window.appState;
  
  const section = createElement('div', 'fade-in stagger-4');
  
  const title = createElement('h4', 'font-body text-xl font-semibold mb-6 text-white', [t.footer.contact]);
  const contactInfo = createElement('div', 'space-y-6');
  
  // Address
  const addressContainer = createElement('div', 'flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200');
  const addressIcon = createIcon('map-pin', 'h-5 w-5 text-lilac-300 mt-1 flex-shrink-0');
  const addressText = createElement('div', '');
  const locationText = createElement('p', 'text-lilac-200 font-body text-lg leading-relaxed', [t.footer.location]);
  addressText.appendChild(locationText);
  addressContainer.appendChild(addressIcon);
  addressContainer.appendChild(addressText);
  
  // Phone
  const phoneContainer = createElement('div', 'flex items-center space-x-4 hover:translate-x-1 transition-transform duration-200');
  const phoneIcon = createIcon('phone', 'h-5 w-5 text-lilac-300 flex-shrink-0');
  const phoneText = createElement('span', 'text-lilac-200 font-body text-lg', [t.footer.phone]);
  phoneContainer.appendChild(phoneIcon);
  phoneContainer.appendChild(phoneText);
  
  // Email
  const emailContainer = createElement('div', 'flex items-center space-x-4 hover:translate-x-1 transition-transform duration-200');
  const emailIcon = createIcon('mail', 'h-5 w-5 text-lilac-300 flex-shrink-0');
  const emailText = createElement('span', 'text-lilac-200 font-body text-lg', [t.footer.email]);
  emailContainer.appendChild(emailIcon);
  emailContainer.appendChild(emailText);
  
  contactInfo.appendChild(addressContainer);
  contactInfo.appendChild(phoneContainer);
  contactInfo.appendChild(emailContainer);
  
  // Salon hours
  const hoursCard = createElement('div', 'mt-8 p-6 bg-lilac-600/20 rounded-2xl border border-lilac-500/20 soft-shadow hover:scale-105 transition-transform duration-300');
  const hoursTitle = createElement('p', 'text-lg text-lilac-200 mb-3 font-body font-medium', [t.footer.salonHours]);
  const hoursContainer = createElement('div', 'space-y-1');
  const tueSatHours = createElement('p
// DOM utilities for creating elements and managing interactions
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

function addEventListenerSafe(element, event, handler) {
  if (element && typeof handler === 'function') {
    element.addEventListener(event, handler);
  }
}

function animateElement(element, animationClass, delay = 0) {
  if (element) {
    element.style.animationDelay = `${delay}s`;
    element.classList.add(animationClass);
  }
}

function initializeLucideIcons() {
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 0);
}

function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Animation utilities
function fadeIn(element, delay = 0) {
  animateElement(element, 'fade-in', delay);
}

function slideInLeft(element, delay = 0) {
  animateElement(element, 'slide-in-left', delay);
}

function slideInRight(element, delay = 0) {
  animateElement(element, 'slide-in-right', delay);
}

function staggerAnimation(elements, animationClass, staggerDelay = 0.1) {
  elements.forEach((element, index) => {
    animateElement(element, animationClass, index * staggerDelay);
  });
}

// Form utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function formatCardNumber(value) {
  return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiryDate(value) {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
  }
  return cleanValue;
}

// Local storage utilities
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

window.utils = {
  createElement,
  createIcon,
  addEventListenerSafe,
  animateElement,
  initializeLucideIcons,
  smoothScrollTo,
  formatPrice,
  debounce,
  throttle,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerAnimation,
  validateEmail,
  formatCardNumber,
  formatExpiryDate,
  saveToLocalStorage,
  loadFromLocalStorage
};
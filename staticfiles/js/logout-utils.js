// Simple logout utilities
class LogoutUtils {
    static performLogout() {
        // Clear user session
        localStorage.removeItem('lune-lilas-user');
        
        // Show logout notification
        this.showNotification('Successfully signed out', 'success');
    }
    
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        let bgColor = 'bg-lilac-500';
        if (type === 'success') bgColor = 'bg-sage-500';
        if (type === 'error') bgColor = 'bg-destructive';
        
        notification.className = `fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg notification-enter`;
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
    
    static initializeLucideIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
    
    static setupAnimations() {
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
        
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }
}

window.LogoutUtils = LogoutUtils;
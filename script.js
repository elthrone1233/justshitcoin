// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links with custom easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80; // Account for fixed navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 11, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 11, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section with smooth easing
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.3; // Reduced rate for smoother effect
        const scale = 1 + (scrolled * 0.0001); // Subtle scale effect
        heroImage.style.transform = `translateY(${rate}px) scale(${scale})`;
        
        // Add fade effect as user scrolls
        const opacity = Math.max(0.3, 1 - (scrolled * 0.001));
        heroImage.style.opacity = opacity;
    }
});

// Intersection Observer for animations with smooth transitions
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
}, observerOptions);

// Observe elements for animation with smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tokenomics-card, .social-card, .roadmap-phase, .about-img');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Particle effect for hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#ff00ff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = -10;
        const duration = 3000 + Math.random() * 2000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        const startTime = Date.now();
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                
                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.opacity = 0.6 * (1 - progress);
                
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// Create particles periodically
setInterval(createParticle, 200);

// Hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tokenomics-card, .social-card, .roadmap-phase');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('$')) {
            element.textContent = '$' + Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            
            if (text.includes('69,000,000')) {
                animateCounter(target, 69000000);
            } else if (text.includes('$ASS')) {
                // Don't animate text, just add glow effect
                target.style.textShadow = '0 0 20px #ff00ff';
            }
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Glow effect for hero image
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setInterval(() => {
            heroImage.style.filter = 'drop-shadow(0 0 30px #ff00ff)';
            setTimeout(() => {
                heroImage.style.filter = 'drop-shadow(0 0 20px #ff00ff)';
            }, 500);
        }, 3000);
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to social cards
document.addEventListener('DOMContentLoaded', () => {
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .social-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload images for better performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            const newImg = new Image();
            newImg.src = img.src;
        }
    });
});

// Slap functionality
document.addEventListener('DOMContentLoaded', () => {
    const slapButton = document.querySelector('.slap-button');
    const slapImage = document.getElementById('slapImage');
    const heroContainer = document.querySelector('.hero-image-container');
    
    // Create audio element
    const slapSound = new Audio('slap.mp3');
    slapSound.volume = 0.7;
    
    // Slap function
    function slapAss(event) {
        // Play sound
        slapSound.currentTime = 0;
        slapSound.play().catch(e => console.log('Audio play failed:', e));
        
        // Create slap effect
        const slapEffect = document.createElement('div');
        slapEffect.className = 'slap-effect';
        slapEffect.innerHTML = '👋';
        slapEffect.style.left = event.clientX + 'px';
        slapEffect.style.top = event.clientY + 'px';
        slapEffect.style.transform = 'translate(-50%, -50%)';
        
        heroContainer.appendChild(slapEffect);
        
        // Add shake effect to image
        slapImage.style.animation = 'none';
        setTimeout(() => {
            slapImage.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        // Remove slap effect after animation
        setTimeout(() => {
            slapEffect.remove();
        }, 500);
        
        // Reset image animation
        setTimeout(() => {
            slapImage.style.animation = 'bounce 3s ease-in-out infinite';
        }, 500);
    }
    
    // Add click event to button
    if (slapButton) {
        slapButton.addEventListener('click', slapAss);
    }
    
    // Add click event to image (optional - for direct image clicks)
    if (slapImage) {
        slapImage.addEventListener('click', slapAss);
    }
    
    // Add shake animation CSS
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);
});

// Initial screen functionality
document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initialScreen');
    const mainContent = document.getElementById('mainContent');
    const shakeAssBtn = document.getElementById('shakeAssBtn');
    
    // Create background music
    const backgroundMusic = new Audio('music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    
    // Shake ASS button functionality
    shakeAssBtn.addEventListener('click', () => {
        // Play music
        backgroundMusic.play().catch(e => console.log('Music play failed:', e));
        
        // Add click effect to button
        shakeAssBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            shakeAssBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Fade out initial screen
        initialScreen.style.transition = 'opacity 1s ease-out';
        initialScreen.style.opacity = '0';
        
        // Show main content
        setTimeout(() => {
            initialScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Fade in main content
            setTimeout(() => {
                mainContent.classList.add('show');
            }, 100);
        }, 1000);
    });
    
    // Add hover sound effect (optional)
    shakeAssBtn.addEventListener('mouseenter', () => {
        shakeAssBtn.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    shakeAssBtn.addEventListener('mouseleave', () => {
        shakeAssBtn.style.transform = 'scale(1) translateY(0)';
    });
}); 
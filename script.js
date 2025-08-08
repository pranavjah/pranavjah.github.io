// Mobile Navigation Toggle
const hamburger = document.querySelector('.md\\:hidden button');
const navMenu = document.querySelector('.hidden.md\\:flex');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // For mobile, we'll show a dropdown menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'absolute top-16 left-0 w-full bg-darker border-b border-gray-800 md:hidden';
        mobileMenu.innerHTML = `
            <div class="flex flex-col space-y-4 p-4">
                <a href="#home" class="text-gray-300 hover:text-accent transition-colors">Home</a>
                <a href="#about" class="text-gray-300 hover:text-accent transition-colors">About</a>
                <a href="#skills" class="text-gray-300 hover:text-accent transition-colors">Skills</a>
                <a href="#projects" class="text-gray-300 hover:text-accent transition-colors">Projects</a>
                <a href="#contact" class="text-gray-300 hover:text-accent transition-colors">Contact</a>
            </div>
        `;
        
        // Remove existing mobile menu
        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.remove();
        } else {
            document.querySelector('nav').appendChild(mobileMenu);
            mobileMenu.classList.add('mobile-menu');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark');
        navbar.classList.remove('bg-dark/95');
    } else {
        navbar.classList.remove('bg-dark');
        navbar.classList.add('bg-dark/95');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.bg-darker');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add hover effects to project cards
document.querySelectorAll('.bg-darker').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.bg-accent').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fade-in 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #0099cc);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.remove();
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #00d4ff';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Typing animation for hero title
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Parallax effect for scroll indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.absolute.bottom-8');
    if (scrollIndicator) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        scrollIndicator.style.transform = `translateX(-50%) translateY(${rate}px)`;
    }
});

// Add smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
}); 
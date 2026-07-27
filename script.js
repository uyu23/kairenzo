// Initialize Icons
lucide.createIcons();

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Theme Management
const themeManager = {
    init() {
        const toggleBtn = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
        this.setTheme(initialTheme);

        // Click handler
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const current = html.getAttribute('data-theme');
                this.setTheme(current === 'dark' ? 'light' : 'dark');
            });
        }

        // Listen for system changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update Meta Theme Color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#ffffff');
        }
        
        // Update Icon
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
            if (window.lucide) lucide.createIcons();
        }
    }
};

// Initialize Theme
themeManager.init();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isActive = mobileMenu.classList.contains('active');
        mobileBtn.innerHTML = `<i data-lucide="${isActive ? 'x' : 'menu'}"></i>`;
        lucide.createIcons();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });
}

// Parallax Effect (Hero Visual)
const parallaxVisual = document.getElementById('parallax-visual');
if (parallaxVisual && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        // Only run if near top of page for performance
        if (window.scrollY > window.innerHeight) return;
        
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        
        gsap.to(parallaxVisual, {
            x: -x,
            y: -y,
            duration: 1,
            ease: "power2.out"
        });
    });
}

// GSAP Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach(el => {
    gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        {
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const header = item.querySelector('.faq-head');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Form Submission Prevention (Demo)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Request Sent <i data-lucide="check"></i>';
        btn.style.backgroundColor = 'var(--emerald, #10B981)';
        btn.style.color = '#fff';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            form.reset();
        }, 3000);
    });
});

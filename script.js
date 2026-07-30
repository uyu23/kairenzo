// Initialize Icons
if (window.lucide) window.lucide.createIcons();

// Register GSAP Plugin
if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);

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
if (window.gsap && window.ScrollTrigger) revealElements.forEach(el => {
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
else revealElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
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

// Kairenzo portfolio animations
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.count-target');
  const animateCount = (el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = 'true';
    const target = Number(el.dataset.target || 40);
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + 'K+';
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCount(entry.target);
    });
  }, { threshold: .45 });
  counters.forEach(el => observer.observe(el));

  if (window.gsap && window.ScrollTrigger) {
    gsap.from('.proof-card', {
      scrollTrigger: { trigger: '.proof-metrics', start: 'top 82%' },
      y: 34, opacity: 0, duration: .7, stagger: .13, ease: 'power2.out'
    });
    gsap.from('.founder-stagger', {
      scrollTrigger: { trigger: '.founder-card', start: 'top 80%' },
      y: 22, opacity: 0, duration: .65, stagger: .1, ease: 'power2.out'
    });
    gsap.from('.founder-tags span', {
      scrollTrigger: { trigger: '.founder-tags', start: 'top 88%' },
      y: 14, opacity: 0, duration: .45, stagger: .08, ease: 'power2.out'
    });
  }
});

// Signature hero entrance — headline only.
// Subtitle and CTA are intentionally excluded so they cannot get stuck at opacity: 0.
document.addEventListener('DOMContentLoaded', () => {
  const line1 = document.querySelector('.hero-line-1');
  const line2 = document.querySelector('.hero-line-2');
  const attention = document.querySelector('.attention-word');
  const subtitle = document.querySelector('.hero .subtitle, .hero p.subtitle');

  // Defensive reset: subtitle must remain visible after all entrance animations.
  if (subtitle) {
    subtitle.style.opacity = '1';
    subtitle.style.visibility = 'visible';
    subtitle.style.transform = 'none';
    subtitle.style.filter = 'none';
  }

  if (window.gsap && line1 && line2) {
    gsap.set([line1, line2], { opacity: 1 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(line1, {
      y: 32, opacity: 0, filter: 'blur(10px)', duration: .82, clearProps: 'filter,transform'
    })
    .from(attention, {
      opacity: 0, filter: 'blur(12px)', scale: .97, duration: .58, clearProps: 'filter,transform'
    }, '-=.44')
    .from(line2, {
      y: 28, opacity: 0, filter: 'blur(9px)', duration: .76, clearProps: 'filter,transform'
    }, '-=.30');
  }

  // Final safety reset after any older page-load timelines have completed.
  setTimeout(() => {
    if (subtitle) {
      subtitle.style.opacity = '1';
      subtitle.style.visibility = 'visible';
      subtitle.style.transform = 'none';
      subtitle.style.filter = 'none';
    }
  }, 2200);
});

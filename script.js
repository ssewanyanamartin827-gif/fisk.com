document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Hero Background Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide for a more relaxed feel

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // 3. Sticky Navigation with Smooth Glassmorphism Transition
    const navbar = document.getElementById('navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll(); // Check on initial load

    // 4. Enhanced Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 120; // Reveal slightly earlier for a smoother feel

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal, { passive: true });
    // Trigger immediately and after a short delay to ensure initial elements load
    reveal(); 
    setTimeout(reveal, 100);

    // 5. Subtle Parallax for Contact Section Blobs
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        blobs.forEach((blob, index) => {
            const speed = index === 0 ? 0.05 : -0.03;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle active state for hamburger animation
            mobileMenuBtn.classList.toggle('active');
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = 'calc(100% + 10px)';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
                navLinks.style.backdropFilter = 'blur(12px)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                navLinks.style.borderRadius = '16px';
                navLinks.style.border = '1px solid rgba(255, 255, 255, 1)';
                
                // Update text color for mobile menu items
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = 'var(--primary)';
                    link.style.fontWeight = '600';
                    link.style.fontSize = '1.1rem';
                    link.style.marginBottom = '1.5rem';
                    link.style.display = 'block';
                    link.style.textAlign = 'center';
                });
                
                // Remove ::after lines for mobile
                const style = document.createElement('style');
                style.innerHTML = '.nav-links a::after { display: none; }';
                document.head.appendChild(style);
            }
        });
    }

    // 7. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.classList.remove('active');
                }

                // Scroll to element
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // 8. Contact Form Floating Labels Logic handled by CSS via placeholder-shown
    // No JS needed for it, pure CSS works beautifully.
});

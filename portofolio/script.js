// ====================
// INISIALISASI
// ====================

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initNavbar();
    initScrollEffects();
    initPortfolioFilter();
    initContactForm();
    initBackToTop();
    initSkillAnimation();
    initTypingEffect();
});

// ====================
// NAVBAR FUNCTIONALITY
// ====================

function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ====================
// SCROLL EFFECTS
// ====================

function initScrollEffects() {
    const header = document.getElementById('header');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ====================
// PORTFOLIO FILTER
// ====================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ====================
// CONTACT FORM
// ====================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Harap isi semua field!', 'error');
                return;
            }
            
            // Simulate sending message
            showNotification('Pesan berhasil dikirim! Saya akan membalas segera.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ====================
// BACK TO TOP BUTTON
// ====================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================
// SKILL ANIMATION
// ====================

function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.level-progress');
                const levelText = entry.target.querySelector('.level-text');
                const width = skillLevel.style.width;
                
                // Reset width for animation
                skillLevel.style.width = '0%';
                
                // Animate to full width
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 300);
                
                // Animate percentage text
                let percent = 0;
                const targetPercent = parseInt(levelText.textContent);
                const interval = setInterval(() => {
                    if (percent >= targetPercent) {
                        clearInterval(interval);
                    } else {
                        percent++;
                        levelText.textContent = percent + '%';
                    }
                }, 15);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

// ====================
// TYPING EFFECT
// ====================

function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    
    // Only run if we have the highlight element
    const highlightElement = heroTitle.querySelector('.highlight');
    if (!highlightElement) return;
    
    const highlightText = highlightElement.textContent;
    const beforeText = originalText.split(highlightText)[0];
    const afterText = originalText.split(highlightText)[1];
    
    // Clear the title
    heroTitle.innerHTML = '';
    
    // Add before text
    heroTitle.innerHTML = beforeText;
    
    // Create span for typing effect
    const typingSpan = document.createElement('span');
    typingSpan.className = 'highlight typing';
    heroTitle.appendChild(typingSpan);
    
    // Add after text
    const afterSpan = document.createElement('span');
    afterSpan.innerHTML = afterText;
    heroTitle.appendChild(afterSpan);
    
    // Typing effect
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < highlightText.length) {
            typingSpan.textContent += highlightText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ====================
// NOTIFICATION SYSTEM
// ====================

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ====================
// ADD STYLES FOR NOTIFICATION
// ====================

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background-color: #2ecc71;
    }
    
    .notification.error {
        background-color: #e74c3c;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
        line-height: 1;
    }
`;

document.head.appendChild(notificationStyles);
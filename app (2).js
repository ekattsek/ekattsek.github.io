// Professional Portfolio - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links - Fixed implementation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            let targetSection = null;
            
            // Handle home link specifically to scroll to top
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                return;
            }
            
            targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get the navbar height for accurate offset
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for better UX
        
        // Check if we're at the very top of the page
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
            return;
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll with throttling for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .ai-research-card, .experience-card, .timeline-item, .award-item, .skill-item, .business-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Staggered animation for research cards
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Staggered animation for AI research cards
    const aiResearchCards = document.querySelectorAll('.ai-research-card');
    aiResearchCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Staggered animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Copy contact information to clipboard
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(value => {
        // Skip if it's a link
        if (!value.classList.contains('contact-link')) {
            value.style.cursor = 'pointer';
            value.title = 'Click to copy';
            
            value.addEventListener('click', function() {
                const text = this.textContent.trim();
                
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyFeedback(this);
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                        document.execCommand('copy');
                        showCopyFeedback(this);
                    } catch (err) {
                        console.error('Failed to copy text: ', err);
                    }
                    
                    document.body.removeChild(textArea);
                }
            });
        }
    });
    
    function showCopyFeedback(element) {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = '#d4af37';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 1500);
    }
    
    // Subtle parallax effect for hero photo
    const hero = document.querySelector('.hero');
    const heroPhoto = document.querySelector('.photo-frame');
    
    if (hero && heroPhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.2;
            
            if (scrolled < hero.offsetHeight) {
                heroPhoto.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // Enhanced hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Enhanced hover effects for research links
    const researchLinks = document.querySelectorAll('.research-link');
    
    researchLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Professional page loading effect
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Smooth reveal for business card
    const businessCard = document.querySelector('.business-card');
    if (businessCard) {
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.3 });
        
        businessCard.style.transform = 'translateY(30px) scale(0.95)';
        businessCard.style.opacity = '0';
        businessCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(businessCard);
    }
    
    // Add subtle animation to gold accent elements
    const accentElements = document.querySelectorAll('.hero-accent-line, .business-card-accent');
    
    accentElements.forEach(element => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target === document.querySelector('.hero-accent-line') ? '60px' : '60px';
                }
            });
        }, { threshold: 0.5 });
        
        element.style.width = '0';
        element.style.transition = 'width 1s ease 0.3s';
        observer.observe(element);
    });
    
    // Professional photo hover effects
    const professionalPhoto = document.querySelector('.professional-photo');
    const professionalPhotoPlaceholder = document.querySelector('.professional-photo-placeholder');
    
    if (professionalPhoto) {
        professionalPhoto.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.05) contrast(1.02)';
        });
        
        professionalPhoto.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    }
    
    if (professionalPhotoPlaceholder) {
        professionalPhotoPlaceholder.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)';
        });
        
        professionalPhotoPlaceholder.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)';
        });
    }
    
    // Smooth transitions for research and AI research cards
    const allCards = document.querySelectorAll('.research-card, .ai-research-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #d4af37';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = '4px solid transparent';
        });
    });
    
    // Initialize active nav link on page load
    setTimeout(updateActiveNavLink, 100);
    
    // Add visual feedback for navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#d4af37';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
        });
    });
    
    // Enhanced professional animations for timeline
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timeline = entry.target;
                const items = timeline.querySelectorAll('.timeline-item');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s ease';
        });
        timelineObserver.observe(timeline);
    }
    
    // Professional reveal animations for skills
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item, .skill-tag');
                
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillItems = skillsSection.querySelectorAll('.skill-item, .skill-tag');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            item.style.transition = 'all 0.4s ease';
        });
        skillsObserver.observe(skillsSection);
    }
    
    // Add subtle hover effects to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
        });
    });
    
    // Professional loading state management
    function initializeApp() {
        // Ensure all sections are properly identified
        const sections = document.querySelectorAll('section[id]');
        console.log(`Initialized ${sections.length} sections for navigation`);
        
        // Verify navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        console.log(`Found ${navLinks.length} navigation links`);
        
        // Add smooth scroll behavior as CSS fallback
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Initialize professional photo elements
        const photo = document.querySelector('.professional-photo');
        const placeholder = document.querySelector('.professional-photo-placeholder');
        if (photo) {
            photo.style.transition = 'all 0.3s ease';
        }
        if (placeholder) {
            placeholder.style.transition = 'all 0.3s ease';
        }
    }
    
    // Call initialization
    initializeApp();
});

// Additional utility functions for enhanced UX
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

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.warn('Non-critical error occurred:', e.message);
});

// Smooth section transitions
function smoothSectionTransition() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize smooth transitions after DOM load
document.addEventListener('DOMContentLoaded', smoothSectionTransition);

// Professional photo rectangle display optimization
document.addEventListener('DOMContentLoaded', function() {
    // Ensure rectangular photo display is optimized
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        // Add additional professional styling
        photoFrame.style.background = 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)';
        
        // Ensure clean rectangular appearance
        const photoContainer = photoFrame.querySelector('.professional-photo-container');
        if (photoContainer) {
            photoContainer.style.borderRadius = '0';
            photoContainer.style.overflow = 'hidden';
        }
        
        // Professional hover effect for the frame
        photoFrame.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 30px 60px -12px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(212, 175, 55, 0.3)';
        });
        
        photoFrame.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(212, 175, 55, 0.2)';
        });
    }
});
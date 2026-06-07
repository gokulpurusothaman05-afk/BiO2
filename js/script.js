// ================================
// Preloader
// ================================
window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

// ================================
// Mobile Navigation
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ================================
// Sticky Header
// ================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================================
// Active Navigation Link on Scroll
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ================================
// Smooth Scrolling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ================================
// Typed Text Animation
// ================================
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const textArray = ['Welcome to Stackly', 'Innovating BioTech', 'Transforming Healthcare', 'Building the Future'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            speed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// ================================
// Particles.js Configuration
// ================================
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00d4ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ================================
// Countdown Timer
// ================================
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    // Set target date (60 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 60);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ================================
// Counter Animation (Stats)
// ================================
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.textContent = Math.ceil(count);
            setTimeout(updateCount, 10);
        } else {
            counter.textContent = target + '+';
        }
    };

    updateCount();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ================================
// AOS (Animate On Scroll) Initialization
// ================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
}

// ================================
// GSAP Animations
// ================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.fromTo(card,
        {opacity:0, y:50},
        {
            opacity:1,
            y:0,
            duration:0.8,
            delay:index*0.1,
            scrollTrigger:{
                trigger:card,
                start:'top 85%'
            }
        }
    );
});

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
    });
}

// ================================
// Isotope (Research Filters)
// ================================
let isotopeInstance = null;

if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
    const grid = document.querySelector('.isotope-grid');
    
    if (grid) {
        // Initialize Isotope after images are loaded
        imagesLoaded(grid, function() {
            isotopeInstance = new Isotope(grid, {
                itemSelector: '.research-item',
                layoutMode: 'fitRows',
                transitionDuration: '0.8s'
            });
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                if (isotopeInstance) {
                    isotopeInstance.arrange({ filter: filterValue });
                }
            });
        });
    }
}

// ================================
// Magnific Popup (Image Gallery)
// ================================
if (typeof $.fn.magnificPopup !== 'undefined') {
    $('.research-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            titleSrc: function(item) {
                return item.el.closest('.research-item').find('h3').text();
            }
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });
}

// ================================
// Owl Carousel (Team Slider)
// ================================
if (typeof $.fn.owlCarousel !== 'undefined') {
    $('.team-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });
}

// ================================
// Slick Carousel (Testimonials)
// ================================
if (typeof $.fn.slick !== 'undefined') {
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
}

// ================================
// Bootstrap Select
// ================================
if (typeof $.fn.selectpicker !== 'undefined') {
    $('.bootstrap-select').selectpicker({
        style: 'btn-info',
        size: 4
    });
}

// ================================
// Form Validation
// ================================
if (typeof $.fn.validate !== 'undefined') {
    $('#contactForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                digits: true,
                minlength: 10
            },
            subject: {
                required: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Name must be at least 2 characters"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            phone: {
                digits: "Please enter only numbers",
                minlength: "Phone number must be at least 10 digits"
            },
            subject: {
                required: "Please select a subject"
            },
            message: {
                required: "Please enter your message",
                minlength: "Message must be at least 10 characters"
            }
        },
        errorPlacement: function(error, element) {
            error.addClass('text-danger');
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            return false;
        }
    });
}

// ================================
// Newsletter Form
// ================================
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
});

// ================================
// Scroll to Top Button
// ================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// CircleType (Circular Text)
// ================================
if (typeof CircleType !== 'undefined') {
    const circleElements = document.querySelectorAll('.circle-text');
    circleElements.forEach(element => {
        new CircleType(element);
    });
}

// ================================
// Lettering.js (Text Animation)
// ================================
if (typeof $.fn.lettering !== 'undefined') {
    $('.hero-title').lettering();
}

// ================================
// jQuery Appear (Trigger on Element Appear)
// ================================
if (typeof $.fn.appear !== 'undefined') {
    $('.stat-number').appear(function() {
        if (!$(this).hasClass('counted')) {
            animateCounter(this);
            $(this).addClass('counted');
        }
    });
}

// ================================
// Jarallax (Parallax)
// ================================
if (typeof jarallax !== 'undefined') {
    jarallax(document.querySelectorAll('.jarallax-container'), {
        speed: 0.5
    });
}

// ================================
// NoUiSlider (Range Slider Example)
// ================================
if (typeof noUiSlider !== 'undefined' && typeof wNumb !== 'undefined') {
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        noUiSlider.create(priceSlider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            },
            format: wNumb({
                decimals: 0
            })
        });
    }
}

// ================================
// jQuery UI Components
// ================================
if (typeof $.fn.datepicker !== 'undefined') {
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true
    });
}

// ================================
// Prevent External Link Errors (404 redirect)
// ================================
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (target && target.href && target.href.includes('404.html')) {
        e.preventDefault();
        window.location.href = '404.html';
    }
});

// ================================
// Loading Animation Enhancement
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});

// ================================
// Service Worker (Optional - for PWA)
// ================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ================================
// Performance Optimization
// ================================
// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ================================
// Console Welcome Message
// ================================
console.log('%c Welcome to Stackly BioTech! ', 'background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Innovating the Future of Biotechnology ', 'color: #00d4ff; font-size: 14px;');
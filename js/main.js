$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 // Offset for fixed header
            }, 800);
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Close mobile menu when clicking a link
    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    // Slider hover pause
    $('.carousel').hover(
        function() {
            $(this).carousel('pause');
        },
        function() {
            $(this).carousel('cycle');
        }
    );

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Parallax effect for slider
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.carousel-item img').css({
            'transform': 'translate3d(0, ' + (scrolled * 0.3) + 'px, 0)',
            'transition': 'transform 0.2s linear'
        });
    });

    // FAQ Expand/Collapse All
    $('#expandAll').click(function() {
        $('.accordion-collapse').collapse('show');
    });

    $('#collapseAll').click(function() {
        $('.accordion-collapse').collapse('hide');
    });

    // Add active class to current FAQ item
    $('.accordion-button').on('click', function() {
        $('.accordion-button').not(this).removeClass('active');
        $(this).toggleClass('active');
    });

    // Subscribe Form Handling
    $('#subscribeForm').on('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the data to your server
        // For demo purposes, we'll just show the success modal
        const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
        modal.show();
        
        // Reset form
        this.reset();
    });

    // Modal Animation
    $('#subscribeModal').on('show.bs.modal', function () {
        $(this).find('.modal-content').css('transform', 'scale(0.7)');
        setTimeout(() => {
            $(this).find('.modal-content').css({
                'transform': 'scale(1)',
                'transition': 'all 0.3s ease'
            });
        }, 50);
    });

    // Update the Client Carousel code
    const clientCarousel = {
        init: function() {
            this.carousel = $('.client-carousel');
            this.itemWidth = 230; // Width + gap
            this.scrollPosition = 0;
            this.bindEvents();
            this.startAutoScroll();
        },

        bindEvents: function() {
            $('.carousel-control.next').click(() => this.scroll('right'));
            $('.carousel-control.prev').click(() => this.scroll('left'));
            
            this.carousel.hover(
                () => this.stopAutoScroll(),
                () => this.startAutoScroll()
            );
        },

        scroll: function(direction) {
            const maxScroll = this.carousel[0].scrollWidth - this.carousel.width();
            
            if (direction === 'right') {
                if (this.scrollPosition >= maxScroll) {
                    this.scrollPosition = 0;
                    this.carousel.scrollLeft(0);
                } else {
                    this.scrollPosition = Math.min(this.scrollPosition + this.itemWidth, maxScroll);
                }
            } else {
                if (this.scrollPosition <= 0) {
                    this.scrollPosition = maxScroll;
                    this.carousel.scrollLeft(maxScroll);
                } else {
                    this.scrollPosition = Math.max(this.scrollPosition - this.itemWidth, 0);
                }
            }
            
            this.carousel.animate({ scrollLeft: this.scrollPosition }, 300);
        },

        startAutoScroll: function() {
            this.autoScrollInterval = setInterval(() => {
                this.scroll('right');
            }, 3000); // Change interval to 3 seconds for smoother auto-sliding
        },

        stopAutoScroll: function() {
            clearInterval(this.autoScrollInterval);
        }
    };

    // Initialize client carousel
    clientCarousel.init();

    // Back to Top Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Enhanced Smooth Scrolling
    const smoothScroll = (target, duration) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - 70; // Account for fixed header
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Apply smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target, 800);
            }
        });
    });
}); 
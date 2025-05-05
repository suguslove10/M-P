$(window).on("load", function () {
    "use strict";
    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');

    /*=========================================================================
        Custom Scrollbar
    =========================================================================*/
    $(".header-inner").mCustomScrollbar();

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({
            filter: filterValue
        });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'li', function () {
            $buttonGroup.find('.current').removeClass('current');
            $(this).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded(function () {
        $('.portfolio-wrapper').isotope({
            // options
            itemSelector: '[class*="col-"]',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '[class*="col-"]'
            }
        });
    });

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text(); // Number of pages

    $container.infinitescroll({
            itemSelector: '.grid-item',
            nextSelector: '.portfolio-pagination li a',
            navSelector: '.portfolio-pagination',
            extraScrollPx: 0,
            bufferPx: 0,
            maxPage: 6,
            loading: {
                finishedMsg: "No more works",
                msgText: '',
                speed: 'slow',
                selector: '.load-more',
            },
        },
        // trigger Masonry as a callback
        function (newElements) {

            var $newElems = $(newElements);
            $newElems.imagesLoaded(function () {
                $newElems.animate({
                    opacity: 1
                });
                $container.isotope('appended', $newElems);
            });

            // Check last page
            curPage++;
            if (curPage == pagesNum) {
                $('.load-more').remove();
            }

        });

    $container.infinitescroll('unbind');

    $('.load-more .btn').on('click', function () {
        $container.infinitescroll('retrieve');
        // display loading icon
        $('.load-more .btn i').css('display', 'inline-block');
        $('.load-more .btn i').addClass('fa-spin');

        $(document).ajaxStop(function () {
            setTimeout(function () {
                // hide loading icon
                $('.load-more .btn i').hide();
            }, 1000);
        });
        return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on('change', function () {
        // get filter value from option value
        var filterValue = this.value;
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });

    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to check system preference for first visit
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        // If user has explicitly set a theme, use that
        if (savedTheme) {
            return savedTheme;
        }
        // Otherwise, use system preference
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }

    // Set initial theme
    const currentTheme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }

    function switchTheme(e) {
        const isDark = e.target.checked;
        const theme = isDark ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Listen for changes in system color scheme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only update based on system preference if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            toggleSwitch.checked = e.matches;
        }
    });

    /*=========================================================================
     Typewriter
     =========================================================================*/

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

    /*=========================================================================
     Counter
     =========================================================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

});

$(document).ready(function () {

    "use strict";
    
    /*=========================================================================
     Slick Slider
     =========================================================================*/
    $('.testimonials-wrapper').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    });

});

$(function () {
    "use strict";
    
    /*=========================================================================
     Parallax layers
     =========================================================================*/
    if ($('.parallax').length > 0) {
        var scene = $('.parallax').get(0);
        var parallax = new Parallax(scene, {
            relativeInput: true,
        });
    }

    /*=========================================================================
     Menu
     =========================================================================*/
    $('.menu-icon button').on('click', function () {
        $('header.left').toggleClass('open');
        $('.mobile-header').toggleClass('push');
        $('.site-wrapper').toggleClass('push');
        $('.site-wrapper').addClass('overlay');
    });

    $('header.left .close').on('click', function () {
        $('header.left').removeClass('open');
        $('.mobile-header').removeClass('push');
        $('.site-wrapper').removeClass('push');
        $('.site-wrapper').removeClass('overlay');
    });

    // Menu item toggle
    $('.vertical-menu li.menu-item-has-children > a').on('click', function () {
        $(this).parent().toggleClass('opened');
        return false;
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.site-wrapper.overlay').length) {
            $('header.left').removeClass('open');
            $('.mobile-header').removeClass('push');
            $('.site-wrapper').removeClass('push');
            $('.site-wrapper').removeClass('overlay');
        }
    });
    
    /*=========================================================================
     One Page Scroll
     =========================================================================*/
    $('a[href^="#"]:not([href="#"]').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 800, 'easeInOutQuad');
        event.preventDefault();
    });
    
    /*=========================================================================
     Scrollspy
     =========================================================================*/
    $('body').scrollspy({
        target: '.scrollspy'
    });

    /*=========================================================================
     Progressbar animation
     =========================================================================*/
    function animateProgressBars() {
        $('.progress .progress-bar').each(function() {
            var progressBar = $(this);
            var value = progressBar.attr('aria-valuenow');
            
            var position = progressBar.offset().top;
            var windowHeight = $(window).height();
            var scrollPosition = $(window).scrollTop();
            
            // Check if element is in viewport
            if (position < (scrollPosition + windowHeight - 100)) {
                // Directly set the width based on the aria-valuenow attribute
                var valuePercent = value + '%';
                progressBar.css('width', valuePercent);
                
                // Also set the custom property on the parent for the circle
                progressBar.parent('.progress').css('--progress-width', valuePercent);
            }
        });
    }
    
    // Animate on scroll
    $(window).on('scroll', animateProgressBars);
    
    // Trigger on page load
    $(document).ready(function() {
        // Immediate execution
        animateProgressBars();
        
        // And again after a short delay to ensure DOM is ready
        setTimeout(animateProgressBars, 300);
    });

    /*=========================================================================
     Back to top
     =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 400);
    });
});

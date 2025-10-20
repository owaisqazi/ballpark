(function($) {
    "use strict";



    /*--------------------------
    preloader
    ---------------------------- */

    $(window).on('load', function() {
        var pre_loader = $('#preloader')
        pre_loader.fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // meanmenu
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });

    /*------------------------------------
     search option
    ------------------------------------- */

    $('.search-option').hide();
    $(".main-search").on('click', function() {
        $('.search-option').animate({
            height: 'toggle',
        });
    });

    /*---------------------
     TOP Menu Stick
    --------------------- */

    var windows = $(window);
    var sticky = $('#sticker');

    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 300) {
            sticky.removeClass('stick');
        } else {
            sticky.addClass('stick');
        }
    });

    /*--------------------------
     MagnificPopup
    ---------------------------- */

    $('.video-play').magnificPopup({
        type: 'iframe'
    });


    // counterUP
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    /*---------------------
     wow .js
    --------------------- */
    function wowAnimation() {
        new WOW({
            offset: 100,
            mobile: true
        }).init()
    }
    wowAnimation()

    /*--------------------------
     scrollUp
    ---------------------------- */

    $.scrollUp({
        scrollText: 'Scroll Top',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });


    // data - background
    $("[data-background]").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    })

    $("[data-bg-color]").each(function() {
        $(this).css("background", $(this).attr("data-bg-color"))
    })


    /*---------------------
      venobox
    --------------------- */
    var veno_box = $('.venobox');
    veno_box.venobox();

    // mainSlider
    function mainSlider() {
        var RocksSlider = $('.slider-active');
        RocksSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        RocksSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        RocksSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-right"></i></button>',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();

    /*----------------------------
     isotope active
    ------------------------------ */
    // portfolio start
    $(window).on("load", function() {
        var $container = $('.portfolio-content');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.portfolio-menu li a').on("click", function() {
            $('.portfolio-menu li a.active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
    //portfolio end


    /*--------------------------
         Project carousel
    ---------------------------- */
    var project_carousel = $('.project-carousel');
    project_carousel.owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        margin: 30,
        dots: false,
        center: true,
        navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    /*---------------------
     Testimonial carousel
    ---------------------*/

    var review = $('.testimonial-carousel');
    review.owlCarousel({
        loop: true,
        nav: true,
        margin: 30,
        center: true,
        navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
        dots: false,
        autoplay: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });
    /*---------------------
     Brand carousel
    ---------------------*/

    var brand = $('.brand-carousel');
    brand.owlCarousel({
        loop: true,
        nav: false,
        margin: 30,
        dots: true,
        autoplay: false,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            1000: {
                items: 5
            }
        }
    });



    /*--------------------------
         Project Details carousel 
    ---------------------------- */
    $('.project-carousel-2').owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        margin: 30,
        navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });





    //  Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath?.getTotalLength();
    progressPath?.style.transition = progressPath?.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function() {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })

    /*----------------------------
        Contact form
    ------------------------------ */
    $("#contactForm").on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var message = $("#message").val();


        $.ajax({
            type: "POST",
            url: "assets/contact.php",
            data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
            success: function(text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    /*----------------------------
        tilt 
    ------------------------------ */
    $('.tilt-img').tilt({
        perspective: 800,
        maxTilt: 20,
        glare: true,
        maxGlare: 0
    })


})(jQuery);
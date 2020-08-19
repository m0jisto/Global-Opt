window.addEventListener('DOMContentLoaded', function () {
    //Animation Navbar
    
    let link = document.querySelectorAll('.header__link');

    function liActive () {
        let timer = 1000;
        for (let i = 0; i < link.length; i++) {
            setTimeout( ()=>{
                link[i].classList.add('header__link_active');
                if (i != 0) {
                    link[i-1].classList.remove('header__link_active');
                }
            }, timer);
            timer += 250;
        }
        timer += 1000;
        for (let i = link.length - 1; i > 0; i--) {
            setTimeout( ()=> {
                link[i].classList.remove('header__link_active');
                if (i != 0) {
                    link[i-1].classList.add('header__link_active');
                }
                setTimeout(()=> {
                    link[0].classList.remove('header__link_active');
                }, 2500);
            }, timer);
            timer += 250;
        }
    }

    liActive();

    // Mask tel

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Sending data

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('.overlay').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //Close Modal Window

    $('.modal__close').on('click', function () {
        $('.overlay').fadeOut('slow');
    });

    //Slider

    let slideIndex = 1,
        indexP = 1,
        indexM = 1,
        slide1 = document.querySelectorAll('.reviews__item')[0],
        slide2 = document.querySelectorAll('.reviews__item')[1],
        slide3 = document.querySelectorAll('.reviews__item')[2],
        slides = document.querySelectorAll('.reviews__item'),
        prev = document.querySelector('.reviews__arrow-left'),
        next = document.querySelector('.reviews__arrow-right');

    function showSlides (n) {
        slides.forEach((item) => item.classList.add('reviews__item-min'));

        slides[slideIndex].classList.remove('reviews__item-min');
    }

    showSlides(slideIndex);

    function plusSlides () {
        slides[slideIndex+1].classList.remove('reviews__item-min');
        slides[slideIndex+1].classList.remove('reviews__item-min-1');
        slides[slideIndex+1].classList.remove('reviews__item-min-2');
        slides[slideIndex].classList.add('reviews__item-min');
        slides[slideIndex].classList.add('reviews__item-min-1');
        slides[slideIndex-1].classList.remove('reviews__item-min-1');
        slides[slideIndex-1].classList.add('reviews__item-min-2');
        if (indexP == 1) {
            indexM = 3;
            slides = [slide2, slide3, slide1];
        } if (indexP == 2) {
            indexM = 2;
            slides = [slide3, slide1, slide2];
        } if (indexP == 3) {
            indexM = 3;
            slides = [slide1, slide2, slide3];
            indexP = 0;
        }
        ++indexP;
    }

    function minusSlides () {
        slides[slideIndex-1].classList.remove('reviews__item-min');
        slides[slideIndex-1].classList.remove('reviews__item-min-1');
        slides[slideIndex-1].classList.remove('reviews__item-min-2');
        slides[slideIndex].classList.add('reviews__item-min');
        slides[slideIndex].classList.add('reviews__item-min-2');
        slides[slideIndex+1].classList.remove('reviews__item-min-2');
        slides[slideIndex+1].classList.add('reviews__item-min-1');
        if (indexM == 1) {
            indexP = 3;
            slides = [slide3, slide1, slide2];
        } if (indexM == 2 ) {
            indexP = 2;
            slides = [slide2, slide3, slide1];
        } if (indexM == 3) {
            indexP = 1;
            slides = [slide1, slide2, slide3];
            indexM = 0;
        }
        ++indexM;
    }
    next.addEventListener ('click', function () {
        plusSlides();
    });

    prev.addEventListener ('click', function () {
        minusSlides();
    });

    // Smooth scroll and pageup

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $(window).scroll(function (){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $(".btn-consultation").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $('#consultation').offset().top+"px"});
        $("body").css("overflow","hidden"); 
        animateBorder( 500, 1000);
        setTimeout(()=> {
            $("body").css("overflow","auto");
        }, 1500);
        return false;
    });

    function animateBorder(timeIn, timeOut) {
        setTimeout(()=> {
            $('.consultation__border').addClass('consultation__border-active');
        }, timeIn);
        setTimeout(()=> {
            $('.consultation__border').removeClass('consultation__border-active');
        }, timeOut);
    }

    $(".btn-questions").click(function(){
        $("html, body").animate({scrollTop: $('#questions').offset().top+"px"});
        $("body").css("overflow","hidden"); 
        setTimeout(()=> {
            $('input').addClass('input-active');
            $('textarea').addClass('textarea-active');
        }, 500);
        setTimeout(()=> {
            $('input').removeClass('input-active');
            $('textarea').removeClass('textarea-active');
        }, 1000);
        setTimeout(()=> {
            $("body").css("overflow","auto");
        }, 1500);
        return false;
    });

    $(".consultation__round").click(function(){
        animateBorder(0, 500);
    });
});
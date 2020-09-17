    //     //Preloader set fixed time
    setTimeout(function () {
    $(".loader-bg").fadeToggle();
},3000);


    // When the user scrolls down 10px from the top of the document, slide down the navbar


    $(document).ready(function() {
        $(window).scroll(function(event) {
            var pos_body = $('html,body').scrollTop();
            // console.log(pos_body);

            if(pos_body>220){
                $('.sticky-top-s').addClass('co-dinh-menu');
                document.getElementById("nav-head-s").style.background = "#f5f5f5";
                document.getElementById("nav-head-s").style.boxShadow = "0px 3px 9px 0px rgba(0,0,0,0.75)";
                document.getElementById("nav-pro").style.display = 'block';
            }
            else {
                $('.sticky-top-s').removeClass('co-dinh-menu');
                document.getElementById("nav-head-s").style.background = "none";
                document.getElementById("nav-head-s").style.boxShadow = "none";
                document.getElementById("nav-pro").style.display = "none";
            }
            // if (pos-pos_body>430){
            // 	document.getElementById('nav-pro').style.display = 'inline';
            // }else {
            // 	document.getElementById('nav-pro').style.display = 'none';
            // }
            // if (pos-pos_body>430){
            // 	document.getElementsByClassName('nav-head-s').style.boxShadow = '0px 3px 9px 0px rgba(0,0,0,0.75)';
            // }
            // if(pos_body>430){
            // 	$('.back-to-top').addClass('hien-ra');
            //
            // }
            // else{
            // 	$('.back-to-top').removeClass('hien-ra');
            // }
        });
        $('.back-to-top').click(function(event) {
            $('html,body').animate({
                    scrollTop: 0},
                1400);
        });
    });
    <!-- Initialize Swiper -->

    var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    direction: getDirection(),
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
    on: {
    resize: function () {
    swiper.changeDirection(getDirection());
}
}
});

    function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}



    //     //Preloader set fixed time
    setTimeout(function () {
        $(".loader-bg").fadeToggle();
    },3000);


    // When the user scrolls down 10px from the top of the document, slide down the navbar
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            document.getElementById("nav-head-s").style.background = "#FFFFFF";
        } else {
            document.getElementById("nav-head-s").style.background = "none";
        }
    }


    <!-- Initialize Swiper -->

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        direction: getDirection(),
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            resize: function () {
                swiper.changeDirection(getDirection());
            }
        }
    });

    function getDirection() {
        var windowWidth = window.innerWidth;
        var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

        return direction;
    }





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





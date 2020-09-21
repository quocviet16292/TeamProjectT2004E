//     //Preloader set fixed time
setTimeout(function () {
  $(".loader-bg").fadeToggle();
},3000);

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





<!-- Initialize Swiper -->



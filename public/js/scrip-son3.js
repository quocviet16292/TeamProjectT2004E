$(document).ready(function() {
    $("#lightSliders3").lightSlider({
        item: 2,
        autoWidth: false,
        dots:true,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 20,

        addClass: '',
        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////

        speed: 600, //ms'
        auto: true,
        loop: true,
        slideEndAnimation: true,
        pause: 6000,

        keyPress: true,
        controls: false,
        prevHtml: '<i class=\'far fa-arrow-alt-circle-left\' style=\'font-size:36px;\'></i>',
        nextHtml: '<i class=\'far fa-arrow-alt-circle-right\' style=\'font-size:36px;\'></i>',

        rtl:false,
        adaptiveHeight:false,

        vertical:false,
        verticalHeight:500,
        vThumbWidth:100,

        thumbItem:10,
        pager: false,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch:true,
        enableDrag:true,
        freeMove:true,
        swipeThreshold: 40,

        responsive : [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {},
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {},
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
    });
});
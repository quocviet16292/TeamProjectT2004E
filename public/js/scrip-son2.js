
$(document).ready(function() {
    $(window).scroll(function(event) {
        var pos_body = $('html,body').scrollTop();
        // console.log(pos_body);

        if(pos_body>271){
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

    });
    $('.back-to-top').click(function(event) {
        $('html,body').animate({
                scrollTop: 0},
            1400);
    });
});
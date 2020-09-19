"use strict";
//
let map;
const hanoi = {
    lat: 21.0206584,
    lng: 105.8154739
};


class CenterControl {
    constructor(controlDiv, map, center) {
        this.map_ = map; // Set the center property upon construction

        this.center_ = new google.maps.LatLng(center);
        controlDiv.style.clear = "both"; // Set CSS for the control border

        const goCenterUI = document.createElement("div");
        goCenterUI.id = "goCenterUI";
        goCenterUI.title = "Click to recenter the map";
        controlDiv.appendChild(goCenterUI); // Set CSS for the control interior

        const goCenterText = document.createElement("div");
        goCenterText.id = "goCenterText";
        goCenterText.innerHTML = "Center Map";
        goCenterUI.appendChild(goCenterText); // Set CSS for the setCenter control border

        const setCenterUI = document.createElement("div");
        setCenterUI.id = "setCenterUI";
        setCenterUI.title = "Click to change the center of the map";
        controlDiv.appendChild(setCenterUI); // Set CSS for the control interior

        const setCenterText = document.createElement("div");
        setCenterText.id = "setCenterText";
        setCenterText.innerHTML = "Set Center";
        setCenterUI.appendChild(setCenterText); // Set up the click event listener for 'Center Map': Set the center of
        // the map
        // to the current center of the control.

        goCenterUI.addEventListener("click", () => {
            const currentCenter = this.center_;
            this.map_.setCenter(currentCenter);
        }); // Set up the click event listener for 'Set Center': Set the center of
        // the control to the current center of the map.

        setCenterUI.addEventListener("click", () => {
            const newCenter = this.map_.getCenter();
            this.center_ = newCenter;
        });
    }
}

function initMap() {
    var locations = [
        ['FPT ApTech Beaty <br>Số 8 Tôn Thất Thuyết,Cầu Giấy Hà Nội<br> Phone:097 311 10 86<br>' +
        '<a href="#">Email:aptech.hn@fpt.edu.vn</a><br><a href="https://aptech.fpt.edu.vn/">https://aptech.fpt.edu.vn/</a>',
            21.0287993,
            105.7805116,
            1],
        ['Austin <br>Số 776 Đường La Thành,Giảng Võ,Đống Đa,Hà Nội<br> Phone:087662112 <br> Email:austin@gmail.com',
            21.0236644,
            105.8160161,
            2],
        ['Lena <br>Số 776 Đường La Thành,Giảng Võ,Đống Đa,Hà Nội<br> Phone:089052612 <br> Email:lena@gmail.com',
            21.0240644,
            105.8160161,
            3],
        ['Lilly <br>Số 7A Lê Văn Lương,Thanh Xuân,Hà Nội<br> Phone:089052612 <br> Email:lilly@gmail.com',
            21.014566,
            105.799438,
            4],
        ['Zed <br>Số 7A Lê Văn Lương,Thanh Xuân,Hà Nội<br> Phone:089045612 <br> Email:zedd@gmail.com',
            21.015566,
            105.799438,
            5],
            ['July <br>1st New York Wall Street<br> Phone:089776520<br> Email:jyly@yahoo.com ',
                21.037161,
                105.836231,
            6],
        ['Yui <br>Số 260 Láng,Đống Đa, Hà Nội<br> Phone:097455520 <br> Email:yui@yahoo.com',
            21.0115427,105.8023023,
            7],
        ['Jett <br>3 Nguyễn Chí Thanh,Đống Đa,Hà Nội<br> Phone:096677901 <br> Email:jet123@gmail.com',
            21.0298057,105.8108723,
            8],
        ['Hung <br>34 Đê La Thành, Đống Đa, Hà Nội<br> Phone:0923654901 <br> Email:hung1435@gmail.com',
            21.0193193,105.8273633,
            9],
        ['Tiff <br>31 Nguyễn Chí Thanh,Đống Đa,Hà Nội<br> Phone:09688901 <br> Email:tif223@gmail.com',
            21.0259065,105.8093241,
            10],
        ['Hamman <br>684 Đường Lạc Long Quân,Tây Hồ, Hà Nội<br> Phone:096557901 <br> Email:Hamman@gmail.com',
            21.0789792,
            105.8142507,
            11],
            ['Jay <br>10 Đường Quang Trung,Hà Đông, Hà Nội<br> Phone:098677901 <br> Email:jay123@gmail.com',
            20.972129,105.7743866,
            12],
        ['Janet <br>564 Trần Cung, Cổ Nhuế 1, Từ Liêm, Hà Nội<br> Phone:088677901 <br> Email:janet123@gmail.com',
            21.0585609,105.7810829,
            13],
        ['Jolie <br>199, Cầu Diễn, Từ Liêm, Hà Nội<br> Phone:076677901 <br> Email:jolie423@gmail.com',
            21.0395272,105.7613324,
            14],
        ['Trang Sun <br>193 Thụy Khuê, Thuỵ Khuê, Ba Đình, Hà Nội<br> Phone:04368868669 <br> Email:trangsun@gmail.com',
            21.043411,105.8184922,
            15],
        ['Mai Đỗ <br>193 Xuân Thủy, Cầu Giấy, Hà Nội<br> Phone:0475886669 <br> Email:maido@gmail.com',
            21.0364622,105.7822073,
            16],
        ['Hà Nguyễn <br>23 Xã Đàn, Hà Nội, Hà Nội<br> Phone:0426286869 <br> Email:hanguyen@gmail.com',
            21.011407,105.834338,
            17],
        ['Ngọc Dung <br>12 Trung Văn, Trung Văn, Nam Từ Liêm, Hà Nội<br> Phone:0436886866 <br> Email:NgocDung@gmail.com',
            20.9925093,105.7725089,
            18],
        ['HariWon <br>36 Xuân La,Xuân Đỉnh,Bắc Từ Liêm,Hà Nội<br> Phone:0458868669 <br> Email:hariwon@gmail.com',
            21.0656443,105.8049326,
            19],

        ['Hồ Ngọc Hà <br>16 Đinh Tiên Hoàng,Hoàn Kiếm,Hà Nội<br> Phone:0422868669 <br> Email:ngocha@gmail.com',
            21.0316633,105.8508944,
            20],
        ['Mỹ Tâm <br>458 Minh Khai,Hai Bà Trưng Hà Nội<br> Phone:0436888669 <br> Email:mytam@gmail.com',
            20.9963402,105.8663328,
            21],
        ['Phương Thanh <br>Số 1 Phạm Ngọc Thạch,Đống Đa,Hà Nội<br> Phone:0421868669 <br> Email:phuongthanh@gmail.com',
            21.0061088,105.829511,
            22],
        ['Ngọc Trinh <br>87 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội<br> Phone:0475886669 <br> Email:ngoctrinh@gmail.com',
            21.0255701,105.8402693,
            23],
        ['Mai Phương Thúy <br>96 Lò Đúc, Hai Bà Trưng, Hà Nội<br> Phone:0420868669 <br> Email:maithuy@gmail.com',
            21.0142557,105.8549944,
            24],
        ['Ngọc Trinh <br>Số 3 Lê Trọng Tấn,Thanh Xuân,Hà Nội<br> Phone:0430286866 <br> Email:ngoctrinh@gmail.com',
            20.992324,105.8302243,
            25],
        ['Ngọc Huyền <br>Royal City, Thanh Xuân, Hà Nội<br> Phone:0451218669 <br> Email:Ngochuyen@gmail.com',
            21.000701,105.8137823,
            26],

        ['Đinh Hương <br>Số 10 Chùa Bộc,Đống Đa,Hà nội<br> Phone:0426286869 <br> Email:dinhhuong@gmail.com',
            21.007205,105.8298683,
            27],
        ['Thiên Hương <br>48 Phố Nguyễn Văn Trỗi, Thanh Xuân, Hà Nội<br> Phone:07799668669 <br> Email:thienhuong@gmail.com',
            20.987253,105.8353573,
            28],
        [' Khánh vân <br>96 Thanh Nhàn, Hai Bà Trưng, Hà Nội<br> Phone:0924648837 <br> Email:khanhvan@gmail.com',
            21.0031916,105.8500923,
            29],
        ['khanh thi <br>25 Trương Định, Hai Bà Trưng, Hà Nội<br> Phone:09022868669 <br> Email:khanhvan@gmail.com',
            20.995126,105.8477129,
            30],
        ['Thùy Chi <br>Tân Mai, Hoàng Mai, Hà Nội<br> Phone:0913688869 <br> Email:thuychi@gmail.com',
            20.9827253,105.8451498,
            31],
        ['Đinh Ngọc<br>87 Đường Láng, Đống Đa, Hà Nội<br> Phone:0931868669 <br> Email:dinhngoc24@gmail.com',
            21.009694,105.8144663,
            32],
        ['Hoàng Lan<br>48 Nguyễn Văn Lộc, Hà Đông, Hà Nội<br> Phone:0975886669 <br> Email:hoanglan@gmail.com',
            20.9853688,105.7835707,
            33],
        ['Đinh Thi<br>106 Hoàng Quốc Việt,Cầu Giấy, Hà Nội<br> Phone:0950868669 <br> Email:dinhthi@gmail.com',
            21.0466634,105.792994,
            34],
        ['Lại Văn Sâm <br>155 Đường Cầu Giấy, Cầu Giấy, Hà Nội<br> Phone:0986868686 <br> Email:anhsam@gmail.com',
            21.0321874,105.7966828,
            35],
        ['Lan Anh <br>Dịch Vọng, Cầu Giấy, Hà Nội<br> Phone:0451218669 <br> Email:Ngochuyen@gmail.com',
            21.0343171,105.7844018,
            36],
    ];

        map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: hanoi
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

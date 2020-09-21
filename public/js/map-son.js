
"use strict";

let places;
let infoWindow;
let markers = [];
let autocomplete;
const countryRestrict = {
    country: "dd"
};
//
let map;
const hanoi = {
    lat: 21.0206584,
    lng: 105.8154739
};
const MARKER_PATH =
    "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");
const countries = {
    hk: {
        center: {
            lat: 21.0290577,
            lng: 105.8550587
        },
        zoom: 14
    },
    hbt: {
        center: {
            lat: 21.0053422,
            lng: 105.8617469
        },
        zoom: 14
    },
    hm: {
        center: {
            lat: 20.9801965,
            lng: 105.8631932
        },
        zoom: 14
    },
    dd: {
        center: {
            lat: 21.0160073,
            lng: 105.8275452
        },
        zoom: 14
    },
    bd: {
        center: {
            lat: 21.0385636,
            lng: 105.8214208
        },
        zoom: 14
    },
    hd: {
        center: {
            lat: 20.9780493,
            lng: 105.7792479
        },
        zoom: 14
    },
    cg: {
        center: {
            lat: 21.0172319,
            lng: 105.7981777
        },
        zoom: 14
    },
    btl: {
        center: {
            lat: 21.0384692,
            lng: 105.7674704
        },
        zoom: 14
    },
    ntl: {
        center: {
            lat: 20.9941897,
            lng: 105.7632687
        },
        zoom: 14
    },
    th: {
        center: {
            lat: 21.0684579,
            lng: 105.8370065
        },
        zoom: 14
    },
    tx: {
        center: {
            lat: 20.9950321,
            lng: 105.7996268
        },
        zoom: 13
    },
};

function initMap() {


    var locations = [
        ['FPT ApTech Beaty <br>Số 8 Tôn Thất Thuyết,Cầu Giấy Hà Nội<br> Phone:097 311 10 86<br>' +
        '<a href="#">Email:aptech.hn@fpt.edu.vn</a><br><a href="https://aptech.fpt.edu.vn/">https://aptech.fpt.edu.vn/</a>',
            21.0287993,
            105.7805116,
            1],
        ['Austin <br>Số 776 Đường La Thành,Giảng Võ,Đống Đa,Hà Nội<br> Phone:087662112 <br>Email: <a href="#">austin@gmail.com</a> <br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/1" target="_blank">https://team-project-t2004e.herokuapp.com/service/1</a>',
            21.0236644,
            105.8160161,
            2],
        ['Lena <br>Số 776 Đường La Thành,Giảng Võ,Đống Đa,Hà Nội<br> Phone:089052612 <br>Email: <a href="#">lena@gmail.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/2" target="_blank">https://team-project-t2004e.herokuapp.com/service/2</a>',
            21.0240644,
            105.8160161,
            3],
        ['Lilly <br>Số 7A Lê Văn Lương,Thanh Xuân,Hà Nội<br> Phone:089052612 <br>Email: <a href="#">lilly@gmail.com</a> <br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/3" target="_blank">https://team-project-t2004e.herokuapp.com/service/3</a>',
            21.014566,
            105.799438,
            4],
        ['Zed <br>Số 7A Lê Văn Lương,Thanh Xuân,Hà Nội<br> Phone:089045612 <br>Email: <a href="#">zedd@gmail.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/4" target="_blank">https://team-project-t2004e.herokuapp.com/service/4</a>',
            21.015566,
            105.799438,
            5],
        ['July <br>1st New York Wall Street<br> Phone:089776520 <br>Email: <a href="#">july@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/5" target="_blank">https://team-project-t2004e.herokuapp.com/service/5</a>',
            21.037161,
            105.836231,
            6],
        ['Yaoh <br>Số 260 Láng,Đống Đa, Hà Nội<br> Phone:097455520 <br>Email: <a href="#">yaoh@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/6" target="_blank">https://team-project-t2004e.herokuapp.com/service/6</a>',
            21.0115427,105.8023023,
            7],
        ['Yui <br>Số 68 Triều Khúc,Thanh Xuân, Hà Nội<br> Phone:097245520 <br>Email: <a href="#">yui@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/7" target="_blank">https://team-project-t2004e.herokuapp.com/service/7</a>',
            20.9817662,105.7963979,
            8],
        ['Yaolinh <br>90 Khâm Thiên,Đống Đa,Hà Nội<br> Phone:0996677901 <br>Email: <a href="#">yaolinh@yahoo.com</a><br>Links: <br><a href="https://team-project-t2004e.herokuapp.com/service/8" target="_blank">https://team-project-t2004e.herokuapp.com/service/8</a>',
            21.0298057,105.8108723,
            9],
        ['Jett <br>3 Nguyễn Chí Thanh,Đống Đa,Hà Nội<br> Phone:096677901 <br>Email: <a href="#">jet123@yahoo.com</a><br>Links: <br><a href="https://team-project-t2004e.herokuapp.com/service/9" target="_blank">https://team-project-t2004e.herokuapp.com/service/9</a>',
            21.0298057,105.8108723,
            10],
        ['Hung <br>34 Đê La Thành, Đống Đa, Hà Nội<br> Phone:0923654901 <br>Email: <a href="#">hung1435@yahoo.com</a><br><a href="https://team-project-t2004e.herokuapp.com/service/10" target="_blank">https://team-project-t2004e.herokuapp.com/service/10</a>',
            21.0193193,105.8273633,
            11],
        ['Tiff <br>31 Nguyễn Chí Thanh,Đống Đa,Hà Nội<br> Phone:09688901 <br>Email: <a href="#">tif223@yahoo.com</a>Links: <br><a href="https://team-project-t2004e.herokuapp.com/service/11" target="_blank">https://team-project-t2004e.herokuapp.com/service/11</a>',
            21.0259065,105.8093241,
            12],
        ['Hamman <br>684 Đường Lạc Long Quân,Tây Hồ, Hà Nội<br> Phone:096557901 <br>Email: <a href="#">hamman@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/12" target="_blank">https://team-project-t2004e.herokuapp.com/service/12</a>',
            21.0789792,
            105.8142507,
            13],
        ['Jay <br>10 Đường Quang Trung,Hà Đông, Hà Nội<br> Phone:098677901 <br>Email: <a href="#">jay123@yahoo.com</a><br>Links:<a href="https://team-project-t2004e.herokuapp.com/service/13" target="_blank">https://team-project-t2004e.herokuapp.com/service/13</a>',
            20.972129,105.7743866,
            14],
        ['Janet <br>564 Trần Cung, Cổ Nhuế 1, Từ Liêm, Hà Nội<br> Phone:088677901 <br>Email: <a href="#">janet123@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/14" target="_blank">https://team-project-t2004e.herokuapp.com/service/14</a>',
            21.0585609,105.7810829,
            15],
        ['Jolie <br>199, Cầu Diễn, Từ Liêm, Hà Nội<br> Phone:076677901 <br>Email: <a href="#">jolie423@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/15" target="_blank">https://team-project-t2004e.herokuapp.com/service/15</a>',
            21.0395272,105.7613324,
            16],
        ['Trang Sun <br>193 Thụy Khuê, Thuỵ Khuê, Ba Đình, Hà Nội<br> Phone:04368868669 <br>Email: <a href="#">trangsun@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/16" target="_blank">https://team-project-t2004e.herokuapp.com/service/16</a>',
            21.043411,105.8184922,
            17],
        ['Mai Đỗ <br>193 Xuân Thủy, Cầu Giấy, Hà Nội<br> Phone:0475886669 <br>Email: <a href="#">maido@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/17" target="_blank">https://team-project-t2004e.herokuapp.com/service/17</a>',
            21.0364622,105.7822073,
            18],
        ['Hà Nguyễn <br>23 Xã Đàn, Hà Nội, Hà Nội<br> Phone:0426286869 <br>Email: <a href="#">hanguyen@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/18" target="_blank">https://team-project-t2004e.herokuapp.com/service/18</a>',
            21.011407,105.834338,
            19],
        ['Ngọc Dung <br>12 Trung Văn, Trung Văn, Nam Từ Liêm, Hà Nội<br> Phone:0436886866 <br>Email: <a href="#">dungngoc@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/19" target="_blank">https://team-project-t2004e.herokuapp.com/service/19</a>',
            20.9925093,105.7725089,
            20],
        ['HariWon <br>36 Xuân La,Xuân Đỉnh,Bắc Từ Liêm,Hà Nội<br> Phone:0458868669 <br>Email: <a href="#">hariwon@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/20" target="_blank">https://team-project-t2004e.herokuapp.com/service/20</a>',
            21.0656443,105.8049326,
            21],

        ['Hồ Ngọc Hà <br>16 Đinh Tiên Hoàng,Hoàn Kiếm,Hà Nội<br> Phone:0422868669 <br>Email: <a href="#">hongocha@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/21" target="_blank">https://team-project-t2004e.herokuapp.com/service/21</a>',
            21.0316633,105.8508944,
            22],
        ['Mỹ Tâm <br>458 Minh Khai,Hai Bà Trưng Hà Nội<br> Phone:0436888669 <br>Email: <a href="#">mytam@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/22" target="_blank">https://team-project-t2004e.herokuapp.com/service/22</a>',
            20.9963402,105.8663328,
            23],
        ['Phương Thanh <br>Số 1 Phạm Ngọc Thạch,Đống Đa,Hà Nội<br> Phone:0421868669 <br>Email: <a href="#">phuongthanh@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/23" target="_blank">https://team-project-t2004e.herokuapp.com/service/23</a>',
            21.0061088,105.829511,
            24],
        ['Ngọc Trinh <br>87 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội<br> Phone:0475886669 <br>Email: <a href="#">ngoctrinh@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/24" target="_blank">https://team-project-t2004e.herokuapp.com/service/24</a>',
            21.0255701,105.8402693,
            25],
        ['Mai Phương Thúy <br>96 Lò Đúc, Hai Bà Trưng, Hà Nội<br> Phone:0420868669 <br>Email: <a href="#">maiphuongthuy@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/25" target="_blank">https://team-project-t2004e.herokuapp.com/service/25</a>',
            21.0142557,105.8549944,
            26],
        ['Ngọc Trinh <br>Số 3 Lê Trọng Tấn,Thanh Xuân,Hà Nội<br> Phone:0430286866 <br>Email: <a href="#">ngoctrinhyahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/26" target="_blank">https://team-project-t2004e.herokuapp.com/service/26</a>',
            20.992324,105.8302243,
            27],
        ['Ngọc Huyền <br>Royal City, Thanh Xuân, Hà Nội<br> Phone:0451218669 <br>Email: <a href="#">ngochuyen@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/27" target="_blank">https://team-project-t2004e.herokuapp.com/service/27</a>',
            21.000701,105.8137823,
            28],

        ['Đinh Hương <br>Số 10 Chùa Bộc,Đống Đa,Hà nội<br> Phone:0426286869 <br>Email: <a href="#">dinhhuong@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/28" target="_blank">https://team-project-t2004e.herokuapp.com/service/28</a>',
            21.007205,105.8298683,
            29],
        ['Thiên Hương <br>48 Phố Nguyễn Văn Trỗi, Thanh Xuân, Hà Nội<br> Phone:07799668669 <br>Email: <a href="#">thienhuong@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/29" target="_blank">https://team-project-t2004e.herokuapp.com/service/29</a>',
            20.987253,105.8353573,
            30],
        ['khanh thi  <br>96 Thanh Nhàn, Hai Bà Trưng, Hà Nội<br> Phone:0924648837 <br>Email: <a href="#">khanhthi@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/30" target="_blank">https://team-project-t2004e.herokuapp.com/service/30</a>',
            21.0031916,105.8500923,
            31],
        ['Khánh vân <br>25 Trương Định, Hai Bà Trưng, Hà Nội<br> Phone:09022868669 <br>Email: <a href="#">khanhvan@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/31" target="_blank">https://team-project-t2004e.herokuapp.com/service/31</a>',
            20.995126,105.8477129,
            32],
        ['Thùy Chi <br>Tân Mai, Hoàng Mai, Hà Nội<br> Phone:0913688869 <br>Email: <a href="#">thuychi@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/32" target="_blank">https://team-project-t2004e.herokuapp.com/service/32</a>',
            20.9827253,105.8451498,
            33],
        ['Đinh Ngọc<br>87 Đường Láng, Đống Đa, Hà Nội<br> Phone:0931868669 <br>Email: <a href="#">dinhngoc@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/33" target="_blank">https://team-project-t2004e.herokuapp.com/service/33</a>',
            21.009694,105.8144663,
            34],
        ['Hoàng Lan<br>48 Nguyễn Văn Lộc, Hà Đông, Hà Nội<br> Phone:0975886669 <br>Email: <a href="#">hoanglan@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/34" target="_blank">https://team-project-t2004e.herokuapp.com/service/34</a>',
            20.9853688,105.7835707,
            35],
        ['Đinh Thi<br>106 Hoàng Quốc Việt,Cầu Giấy, Hà Nội<br> Phone:0950868669 <br>Email: <a href="#">dinhthi@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/35" target="_blank">https://team-project-t2004e.herokuapp.com/service/35</a>',
            21.0466634,105.792994,
            36],
        ['Lại Văn Sâm <br>155 Đường Cầu Giấy, Cầu Giấy, Hà Nội<br> Phone:0986868686 <br>Email: <a href="#">anhsam@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/37" target="_blank">https://team-project-t2004e.herokuapp.com/service/37</a>',
            21.0321874,105.7966828,
            37],
        ['Lan Anh <br>Dịch Vọng, Cầu Giấy, Hà Nội<br> Phone:0451218669 <br>Email: <a href="#">lanhanh@yahoo.com</a><br>Links: <a href="https://team-project-t2004e.herokuapp.com/service/36" target="_blank">https://team-project-t2004e.herokuapp.com/service/36</a>',
            21.0343171,105.7844018,
            38],
    ];
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: countries["dd"].zoom,
        center: countries["dd"].center,
        mapTypeControl: true,
        panControl: true,
        zoomControl: true,
        streetViewControl: true
    });
    var infowindow = new google.maps.InfoWindow();
    var  marker,i;
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


    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            types: ["(cities)"],
            componentRestrictions: countryRestrict
        }
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener("place_changed", onPlaceChanged); // Add a DOM event listener to react when the user selects a country.

    document
        .getElementById("country")
        .addEventListener("change", setAutocompleteCountry);

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); // Bias the SearchBox results towards current map's viewport.

    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = []; // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        } // Clear out the old markers.

        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = []; // For each place, get the icon, name and location.

        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            }; // Create a marker for each place.

            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location
                })
            );

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
} // When the user selects a city, get the place details for the city and
// zoom the map in on the city.

function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(12);
        search();
    } else {
        document.getElementById("autocomplete").placeholder = "Enter a city";
    }
} // Search for hotels in the selected city, within the viewport of the map.



function setAutocompleteCountry() {
    const country = document.getElementById("country").value;

    if (country == "all") {
        autocomplete.setComponentRestrictions({
            country: []
        });
        map.setCenter({
            lat: 21.0385636,
            lng: 105.8214208
        });
        map.setZoom(14);
    } else {
        autocomplete.setComponentRestrictions({
            country: country
        });
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
    }
    clearResults();
    clearMarkers();
}




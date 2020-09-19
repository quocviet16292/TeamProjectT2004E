// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 14,
//         center: hanoi
//     }); // Create the DIV to hold the control and call the CenterControl()
//     // constructor passing in this DIV.
//
//     const centerControlDiv = document.createElement("div");
//     const control = new CenterControl(centerControlDiv, map, hanoi);
//     centerControlDiv.index = 1;
//     centerControlDiv.style.paddingTop = "10px";
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(
//         centerControlDiv
//     );
//     var iconBase =
//         'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
//
//     var icons = {
//         library: {
//             icon: iconBase + 'library_maps.png'
//         }
//     };
//
//     var features = [
//         {
//             position: new google.maps.LatLng(, ),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.029926, 105.854181),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.044237, 105.845561),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.011340, 105.848796),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.003288, 105.851338),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.997320, 105.868144),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.004765, 105.845864),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.014827, 105.851542),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.017696, 105.843122),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.019437, 105.834668),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.012349, 105.837030),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.991392, 105.849052),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.986518, 105.852131),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.974144, 105.817302),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.960365, 105.802625),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.001120, 105.814734),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.994698, 105.806700),
//             type: 'library'
//         }
//         , {
//             position: new google.maps.LatLng(20.998515, 105.804276),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.990835, 105.789377),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.968718, 105.775057),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(20.985643, 105.781984),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.016129, 105.795425),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.008569, 105.803034),
//             type: 'library'
//         }
//         , {
//             position: new google.maps.LatLng(21.016500, 105.815689),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.020494, 105.818483),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.025766, 105.774680),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.031033, 105.789760),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.037111, 105.786388),
//             type: 'library'
//         }, {
//             position: new google.maps.LatLng(21.042534, 105.783599),
//             type: 'library'
//         }
//     ];
//     // const infowindow = new google.maps.InfoWindow();
//     // infowindow.setContent("<b>القاهرة</b>");
//     // const marker = new google.maps.Marker({
//     //     map,
//     //     position: cairo
//     // });
//     // marker.addListener("click", () => {
//     //     infowindow.open(map, marker);
//     // });
//     // Create markers.
//     for (var i = 0; i < features.length; i++) {
//         var marker = new google.maps.Marker({
//             position: features[i].position,
//             icon: icons[features[i].type].icon,
//             map: map
//         });
//     };
//
//
// }
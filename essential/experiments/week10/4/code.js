var lat;
var long;
var acc;
var zoom = 16;

function showPosition(position) {
    var coords = position.coords;
    lat = coords.latitude;
    lng = coords.longitude;
    acc = coords.accuracy;

    showMap();
}

function showMap() {
    var $mapWrapper = $(".mapWrapper");
    $mapWrapper.show();

    var mapWrapper = $mapWrapper[0];

    var newmap = new google.maps.Map(mapWrapper);
    newmap.setTilt(0);

    newmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    var latlng = new google.maps.LatLng(lat, lng);
    newmap.setCenter(latlng);

    while ((acc > 1000) && (zoom > 0)) {
        acc = acc / 2;
        zoom--;
    }

    newmap.setZoom(zoom);

    // set marker and info window
    var marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(newmap);

    var infowindow = new google.maps.InfoWindow({
        content: "You are here!"
    });

    infowindow.open(newmap, marker);
}


function initialize() {

    if (!navigator.geolocation) {
        $("#not").append("not");
        return;
    }

    navigator.geolocation.getCurrentPosition(showPosition);

    
}

$(initialize);
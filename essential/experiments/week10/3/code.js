var myCenter = new google.maps.LatLng(42.360379, -71.064756);

function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
        position: myCenter
        //animation: google.maps.Animation.BOUNCE
    });

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content: "Favorite Place 1"
    });

    infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);
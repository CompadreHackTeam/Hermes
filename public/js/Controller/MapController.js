/**
 * Created by pedro on 10/03/17.
 */

var eppcLocation = {lat: 39.4790059, lng: -6.3429654};
var customIcon = "./resources/nicholagity/minicholas.gif";
var map;
var markers = [];
var markerId = 0;
function initMap () {
    map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 17,
        center: getEpccLoc()
    });
    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
    });
    var marker = new google.maps.Marker({
        position: getEpccLoc(),
        map: map
    });
}


function updateMapWithNewData(data , destinationPoint){
    var markerPosition = new google.maps.LatLng(destinationPoint.lat, destinationPoint.lng);

    var marker = new google.maps.Marker({
        position: markerPosition,
        icon: customIcon,
        map: map,
        optimized:false, // <-- required for animated gif
        animation: google.maps.Animation.DROP
    });
    marker.id = markerId;
    markerId++;
    markers.push(marker);
}

function deleteMarker(id) {
    //Find and remove the marker from the Array
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
            //Remove the marker from Map
            markers[i].setMap(null);

            //Remove the marker from array.
            markers.splice(i, 1);
            return;
        }
    }
};





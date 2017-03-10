/**
 * Created by pedro on 10/03/17.
 */

var eppcLocation = {lat: 39.4790059, lng: -6.3429654};
var customIcon = "./resources/nicholagity/minicholas.gif";
var map;

function initMap () {
    map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 17,
        center: eppcLocation
    });
    var marker = new google.maps.Marker({
        position: eppcLocation,
        map: map
    });
};

function updateMapWithNewData(data , destinationPoint){
    var markerPosition = new google.maps.LatLng(destinationPoint.lat, destinationPoint.lng);
    console.log("POSTMERLIN: " + destinationPoint.lat + "    lng:" + destinationPoint.lng);

    //console.log("GEN<ERATING NEW MARKER AT: " + markerPosition.lat  +"   long:  " + markerPosition.lng);

    var marker = new google.maps.Marker({
        position: markerPosition,
        icon: customIcon,
        map: map,
        optimized:false, // <-- required for animated gif
        animation: google.maps.Animation.DROP
    });
}

function getEpccLocation(){
    return eppcLocation;
}




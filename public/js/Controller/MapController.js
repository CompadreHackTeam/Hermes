/**
 * Created by pedro on 10/03/17.
 */



var eppcLocation = {lat: 39.4790059, lng: -6.3429654};
var customIcon = "./resources/antenna.svg";
var map;
var markers = {};
var mapMarkers = [];
var markerId = 0;

$( document ).ready(function() {
    console.log("sdfsd");

    var icon = {
        url: customIcon,
        anchor: new google.maps.Point(25,50),
        scaledSize: new google.maps.Size(50,50)
    };

    map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 17,
        icon: icon,
        center: getEpccLoc()
    });

    /*var marker = new RichMarker({
        map: map,
        position:getEpccLoc(),
        draggable: true,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        content: '<div class="pin"></div><div class="pin-effect"></div>'
    });*/
    //timer = setInterval("setPos()",1000);


    var marker = new google.maps.Marker({
        position: getEpccLoc(),
        map: map
    });
});


function updateMapWithNewData(data , destinationPoint){
    var markerPosition = new google.maps.LatLng(destinationPoint.lat, destinationPoint.lng);

    /*var marker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        optimized:false,
        animation: google.maps.Animation.DROP
    });*/

    console.log("google marker: " + markerPosition);

    marker = new RichMarker({
        map: map,
        position: markerPosition,
        draggable: true,
        flat: true,
        anchor: RichMarkerPosition.MIDDLE,
        content: '<div class="pin"></div><div class="pin-effect"></div>'
    });

    marker.setPosition(markerPosition);


    //timer = setInterval("setPos()",1000);


    //marker.id = markerId;
  //  markerId++;
    markers[data.mac] = data.distance;
    marker.id = data.mac;
    mapMarkers.push(marker);
    console.log("marker: " + marker.id + " stored");
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

function getMarkersMap(){
    return markers;
}


function getMarkersArray(){
    return mapMarkers;
}

function setPos() {
    // console.log("index " + index);
    console.log(marker);
    if (index < positions_length){
        var latlng = new google.maps.LatLng(positions[index].lat, positions[index].lng);
        marker.setPosition(latlng);
        // map.setCenter(latlng);
        index ++;
    } else {
        clearInterval(timer);
    }
}

var RichMarkerPosition = {
    'TOP_LEFT': 1,
    'TOP': 2,
    'TOP_RIGHT': 3,
    'LEFT': 4,
    'MIDDLE': 5,
    'RIGHT': 6,
    'BOTTOM_LEFT': 7,
    'BOTTOM': 8,
    'BOTTOM_RIGHT': 9
};
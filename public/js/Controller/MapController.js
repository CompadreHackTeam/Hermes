/**
 * Created by pedro on 10/03/17.
 */

var eppcLocation = {lat: 39.4790059, lng: -6.3429654};


function initMap () {
    var map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 17,
        center: eppcLocation
    });
    var marker = new google.maps.Marker({
        position: eppcLocation,
        map: map
    });
};

function updateMapWithNewData(data , position){

    var markerPosition = position;//{lat: 39.4790059, lng: -6.3429654};

    var marker = new google.maps.Marker({
        position: eppcLocation,
        map: myMap
    });
}

function getEpccLocation(){
    return eppcLocation;
}




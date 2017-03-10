/**
 * Created by pedro on 10/03/17.
 */
function initMap () {
    var uluru = {lat: 39.4790059, lng: -6.3429654};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
};

function updateMapWithNewData(data){

}



/**
 * Created by pedro on 10/03/17.
 */

function updateMap(item){

    console.log("UPDATED");
    console.log(item);
    var position = calculatePosition(item.distance);
    updateMapWithNewData(item, position);
}

function calculatePosition(distance){
    var epccLocation = getEpccLocation;



    var pointA = epccLocation();
    var radiusInKm = 1;

    var pointB = pointA.destinationPoint(90, radiusInKm);

}


function merlinsFireball(){

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };

    Number.prototype.toDeg = function() {
        return this * 180 / Math.PI;
    };

    return google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
        dist = dist / 6371;
        brng = brng.toRad();

        var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                Math.cos(lat1),
                Math.cos(dist) - Math.sin(lat1) *
                Math.sin(lat2));

        if (isNaN(lat2) || isNaN(lon2)) return null;

        return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
    }
}
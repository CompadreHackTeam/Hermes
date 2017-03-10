
$(document).ready(function () {
    var socket = io.connect('hack4good17.cloudapp.net:3000', { 'forceNew': true });
    socket.on('packet', function(data) {
        updateMap(data);
    });
});
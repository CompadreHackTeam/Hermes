/**
 * Created by alberto.
 */
var socketInstance;


exports.init = function (socket){
    socketInstance = socket;
};

exports.packetEmiter = function (jsonPacket){
    if(socketInstance != undefined){
        socketInstance.emit('packet', jsonPacket);
    }
};


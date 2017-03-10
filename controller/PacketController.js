/**
 * Author: Alberto
 *
 * Packet model controller for server.
 */

var packetRepository    = require('./../repository/PacketRepository.js');
var config              = require('../server.properties');
var socketManager;

/**
 * Init, method that instantiate the socketManager
 * @param socket, socketManager instance
 */
exports.init = function(socket){
    socketManager = socket;
};

/**
 * storePacket
 * adds packet to mongoDB
 */
exports.storePacket = function (req, res){

    var fields = req.body;
    packetRepository.savePacket(fields, function (err, fields){
        if (err != null) {
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.writeHead(200, {'content-type': 'text/plain'});
            /** Publish packet in socket io */
            socketManager.packetEmiter(fields);
            res.end();
        }
    });
};

/**
 * returnPackets, returns all the packets of a client collection
 * @param req
 * @param res
 */
exports.returnPackets = function (req, res){

    packetRepository.findClientPackets(req.params.clientId, function(err, packets){
        if(err != null){
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(packets);
        }
    });

}
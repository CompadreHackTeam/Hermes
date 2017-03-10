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

};

/**
 * Returns the packets of a client filtered by multiple optional params.
 * @params
 *  - clientId
 *  - startHour, HH/MM/SS
 *  - finishHour,HH/MM/SS
 *  - radius
 * @param res
 */
exports.returnPacketsParametrized = function (req, res){

    var collectionName = 'client' + req.params.clientId;
    var params = req.params;

    // Day & startHour
    if(params.startHour != null && params.finishHour != null && params.radius == null){
        console.log("startHour" + params.startHour);
        packetRepository.findClientPacketsDate(collectionName, params.startHour, params.finishHour, function(err, packets) {
            if (err != null) {
                res.writeHead(400, {'content-type': 'text/plain'});
                res.write("Error: " + err);
                res.end();
            } else {
                res.send(packets);
            }
        });
    }else{
        // Day & startHour & finishHour & radius
        if(params.startHour != null && params.finishHour != null && params.radius != null){
            console.log("startHour " + params.startHour + " finishHour " + params.finishHour + " radius " + params.radius);
            packetRepository.findClientPacketsDateRadius(collectionName, params.startHour, params.finishHour, params.radius, function(err, packets) {
                if (err != null) {
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write("Error: " + err);
                    res.end();
                } else {
                    res.send(packets);
                }
            });
        }
    }
};
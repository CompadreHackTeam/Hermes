/**
 * Author: Alberto
 *
 * Packet repository for mongoDB
 */

var mongoose        = require('mongoose');
var PacketSchema    = require('.././model/Packet.js');

exports.savePacket = function(obj, callback){
    if(obj != null){

        var collectionName = 'client' +obj.clientId;

        var Packet = mongoose.model(collectionName, PacketSchema);
        var packet = new Packet({
            clientId    : obj.clientId,
            frequency   : obj.frequency,
            signal      : obj.signal,
            distance    : obj.distance,
            mac         : obj.mac,
            date        : obj.date
        });

        packet.save(function(err){
            if(err != null)
                callback(err, null);
            else{
                console.log("obj saved!");
                callback(null, packet);
            }
        })
    }else{
        callback(new Error(), obj);
    }
};

exports.findClientPackets = function(clientId, callback){

    var collectionName = 'client' + clientId;
    var clientCollection = mongoose.model(collectionName, PacketSchema);

    clientCollection.find({}, function(err, obj){
        if(err != null)
            callback(err, null);
        else
            callback(null, obj);
    }).select('-_id -__v'); /* Remove the _id and __v fields from the object */
};

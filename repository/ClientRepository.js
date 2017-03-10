/**
 * Created by Alberto.
 */
var mongoose    = require('mongoose');
var Client      = mongoose.model('client');
var PacketSchema    = require('.././model/Packet.js');

/**
 * stores a client in Client collection
 * @param obj, client fields
 * @param callback
 */
exports.saveClient = function(obj, callback){

    if(obj != null){

        var client = new Client({
            clientId    : obj.clientId,
            description : obj.description,
            latitude    : obj.latitude,
            longitude   : obj.longitude
        });
        client.save(function(err){
            if(err != null)
                callback(err, null);
            else
                callback(null, obj);
        })
    }else{
        callback(new Error(), null);
    }
};

/**
 * returns all clients stored in DB
 * @param callback
 */
exports.findClients = function(callback){

    Client.find({}, function(err, obj){
        if(err) callback(err, null);
        else{
            callback(null, obj);
        }
    }).select('-_id -__v'); /* Remove the _id and __v fields from the object */
};
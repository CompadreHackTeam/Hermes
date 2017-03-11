/**
 * Author: Alberto
 *
 * Packet repository for mongoDB
 */

var mongoose = require('mongoose');
var PacketSchema = require('.././model/Packet.js');

exports.savePacket = function (obj, callback) {
    if (obj != null) {

        var collectionName = 'client' + obj.clientId;

        var Packet = mongoose.model(collectionName, PacketSchema);
        var packet = new Packet({
            clientId: obj.clientId,
            frequency: obj.frequency,
            signal: obj.signal,
            distance: obj.distance,
            mac: obj.mac,
            date: obj.date
        });

        packet.save(function (err) {
            if (err != null)
                callback(err, null);
            else {
                console.log("obj saved!");
                callback(null, packet);
            }
        })
    } else {
        callback(new Error(), obj);
    }
};

exports.findClientPackets = function (clientId, callback) {

    var collectionName = 'client' + clientId;
    var clientCollection = mongoose.model(collectionName, PacketSchema);

    clientCollection.find({}, function (err, obj) {
        if (err != null)
            callback(err, null);
        else
            callback(null, obj);
    }).select('-_id -__v');
    /* Remove the _id and __v fields from the object */
};

exports.findClientPacketsDate = function (collectionName, startHour, finishHour, callback) {

    var clientCollection = mongoose.model(collectionName, PacketSchema);
    clientCollection.find({
        date: {
            '$gte': startHour,
            '$lt': finishHour
        }
    }, function (err, obj) {
        if (err != null)
            callback(err, null);
        else
            callback(null, obj);
    }).select('-_id -__v');
    /* Remove the _id and __v fields from the object */
};

exports.findClientPacketsDateRadius = function (collectionName, startHour, finishHour, radius, callback) {

    var clientCollection = mongoose.model(collectionName, PacketSchema);
    clientCollection.find({
        date: {
            '$gte': startHour,
            '$lt': finishHour
        },
        distance: {'$lt': radius}
    }, function (err, obj) {
        if (err != null)
            callback(err, null);
        else
            callback(null, obj);
    }).select('-_id -__v');
    /* Remove the _id and __v fields from the object */
};


exports.findPacketsByDate = function (collectionName, date, callback) {
    var arrayJsonObject = [];

    var clientCollection = mongoose.model(collectionName, PacketSchema);
    var plusHourDate = new Date(date);
    var nextDate = new Date(date);
    // first increment for nextDate
    nextDate.setHours(nextDate.getHours() + 1);
    console.log("actual date" + plusHourDate);
    console.log("next   date" + nextDate);


     iteratorSearch(24, plusHourDate, nextDate, arrayJsonObject, clientCollection, function(err,obj){

        callback(null, obj);

    });
};


function iteratorSearch(i, plusHourDate, nextDate, arrayJsonObject, clientCollection,callback) {
    var jsonObject = {};

    if (i == 0) {
        callback(null,arrayJsonObject);
    } else {
        //Hacer la primera consulta tal y como viene, luego se añade una hora en la siguiente iteracion
        clientCollection.distinct("mac",
            {
                "date": {
                    '$gte': plusHourDate,
                    '$lt': nextDate
                }
            }, function (err, obj) {
                if (err != null)
                    callback(err,null);
                else {
                    //concatenar al json magico
                    jsonObject.fhour = getWellTime(plusHourDate);
                    jsonObject.clients = obj.length;

                    arrayJsonObject.push(jsonObject);
                    console.log(jsonObject);

                    plusHourDate.setHours(plusHourDate.getHours() + 1);
                    nextDate.setHours(nextDate.getHours() + 1);

                    iteratorSearch(i - 1, plusHourDate, nextDate, arrayJsonObject, clientCollection,callback);
                }
            });
    }
}

/**
 * @return {string}
 */
function getWellTime(date) {
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return hours + ":" + minutes;
}
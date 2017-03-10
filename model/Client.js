/**
 * Created by Alberto on 23/02/17.
 *
 *  Client model for MongoDB in mongoose.Schema.
 *
 *  The purpose of this collection is register the clients that are sending data.
 */


var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Set up a mongoose model and pass it using module.exports
module.exports =  mongoose.model('client', new Schema({
    /* packetId (objectID) */
    clientId    :String,
    description :String,
    latitude    :Number,
    longitude   :Number
}));

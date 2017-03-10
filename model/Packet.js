/**
 * Created by alberto on 23/02/17.
 *
 *  PACKET model for MongoDB in mongoose.Schema
 */


var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Set up a mongoose model and pass it using module.exports
module.exports = new Schema({
    /* packetId (objectID) */
    clientId    :String,
    frequency   :String,
    signal      :String,
    distance    :String,
    mac         :String,
    date        :Date
});

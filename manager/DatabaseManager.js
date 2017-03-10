/**
 * Created by alberto
 *
 *  Database manager for connect with mongoDB
 */
var mongoose    = require('mongoose');
var config      = require('../server.properties');

/** Load mongoose model image */
var Packet      = require('../model/Packet');
var Client      = require('../model/Client');

module.exports = {
    connectDB: function(){
        //Create database connection
        mongoose.connect(config.mongodburi);

        //When successfully connected
        mongoose.connection.on('connected', function(){
            console.log('*** Connected to MongoDB on ' + config.mongodburi);
        });

        // If the connection throws an error
        mongoose.connection.on('error', function(err){
            console.log('*** Error connecting to MongoDB, ¿ Is the Mongo Daemon running ? (tip: $ps aux | grep mongod ), ERROR : ' + err);
        });
    }
};


/**
 * Created by Alberto.
 */

var clientRepository    = require('./../repository/ClientRepository.js');

exports.registerClient = function (req, res){

    var fields = req.body;

    clientRepository.saveClient(fields, function(err, fields){
        if(err != null){
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write(err);
            res.end();
        } else {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Client created : ' + fields.clientId);
            res.end();
        }
    })
};

exports.getClients = function(req, res){

    clientRepository.findClients(function(err, obj){
        if(err != null){
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write(err);
            res.end();
        } else{
            res.send(obj);
        }
    })
};


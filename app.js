var express             = require('express');
var app                 = express();
var controller          = express.Router();
var server              = require('http').createServer(app);
var io                  = require('socket.io')(server);
var bodyParser          = require('body-parser');
var socketManager       = require('./manager/SocketIOManager');
var config              = require('./server.properties');
var DatabaseManager     = require('./manager/DatabaseManager.js');

/** Create database connection and schemas */
DatabaseManager.connectDB();
var packetController    = require('./controller/PacketController');
var clientController    = require('./controller/ClientController');

/** SET UP SOCKET IO */
io.on('connection', function() {
    console.log('Somebody connected with Sockets');
});

/** Create the socketManager instance*/
socketManager.init(io);
/** SocketManager instance in packetController */
packetController.init(socketManager);

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(controller);

/** Add /api after port and before the methods of route*/
app.use('/api', controller);
app.use(express.static(__dirname + "/public/"));


/****************************
 *       API ROUTES         *
 ****************************/

/** Packets routes */
controller.route('/storePacket')
    .post(packetController.storePacket);
controller.route('/getClientData/:clientId')
    .get(packetController.returnPackets);
controller.route('/getClientDataParametrized/:clientId/:startHour?/:finishHour?/:radius?')
    .get(packetController.returnPacketsParametrized);
controller.route('/getPacketsByDate/:clientId/:date')
    .get(packetController.returnPacketsByDate);

/** Clients routes */
controller.route('/registerClient')
    .post(clientController.registerClient);
controller.route('/getClients')
    .get(clientController.getClients);

/** Start socket server */
server.listen(3000);

/** Start server */
app.listen(config.port, function () {
    console.log("*** Server Running on " + config.port);
});

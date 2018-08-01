const app= require('./app');
const server = require('./server');
const {nearestAgent,nearsetUser} = require('../src/controllers');
const io = require('socket.io').listen(server, {
    pingTimeout: 30000,
    pingInterval: 30000
});
io.on('connection', function (socket) {
    //Listen on the 'connection' event for incoming sockets
    console.log('A user just connected');

    socket.on('joinUser', function (data) {
        //Listen to any join event from connected users
        socket.join(data._id); //User joins a unique room/channel that's named after the userId
    });
    socket.on('joinAgent', function (data) {
        //Listen to any join event from connected users
        socket.join(data._id); //User joins a unique room/channel that's named after the userId
    });

    socket.on('request-help', function (eventData) {
        nearestAgent(eventData.location, function (results) {
            eventData.requestId = 11;
            results = JSON.parse(results);
            //3. After fetching nearest cops, fire a 'request-for-help' event to each of them
            for (var i = 0; i < results.length; i++) {
                io.sockets.in(results[i]._id).emit('user-need-help', eventData);
                console.log(results[i]._id);
            }
        });
    });
    socket.on('user-clear-way', function (eventData) {
        //Convert string to MongoDb's ObjectId data-type
        var requestId = new ObjectID(eventData.requestDetails.requestId);
        //For the request with requestId, update request details
        io.sockets.in(eventData.requestDetails.userId).emit('clear-way', eventData.copDetails);
    });
});

module.exports=io;
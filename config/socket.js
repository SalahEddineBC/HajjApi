const server = require('./server');
const { nearsetAgent, nearsetUser } = require('../src/controllers');
const io = require('socket.io').listen(server, {
  pingTimeout: 30000,
  pingInterval: 30000
});
io.on('connection', function(socket) {
  //Listen on the 'connection' event for incoming sockets
  socket.on('joinUser', function(data) {
    //Listen to any join event from connected users
    socket.join(data._id); //User joins a unique room/channel that's named after the userId
    console.log('user joined'+data._id);
  });
  socket.on('joinAgent', function(data) {
    //Listen to any join event from connected users
    socket.join(data._id); //User joins a unique room/channel that's named after the userId
    console.log('agent joined'+data._id);
  });

  socket.on('request-help', function(eventData) {
    nearsetAgent(eventData.location, function(results) {
      eventData.requestId = 11;
      results = JSON.parse(results);
      //3. After fetching nearest cops, fire a 'request-for-help' event to each of them
      for (var i = 0; i < results.length; i++) {
        io.sockets.in(results[i]._id).emit('user-need-help', eventData);
      }
    });
    nearsetUser(eventData.location, function(results) {
      eventData.requestId = 11;
      results = JSON.parse(results);
      //3. After fetching nearest cops, fire a 'request-for-help' event to each of them
      for (var i = 0; i < results.length; i++) {
        if (results[i]._id != eventData._id) {
          io.sockets.in(results[i]._id).emit('clear-the-way', eventData);
          console.log(results[i]._id + ' ' + eventData._id);
        }
      }
    });
  });
  socket.on('user-clear-way', function(eventData) {
    //Convert string to MongoDb's ObjectId data-type
    var requestId = new ObjectID(eventData.requestDetails.requestId);
    //For the request with requestId, update request details
    io.sockets
      .in(eventData.requestDetails.userId)
      .emit('clear-way', eventData.copDetails);
  });
});

module.exports = io;

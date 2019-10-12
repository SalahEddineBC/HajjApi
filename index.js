var app = require('./config/app');
var server =require('./config/server')
var router = require('./index.route');
var io = require('./config/socket');
var port = 3000;

//---------------------------------

app.use(router);
server.listen(port, ()=>{
  // Shows a message on which port is listening
  console.log('Express server listening on port ' + port);
});

//---------------------------------
module.exports = app;

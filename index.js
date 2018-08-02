var app = require('./config/app');
var server =require('./config/server')
var router = require('./index.route');
var io = require('./config/socket');
var port = 3000;
app.use(router);
server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
module.exports = app;

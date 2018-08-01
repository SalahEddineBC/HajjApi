var app = require('./config/app');
var router = require('./index.route');
var io = require('./config/socket');
var port = 3000;
app.use(router);
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
module.exports = app;

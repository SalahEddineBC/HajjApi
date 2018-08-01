const db = require('mongoose');
db.Promise = global.Promise
db.connect('mongodb://localhost:27017/HajjApi', { useNewUrlParser: true })
    .then(() => {
        console.log('mongoDB is connected...')
    })
    .catch((err) => {
        console.log('error'+err);
    })


module.exports = db;
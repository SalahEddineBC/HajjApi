const { User } = require('../models');

function nearsetUsers(coordinates, callback) {
  User.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [coordinates.latitude, coordinates.longitude]
        },
        $maxDistance: 150
      }
    }
  }).then(res => {
    callback(res);
  }).catch(e => console.error('this happend' + e));
}
module.exports = nearsetUsers;

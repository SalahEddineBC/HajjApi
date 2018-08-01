const { User } = require('../models');

function nearsetUsers(coordinates, callback) {
  console.log(coordinates);
  User.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [coordinates.latitude, coordinates.longitude]
        },
        $maxDistance: 300000
      }
    }
  }).then(res => {
    console.log(res);
    callback(JSON.stringify(res));
  });
}
module.exports = nearsetUsers;

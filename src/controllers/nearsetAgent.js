const {Agent}=require('../models');

function nearsetAgents(coordinates, callback) {
    Agent.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [coordinates.latitude, coordinates.longitude]
                },
                $maxDistance: 3000
            }
        }
    }).then(res => {
      callback(res);
    }).catch(e => console.error('this happend' + e));
}
module.exports = nearsetAgents;

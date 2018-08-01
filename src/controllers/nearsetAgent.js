const {Agent}=require('../models');

function nearsetAgents(coordinates, callback) {
    console.log(coordinates);
    Agent.find({
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
module.exports = nearsetAgents;

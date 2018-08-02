const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  name:
  {
    type:String
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    address: String,
    coordinates: [Number]
  }
});
Schema.index({ location: '2dsphere' });
module.exports = mongoose.model('Agent', Schema);

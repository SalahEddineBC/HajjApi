const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  PersonalID: {
    type: String,
    required: true,
    unique: true
  },
  CountryCode: {
    type: String,
    required: true
  },
  Hotel: {
    type: 'String',
    required: true
  },
  sicknesses: [mongoose.Schema.Types.ObjectId],
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    address: String,
    coordinates: [Number]
  }
});
UserSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', UserSchema);

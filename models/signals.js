// Load required packages
const mongoose = require('mongoose');

const unixTimestamp = require('mongoose-unix-timestamp-plugin');

// Define our signal schema

const SignalSchema   = new mongoose.Schema({
  
  srcSys: String,
  name: String,
  val: Number,
  unit: String,
  status: String
  
});

SignalSchema.plugin(unixTimestamp);

// Export the Mongoose model
module.exports = mongoose.model('Signal', SignalSchema);




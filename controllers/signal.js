// Load required packages
var Signal = require('../models/signals');

// Create endpoint /api/signals for POSTS
exports.postSignals = function(req, res) {
  // Create a new instance of the Beer model
  var signal = new Signal();

  // Set the signal properties that came from the POST data
  signal.srcSys = req.body.srcSys;
  signal.name = req.body.name;
  signal.val = req.body.val;
  signal.unit = req.body.unit;
  signal.status = req.body.status;

  // Save the signal and check for errors
  signal.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'signal data', data: signal });
  });
};

// Create endpoint /api/signals for GET
exports.getSignals = function(req, res) {
  // Use the Beer model to find all beer
  Signal.find(function(err, signal) {
    if (err)
      res.send(err);

    res.json(signal);
  });
};


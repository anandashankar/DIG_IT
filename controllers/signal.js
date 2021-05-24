// Load required packages
var Signal = require('../models/signals');

// Create endpoint /api/signals for POSTS
exports.postSignals = function(req, res) {
  // Create a new instance of the Beer model
  
  //craete a list of dictionaries 
  //in mongo this could be done with the help of insertMany() function
  // check the documentation here:
  //https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/ 

  //check out some trials done before
  //creating new fake route for testing
  /*
const fakeRoute = router.route('/console/fake');
fakeRoute.post(function(req, res){
  const fake = new Fake({
  	signals: [{
  				ts: req.body.ts,
  				srcSys: req.body.srcSys,
  				name: req.body.name,
  				val: req.body.val,
  				unit: req.body.unit,
  				status:  req.body.status
  			}]
  	});	

fake.signals.push(fake); 
*/
  //OR

  /*
/*
async function run() {
  try {
    await client.connect();
    const database = client.db("testGW");
    const collection = database.collection("fakes");
    // create an array of documents to insert
    const docs = [fake] 
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
console.log("done!!");
*/
  */
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


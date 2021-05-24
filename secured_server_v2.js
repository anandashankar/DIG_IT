//this is the secured server created for testing and querying the /api/console/fake route
//this is not the final server
//please refer to server.js for details

const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Fake = require('./models/fake_v2');
//to avoid mongoose promise error
mongoose.Promise = global.Promise;

const { MongoClient } = require("mongodb");

const app = express();

// Use the body-parser package in the application
app.use(bodyParser.urlencoded({
  extended: true
}));

//morgan library
app.use(morgan('dev'));

//body parser
app.use(bodyParser.json());

//creating an express Router named router
const router = express.Router(); 

// Use environment defined port or 8080
const port = process.env.PORT || 8080;

//create aerver
const server = https.createServer({key: key, cert: cert }, app);

const id = 02657154;

// Connect to the tapodata MongoDB database
mongoose.connect('mongodb://localhost:27017/testGW');

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017/testGW"; 
const client = new MongoClient(uri);

router.get('/', function(req, res) {
  res.json({ message: 'secure API server created' });
});

router.get('/machineID', function(req, res) {
  res.json({ message: 'machineID:', id });
});

//creating new fake route for testing
const fakeRoute = router.route('/machineID/fake');
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

  fake.save(function(err){
    if (err)
      res.send(err);
    res.json({ message: 'Fake data', data: fake });
  });
});

//creating fake end point
fakeRoute.get(function(req, res){
  Fake.find(function(err, fake){
    if(err)
      res.send(err);
    res.json(fake);
  });
});

/***********listening at port = port*******************/
app.use('/api', router);
// Start the server
server.listen(port, () => { console.log('secure API server created') });


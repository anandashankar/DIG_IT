// Get the packages we need
const express = require('express');

//require https
const https = require('https');

//https request logger
const morgan = require('morgan'); 

//connect the signal controller
const signalController = require('./controllers/signal');

//connect the user controller
const userController = require('./controllers/user');

//load mongoose
const mongoose = require('mongoose');

//get body parser for POST and PUT operations
const bodyParser = require('body-parser');

//creating file system
const fs = require('fs');

//include SSL certificate 
const key = fs.readFileSync('./key.pem');

//include SSL Keys
const cert = fs.readFileSync('./cert.pem');

//using ejs as view engine
const ejs = require('ejs');

//require sessions
const session = require('express-session');

//load passport 
const passport = require('passport');

//load the autherntication controller from controllers folder 
const authController = require('./controllers/auth');

const clientController = require('./controllers/client');

//new oauth2 controller
const oauth2Controller = require('./controllers/oauth2');

// Create our Express application
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

//use morgan
app.use(morgan('combined')); 

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Using the passport package in this application
app.use(passport.initialize());

// Use the body-parser package in the application
app.use(bodyParser.urlencoded({
  extended: true
}));

//creating an express Router named router
const router = express.Router(); 

// Use environment defined port or 3000
const port = process.env.PORT || 3000;

//create aerver
const server = https.createServer({key: key, cert: cert }, app);

// Connect to the tapodata MongoDB database
mongoose.connect('mongodb://localhost:27017/tapodata');


router.get('/', function(req, res) {
  res.json({ message: 'secure API server created' });
});

/*************User authentication**********************/


// Create endpoint handlers for /signals
router.route('/signals')
  .post(authController.isAuthenticated, signalController.postSignals)
  .get(authController.isAuthenticated, signalController.getSignals);


// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);


// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);


// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


/***********listening at port = port*******************/
app.use('/api', router);
// Start the server
server.listen(port, () => { console.log('secure API server created') });

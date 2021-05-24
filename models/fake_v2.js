// Load required packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// Define our Motor temperature schema
//var timestamps = require('mongoose-timestamp');
/*
var FakeSchema = new mongoose.Schema({
	
	srcSys: String,
	name: String,
	val: Number,
	unit: String,
	status: String
});
*/
/*
let FakeSchema = new Schema({

	ts: {
		type: String
	},

	srcSys: {
		type: String
	},

	name: {
		type: String
	},

	val: {
		type: Number
	},

	unit: {
		type: String
	},

	status: {
		type: String
	}
});
*/

const childSchema = new Schema({

	ts: {
		type: String
	},

	srcSys: {
		type: String
	},

	name: {
		type: String
	},

	val: {
		type: Number
	},

	unit: {
		type: String
	},

	status: {
		type: String
	}
	
});

const FakeSchema = new mongoose.Schema({
  // Array of subdocuments
  signals: [childSchema]
});

//FakeSchema.plugin(timestamps);

// Export the Mongoose model
module.exports = mongoose.model('Fake', FakeSchema);
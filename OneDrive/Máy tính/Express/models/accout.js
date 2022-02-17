const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodemy');

const Schema = mongoose.Schema;

const AccoutSchema = new Schema(
	{
		username: { type: String },
		password: { type: String },
		createdAt: { type: Date, default: Date.now },
	},
	{ collection: 'accout' },
);

const AccoutModel = mongoose.model('accout', AccoutSchema);

module.exports = AccoutModel;

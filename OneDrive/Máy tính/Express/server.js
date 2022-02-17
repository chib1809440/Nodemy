const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
const AccoutModel = require('./models/accout');
var md5 = require('md5');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/register', (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	AccoutModel.findOne({ username: username })
		.then((data) => {
			if (data) {
				res.json('This user existed');
			} else {
				return AccoutModel.create({
					username: username,
					password: md5(password),
				});
			}
		})
		.then(() => {
			res.send('Create success');
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});
app.post('/login', (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	AccoutModel.findOne({ username: username, password: md5(password) })
		.then((data) => {
			if (data) {
				res.send('Login Successfully');
			} else {
				res.send('Login Failed');
			}
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});
app.get('/', (req, res, next) => {
	res.send('Home');
});

app.listen(port, () => {
	console.log(`Server start on port localhost:${port}`);
});

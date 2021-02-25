var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../database.js');

app.post('/login', function (req, res) {
	db.query('SELECT * FROM users JOIN users_settings USING (id) WHERE LOWER(username)=LOWER($1::text) AND password=$2::text', [req.body.username, req.body.password], (err, resp1) => {
		if (err) throw err;
		
		if (resp1.rows[0] === undefined || resp1.rows[0] === null) // user not exist
		{
			res.json({
				status: 'notExist'
			});
		}
		else // if user exist
		{
			res.json({
				data: resp1.rows[0],
				status: 'success'
			});
		}
	});
});

module.exports = app;

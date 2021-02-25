var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/clients-list', function (req, res) {
	db.query('SELECT * FROM clients ORDER BY id', [], (err, resp1) => {
		if (err) throw err;
		
		res.json({
			list: resp1.rows,
			status: 'success'
		});
	});
});

module.exports = app;

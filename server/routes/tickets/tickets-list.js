var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/tickets-list', function (req, res) {
	db.query('SELECT tickets.*, clients.forename, clients.lastname, clients.address, clients.email, clients.phone FROM tickets LEFT JOIN clients ON (tickets.client=clients.id) ORDER BY tickets.id', [], (err, resp1) => {
		if (err) throw err;
		
		res.json({
			list: resp1.rows,
			status: 'success'
		});
	});
});

module.exports = app;

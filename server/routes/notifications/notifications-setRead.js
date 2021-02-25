var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/notifications-setRead', function (req, res) {
	db.query('UPDATE notifications SET read=$2 WHERE id=$1', [req.body.id, req.body.read], (err, resp1) => {
		if (err) throw err;
		
		res.json({
			status: 'success'
		});
	});
});

module.exports = app;

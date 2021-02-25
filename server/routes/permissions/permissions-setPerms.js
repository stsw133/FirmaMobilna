var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/permissions-setRead', function (req, res) {
	db.query('INSERT INTO permissions (creator, receiver, module, action, allowed) VALUES ($1, $2, $3, $4::text, $5) ON CONFLICT (creator) DO UPDATE SET allowed=$5', [req.body.id, req.body.user, req.body.module, req.body.action, req.body.allowed], (err, resp1) => {
		if (err) throw err;
		
		res.json({
			status: 'success'
		});
	});
});

module.exports = app;

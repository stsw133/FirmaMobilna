var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/permissions-setPerm', function (req, res) {
	if (req.body.value == true)
	{
		db.query('INSERT INTO permissions ("group", module, action) VALUES ($1, $2, $3::text)', [req.body.group, req.body.module, req.body.action], (err, resp1) => {
			if (err) throw err;
			
			res.json({
				status: 'success'
			});
		});
	}
	else
	{
		console.log(req.body);
		db.query('DELETE FROM permissions WHERE "group"=$1 AND module=$2 AND action=$3::text', [req.body.group, req.body.module, req.body.action], (err, resp1) => {
			if (err) throw err;
			
			res.json({
				status: 'success'
			});
		});
	}
});

module.exports = app;

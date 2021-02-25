var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/notifications-countNew', function (req, res) {
	db.query('SELECT COUNT(*) FROM notifications WHERE receiver=$1 AND read=false', [req.body.user], (err, resp1) => {
		if (err) throw err;
		
		if (resp1.rows[0] != null)
		{
			res.json({
				counter: resp1.rows[0].count,
				status: 'success'
			});
		}
	});
});

module.exports = app;

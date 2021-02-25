var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/settings-edit', function (req, res) {
	db.query('UPDATE users_settings SET theme=$2::text, wallpaper=$3::text WHERE id=$1', [req.body.account.id, req.body.account.theme, req.body.account.wallpaper], (err, resp1) => {
		if (err) throw err;
		
		db.query('UPDATE users SET language=$2::text WHERE id=$1', [req.body.account.id, req.body.account.language], (err, resp2) => {
			if (err) throw err;
		});
		
		if (req.body.data.newPassword.length > 6)
		{
			db.query('UPDATE users SET password=$2::text WHERE id=$1', [req.body.account.id, req.body.data.newPassword], (err, resp3) => {
				if (err) throw err;
			});
		}
		
		res.json({
			data: resp1.rows[0],
			status: 'success'
		});
	});
});

module.exports = app;

var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/notifications-list', function (req, res) {
	if (req.body.user != null)
	{
		if (req.body.read == false)
		{
			db.query('SELECT *, (SELECT CONCAT(forename, \' \', lastname) FROM users WHERE id=n.creator) AS "creatorName" FROM notifications n WHERE receiver=$1 AND read=false ORDER BY created DESC', [req.body.user], (err, resp1) => {
				if (err) throw err;
				
				res.json({
					list: resp1.rows,
					status: 'success'
				});
			});
		}
		else
		{
			db.query('SELECT *, (SELECT CONCAT(forename, \' \', lastname) FROM users WHERE id=n.creator) AS "creatorName" FROM notifications n WHERE receiver=$1 ORDER BY created DESC', [req.body.user], (err, resp1) => {
				if (err) throw err;
				
				res.json({
					list: resp1.rows,
					status: 'success'
				});
			});
		}
	}
	else
	{
		res.json({
			status: 'failed'
		});
	}
});

module.exports = app;

var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/clients-delete', function (req, res) {
	db.query('SELECT COUNT(*) FROM clients WHERE id=$1', [req.body.id], (err, resp1) => {
		if (err) throw err;
		
		if (resp1.rows[0].count == 0) // if there is no client to delete
		{
			res.json({
				status: 'failed'
			});
		}
		else // if client exist
		{
			db.query("SELECT id FROM users", [], (err, resp2) => {
				if (err) throw err;
				
				db.query('DELETE FROM clients WHERE id=$1', [req.body.id], (err, resp3) => {
					if (err) throw err;
					
					for (var i=0; i<resp2.rows.length; i++) {
						db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp2.rows[i].id, 'NOTIF_CLIENT_DELETE', req.body.id], (err, resp4) => {
							if (err) throw err;
						});
					}
					
					res.json({
						data: resp3.rows[0],
						status: 'success'
					});
				});
			});
		}
	});
});

module.exports = app;

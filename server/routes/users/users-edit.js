var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/users-edit', function (req, res) {
	db.query("SELECT id FROM users", [], (err, resp1) => {
		if (err) throw err;
		
		db.query('UPDATE users SET username=$1::text, email=$2::text, password=$3::text, group=$4, active=$5, language=$6::text, forename=INITCAP($7::text), lastname=INITCAP($8::text), phone=$9::text WHERE id=$10', [req.body.item.username, req.body.item.email, req.body.item.password, req.body.item.group, req.body.item.active, req.body.item.language, req.body.item.forename, req.body.item.lastname, req.body.item.phone, req.body.item.id], (err, resp2) => {
			if (err) throw err;
			
			for (var i=0; i<resp1.rows.length; i++) {
				db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp1.rows[i].id, 'NOTIF_USER_EDIT', req.body.item.id], (err, resp3) => {
					if (err) throw err;
				});
			}
			
			res.json({
				data: resp2.rows[0],
				status: 'success'
			});
		});
	});
});

module.exports = app;

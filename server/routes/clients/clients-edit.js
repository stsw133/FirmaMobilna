var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/clients-edit', function (req, res) {
	db.query("SELECT id FROM users", [], (err, resp1) => {
		if (err) throw err;
		
		db.query('UPDATE clients SET forename=INITCAP($1::text), lastname=INITCAP($2::text), address=$3::text, phone=$4::text, email=$5::text, type=$6::text, status=$7::text, pesel=$8::text, note=$9::text WHERE id=$10', [req.body.item.forename, req.body.item.lastname, req.body.item.address, req.body.item.phone, req.body.item.email, req.body.item.type, req.body.item.status, req.body.item.pesel, req.body.item.note, req.body.item.id], (err, resp2) => {
			if (err) throw err;
			
			for (var i=0; i<resp1.rows.length; i++) {
				db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp1.rows[i].id, 'NOTIF_CLIENT_EDIT', req.body.item.id], (err, resp3) => {
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

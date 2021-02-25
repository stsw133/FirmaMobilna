var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/clients-new', function (req, res) {
	db.query("SELECT NEXTVAL('clients_id_seq'), id FROM users", [], (err, resp1) => {
		if (err) throw err;
		
		db.query('INSERT INTO clients (id, forename, lastname, address, phone, email, creator, type, status, pesel, note) VALUES ($1, INITCAP($2::text), INITCAP($3::text), $4::text, $5::text, $6::text, $7, $8::text, $9::text, $10::text, $11::text)', [resp1.rows[0].nextval, req.body.item.forename, req.body.item.lastname, req.body.item.address, req.body.item.phone, req.body.item.email, req.body.item.creator, req.body.item.type, req.body.item.status, req.body.item.pesel, req.body.item.note], (err, resp2) => {
			if (err) throw err;
			
			for (var i=0; i<resp1.rows.length; i++) {
				db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp1.rows[i].id, 'NOTIF_CLIENT_NEW', resp1.rows[0].nextval], (err, resp3) => {
					if (err) throw err;
				});
			}
			
			// if adding succeed
			res.json({
				data: resp2.rows[0],
				status: 'success'
			});
		});
	});
});

module.exports = app;

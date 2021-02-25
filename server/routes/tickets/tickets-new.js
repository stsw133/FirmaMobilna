var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/tickets-new', function (req, res) {
	db.query("SELECT NEXTVAL('tickets_id_seq'), id FROM users", [], (err, resp1) => {
		if (err) throw err;
		
		db.query('INSERT INTO tickets (id, client, creator, status, priority, category, payment, starting, ending, description1, description2, description3, note, employees) VALUES ($1, $2, $3, $4::text, $5, $6::text, $7, $8, $9, $10::text, $11::text, $12::text, $13::text, $14::text)', [resp1.rows[0].nextval, req.body.item.client, req.body.user, req.body.item.status, req.body.item.priority, req.body.item.category, req.body.item.payment, req.body.item.starting, req.body.item.ending, req.body.item.description1, req.body.item.description2, req.body.item.description3, req.body.item.note, req.body.item.employees], (err, resp2) => {
			if (err) throw err;
			
			for (var i=0; i<resp1.rows.length; i++) {
				db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp1.rows[i].id, 'NOTIF_TICKET_NEW', resp1.rows[0].nextval], (err, resp3) => {
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

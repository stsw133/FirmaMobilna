var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/tickets-edit', function (req, res) {
	db.query("SELECT id FROM users", [], (err, resp1) => {
		if (err) throw err;
		
		db.query('UPDATE tickets SET client=$1, status=$2::text, priority=$3::text, category=$4::text, payment=$5, starting=$6, ending=$7, description1=$8::text, description2=$9::text, description3=$10::text, note=$11::text, employees=$12::text WHERE id=$13', [req.body.item.client, req.body.item.status, req.body.item.priority, req.body.item.category, req.body.item.payment, req.body.item.starting, req.body.item.ending, req.body.item.description1, req.body.item.description2, req.body.item.description3, req.body.item.note, req.body.item.employees, req.body.item.id], (err, resp2) => {
			if (err) throw err;
			
			for (var i=0; i<resp1.rows.length; i++) {
				db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp1.rows[i].id, 'NOTIF_TICKET_EDIT', req.body.item.id], (err, resp3) => {
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

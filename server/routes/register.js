var express = require('express');
var app = express();
var jwt = require('express-jwt');
var emailExistence = require('email-existence');

var db = require('../database.js');

app.post('/register', function (req, res) {
	// emailExistence.check(req.body.email, function(error, resp0) {
		// if (!resp0)
		// {
			// res.json({
				// status: 'email_notExists'
			// });
		// }
		// else
		// {
			db.query('SELECT COUNT(*) FROM users WHERE LOWER(email)=LOWER($1::text)', [req.body.email], (err, resp1) => {
				if (err) throw err;
				
				if (resp1.rows[0].count > 0) // email already taken
				{
					res.json({
						status: 'email_taken'
					});
				}
				else
				{
					db.query('SELECT COUNT(*) FROM users WHERE LOWER(username)=LOWER($1::text)', [req.body.username], (err, resp2) => {
						if (err) throw err;
						
						if (resp2.rows[0].count > 0) // username already taken
						{
							res.json({
								status: 'username_taken'
							});
						}
						else
						{
							db.query("SELECT NEXTVAL('users_id_seq'), id FROM users", [], (err, resp3) => {
								if (err) throw err;
								
								db.query('INSERT INTO users (id, username, email, password, language, forename, lastname) VALUES ($1, $2::text, $3::text, $4::text, $5::text, INITCAP($6::text), INITCAP($7::text))', [resp3.rows[0].nextval, req.body.username, req.body.email, req.body.password, req.body.language, req.body.forename, req.body.lastname], (err, resp4) => {
									if (err) throw err;
									
									db.query('INSERT INTO users_settings (id) VALUES ($1)', [resp3.rows[0].nextval], (err, resp5) => {
										if (err) throw err;
									});
									
									for (var i=0; i<resp3.rows.length; i++) {
										db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [resp3.rows[0].nextval, resp3.rows[i].id, 'NOTIF_REGISTER', resp3.rows[0].nextval], (err, resp6) => {
											if (err) throw err;
										});
									}
									
									// if registration succeed
									res.json({
										data: resp4.rows[0],
										status: 'success'
									});
								});
							});
						}
					});
				}
			});
		// }
	// });
});

module.exports = app;

var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/users-new', function (req, res) {
	// emailExistence.check(req.body.email, function(error, resp0) {
		// if (!resp0)
		// {
			// res.json({
				// status: 'email_notExists'
			// });
		// }
		// else
		// {
			db.query('SELECT COUNT(*) FROM users WHERE LOWER(email)=LOWER($1::text)', [req.body.item.email], (err, resp1) => {
				if (err) throw err;
				
				if (resp1.rows[0].count > 0) // email already taken
				{
					res.json({
						status: 'email_taken'
					});
				}
				else
				{
					db.query('SELECT COUNT(*) FROM users WHERE LOWER(username)=LOWER($1::text)', [req.body.item.username], (err, resp2) => {
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
								
								db.query('INSERT INTO users (id, username, email, password, group, language, forename, lastname) VALUES ($1, $2::text, $3::text, $4::text, $5, $6::text, INITCAP($7::text), INITCAP($8::text))', [resp3.rows[0].nextval, req.body.item.username, req.body.item.email, req.body.item.password, req.body.item.group, req.body.item.language, req.body.item.forename, req.body.item.lastname], (err, resp4) => {
									if (err) throw err;
									
									db.query('INSERT INTO users_settings (id) VALUES ($1)', [resp3.rows[0].nextval], (err, resp5) => {
										if (err) throw err;
									});
									
									for (var i=0; i<resp3.rows.length; i++) {
										db.query('INSERT INTO notifications (creator, receiver, content, subject) VALUES ($1, $2, $3::text, $4::text)', [req.body.user, resp3.rows[i].id], 'NOTIF_USER_NEW', resp3.rows[0].nextval, (err, resp6) => {
											if (err) throw err;
										});
									}
									
									// if adding succeed
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

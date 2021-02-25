var express = require('express');
var app = express();
var jwt = require('express-jwt');

var db = require('../../database.js');

app.post('/permissions-list', function (req, res) {
	db.query('SELECT * FROM permissions_groups ORDER BY id', [], (err, resp1) => {
		if (err) throw err;
		
		db.query('SELECT * FROM permissions_modules ORDER BY id', [], (err, resp2) => {
			if (err) throw err;
			
			db.query('SELECT id, "group", (SELECT name FROM permissions_groups WHERE id="group") AS "groupName", module, (SELECT name FROM permissions_modules WHERE id=module) AS "moduleName", action FROM permissions', [], (err, resp3) => {
				if (err) throw err;
				
				res.json({
					groups: resp1.rows,
					modules: resp2.rows,
					permissions: resp3.rows,
					status: 'success'
				});
			});
		});
	});
});

module.exports = app;

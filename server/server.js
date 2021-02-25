var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
app.set('port', 3000);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));

// routes
var login = require('./routes/login.js');
app.use(login);
var register = require('./routes/register.js');
app.use(register);

var notifications_countNew = require('./routes/notifications/notifications-countNew.js');
app.use(notifications_countNew);
var notifications_list = require('./routes/notifications/notifications-list.js');
app.use(notifications_list);
var notifications_setRead = require('./routes/notifications/notifications-setRead.js');
app.use(notifications_setRead);

var users_list = require('./routes/users/users-list.js');
app.use(users_list);
var users_new = require('./routes/users/users-new.js');
app.use(users_new);
var users_edit = require('./routes/users/users-edit.js');
app.use(users_edit);
var users_delete = require('./routes/users/users-delete.js');
app.use(users_delete);

var clients_list = require('./routes/clients/clients-list.js');
app.use(clients_list);
var clients_new = require('./routes/clients/clients-new.js');
app.use(clients_new);
var clients_edit = require('./routes/clients/clients-edit.js');
app.use(clients_edit);
var clients_delete = require('./routes/clients/clients-delete.js');
app.use(clients_delete);

var tickets_list = require('./routes/tickets/tickets-list.js');
app.use(tickets_list);
var tickets_new = require('./routes/tickets/tickets-new.js');
app.use(tickets_new);
var tickets_edit = require('./routes/tickets/tickets-edit.js');
app.use(tickets_edit);
var tickets_delete = require('./routes/tickets/tickets-delete.js');
app.use(tickets_delete);

var permissions_list = require('./routes/permissions/permissions-list.js');
app.use(permissions_list);
var permissions_setPerm = require('./routes/permissions/permissions-setPerm.js');
app.use(permissions_setPerm);
var permissions_setPerms = require('./routes/permissions/permissions-setPerms.js');
app.use(permissions_setPerms);

var settings_edit = require('./routes/settings/settings-edit.js');
app.use(settings_edit);

// listening
app.listen(app.get('port'), function() {
	console.log('Server is working on port '+app.get('port'));
});

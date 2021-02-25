const pg = require('pg');
const connectionString = process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'firma'
}

const client = new pg.Client(connectionString);
client.connect();
module.exports = client;

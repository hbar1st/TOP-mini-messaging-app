const { Pool } = require("pg");
require("dotenv").config();

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

module.exports = new Pool({
  connectionString,
});


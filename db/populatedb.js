// run this script once
// node db/populatedb.js
// OR OR OR OR
// node db/populatedb.js <role-name> <role-password> [<port>||5432]
// use arguments if you don't want to rely on environment variables
const { argv } = require("node:process");

// user environment variables if you are deployed on your own physical server
const { pool } = require("./pool");
/** 
if (argv.length < 4) {
  console.log(
    "Pass in the role-name and the role-password at a minimum in that order, you may also provide the port last."
  );
  return;
}
*/
const { Client } = require("pg");

const INITIAL_SETUP_SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255), username VARCHAR(25), added TIMESTAMP WITH TIME ZONE
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Bryan missing practice', 'bryansdad', '2023-01-25 10:00:00-04'),
  ('Odin is a great site', 'topstudent', '2024-03-01 10:00:00-05'),
  ('Damon wants to stay late', 'schoolfriend', '2025-09-15 10:00:00+03');
`;

async function main() {
  console.log("seeding...");
  /**
   * old way of relying on env variables
   */
  
  const client = new Client({
    connectionString: pool.connectionString,
  });
  

  /**
   * new way of using command line variables
   *
  const client = new Client({
    connectionString: `postgresql://${argv[2]}:${argv[3]}@localhost:${
      argv[4] ?? 5432
    }/top_users`,
  });
  */
  await client.connect();
  try {
    await client.query(INITIAL_SETUP_SQL);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  console.log("done");
}

/**
# populating local db
node db/populatedb.js <local-db-url>

# populating production db
# run it from your machine once after deployment of your app & db
node db/populatedb.js <production-db-url>
**/

main();

const pool = require("./pool");

async function setupDB() {
  await setupDB();
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

const INITIAL_SETUP_SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ), user VARCHAR (25), added TIME STAMP WITH TIME ZONE
);

INSERT INTO messages (text, user, added) 
VALUES
  ('Bryan missing practice', 'bryansdad', '2023-01-25 10:00:00-04'),
  ('Odin is a great site', 'topstudent', '2024-03-01 10:00:00-05'),
  ('Damon wants to stay late', 'schoolfriend', '2025-09-15 10:00:00+03');
`;
module.exports = async function setupDB() {
  console.log("seeding...");

  try {
    await pool.query(INITIAL_SETUP_SQL);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  console.log("done with step to seed the db");
};

module.exports = {
  setupDB,
  getAllMessages,
};

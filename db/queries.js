const { text } = require("express");
const { pool } = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageDetails(id) {
  
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
  return rows;
}

async function insertNewMessage(textmsg, author, timestamp) {
  const text =
    "INSERT INTO messages(text, username, added) VALUES($1, $2, $3)";
  const values = [textmsg, author, timestamp]; 

  await pool.query(text, values);
}

module.exports = {
  getAllMessages,
  getMessageDetails,
  insertNewMessage,
};

const { text } = require("express");
const { pool } = require("../db/pool");
const db = require("../db/queries");

exports.messagesListGet = async (req, res) => {
  const messages = await db.getAllMessages();
  
  res.render("index", messages.map(el => ({
    text: el.text,
    user: el.username,
    added: el.added,
    id: el.id,
  })));
}

exports.messagesDetailsGet = async (req, res) => {
  console.log("in messagesDetailsGet");
  
  const { id } = req.query;
  const messages = (id > 0) ? await db.getMessageDetails(id) : [];
  console.log("trying to view messages: ", messages);
  if (messages.length >= 0) {
    res.render("form", {
      text: messages[0].text,
      user: messages[0].username,
      added: messages[0].added,
      id: messages[0].id,
    });
  } else {
    throw new Error("Programmer Error: No valid message id was provided with the path.");
  }
};

exports.newMessagePost = (req, res) => {
    const id = req.params.id;
    let { textmsg, author, timestamp } = req.body;

    if (timestamp) {
      timestamp = new Date(timestamp);
    } else {
      timestamp = new Date();
    }
  
      console.log({id});
    if (id !== "false") {
      //messages[id] = { text: textmsg, user: author, added: timestamp };
    } else {
      db.insertNewMessage(textmsg, author, timestamp);
    }
    res.redirect("/");
};
exports.newMessageGet = (req, res) => {
  res.render("form", { text: false, user: false, added: false, id: false });
};



/**
* 
*
app.route("/new{/:index}").get((req, res) => {
  res.render("form", {text: false, user: false, added: false, index: false});
}).post((req, res) => {
  const index = req.params.index;
let { textmsg, author, timestamp } = req.body;

if (timestamp) {
timestamp = new Date(timestamp);
} else {
  timestamp = new Date();
}
if (index !== 'false') {
messages[index] = { text: textmsg, user: author, added: timestamp };
} else {
  messages.push({ text: textmsg, user: author, added: timestamp });
}
res.redirect("/");
});
*/
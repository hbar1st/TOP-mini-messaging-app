require("express");
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

exports.messagesListGet = async (req, res) => {
  const messages = await db.getAllMessages();
  
  res.render("index", { messages: messages.map(el => ({
    text: el.text,
    user: el.username,
    added: el.added,
    id: el.id,
  }))

  });
}

exports.messagesDetailsGet = async (req, res) => {
  
  const { id } = req.query;
  const messages = (id > 0) ? await db.getMessageDetails(id) : [];
  if (messages.length >= 0) {
    res.render("form", {
      text: messages[0].text,
      user: messages[0].username,
      added: messages[0].added,
      msgid: messages[0].id,
    });
  } else {
    throw new Error("Programmer Error: No valid message id was provided with the path.");
  }
};

const validateMessage = [
  body("textmsg")
    .trim()
    .isLength({ min: 1, max: 280 })
    .withMessage(`Text message length should not exceed 280 characters, nor be 0.`),
  body("author")
    .trim()
    .isAlpha()
    .withMessage(`Author's name should consist of alphabetic characters.`)
    .isLength({ min: 2, max: 30 })
    .withMessage(`Author's name should consist of at least 2 characters and at most 30 characters.`),
];

exports.newMessagePost = [
  validateMessage,
  (req, res) => {
    
    const id = req.params.msgid;
    let { textmsg, author, timestamp } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        text: textmsg,
        user: author,
        added: timestamp,
        msgid: id,
      });
    }

    if (timestamp) {
      timestamp = new Date(timestamp);
    } else {
      timestamp = new Date();
    }

    if (id !== "false") {
      db.updateMessage(id, textmsg, author, timestamp);
    } else {
      db.insertNewMessage(textmsg, author, timestamp);
    }
    res.redirect("/");
  },
];
  
exports.newMessageGet = (req, res) => {
  res.render("form", { text: false, user: false, added: false, msgid: false });
};

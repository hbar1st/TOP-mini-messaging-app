const db = require("../db/queries");

exports.messagesListGet = (req, res) => {
  console.log("in messagesListGet")
};
exports.messagesDetailsGet = (req, res) => {
  console.log("in messagesListGet")
};
exports.newMessagePost = (req, res) => {
  console.log("in messagesListGet")
};
exports.newMessageGet = (req, res) => {
  console.log("in messagesListGet")
};

/**
 * 
 *
app.get("/",  (req, res) => {
  //res.render("index", { messages });

  //res.render("index", dbMessages);
});

/**
 * 
 *
app.get("/details", (req, res) => {
    const { index } = req.query;
    if (+index >= 0) {   
        res.render("form", { text: messages[index].text, user: messages[index].user, added: messages[index].added, index });
    } else {
        throw(new Error("Programmer Error: No index was provided with the path."))
    }
});

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
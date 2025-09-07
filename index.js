const express = require("express");
const app = express();

app.set("view engine", "ejs");

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true })); //used to parse form body

const port = process.env.PORT || 3000;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/**
 * 
 */
app.get("/", (req, res) => {
    res.render("index", { messages });
});

/**
 * 
 */
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
 */
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

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
  } else {
    console.error("Server startup error:", err);
  }
  process.exit(1); // Exit the process if a critical error occurs
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});
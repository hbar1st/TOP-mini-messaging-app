const { Router } = require("express");

const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/", messagesController.messagesListGet);

messagesRouter.get("/details", messagesController.messagesDetailsGet);

messagesRouter.post("/new{/:id}", messagesController.newMessagePost);

messagesRouter.get("/new{/:id}", messagesController.newMessageGet);

module.exports = messagesRouter;



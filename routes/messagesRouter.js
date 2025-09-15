const { Router } = require("express");

const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/", messagesController.messagesListGet);

messagesRouter.get("/details", messagesController.messagesDetailsGet);

messagesRouter.post("/new{/:index}", messagesController.newMessagePost);

messagesRouter.get("/new{/:index}", messagesController.newMessageGet);

module.exports = messagesRouter;



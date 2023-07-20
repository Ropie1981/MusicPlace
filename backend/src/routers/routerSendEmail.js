const express = require("express");

const routerSendEmail = express.Router();

const sendEmailControllers = require("../controllers/sendEmailControllers");

routerSendEmail.post("/sendemail", sendEmailControllers.send);

module.exports = routerSendEmail;

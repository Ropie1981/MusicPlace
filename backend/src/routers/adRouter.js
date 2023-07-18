const express = require("express");

const adRouter = express.Router();

const { verifyToken } = require("../services/auth");

const adControllers = require("../controllers/adControllers");

adRouter.get("/ads", adControllers.browse);
adRouter.get("/ads/:id", adControllers.read);
adRouter.get("/user-ads/:id", adControllers.browseByUserId);
adRouter.put("/ads/:id", verifyToken, adControllers.edit);
adRouter.post("/ads", verifyToken, adControllers.add);
adRouter.delete("/ads/:id", adControllers.destroy);

module.exports = adRouter;

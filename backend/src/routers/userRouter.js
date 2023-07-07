const express = require("express");

const userRouter = express.Router();

const userControllers = require("../controllers/userControllers");

userRouter.get("/users", userControllers.browse);
userRouter.get("/users/:id", userControllers.read);
userRouter.put("/users/:id", userControllers.edit);
userRouter.post("/users", userControllers.add);
userRouter.delete("/users/:id", userControllers.destroy);

module.exports = userRouter;

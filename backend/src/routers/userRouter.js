const express = require("express");

const userRouter = express.userRouter();

const itemControllers = require("../controllers/itemControllers");

userRouter.get("/users", itemControllers.browse);
userRouter.get("/users/:id", itemControllers.read);
userRouter.put("/users/:id", itemControllers.edit);
userRouter.post("/users", itemControllers.add);
userRouter.delete("/users/:id", itemControllers.destroy);

module.exports = userRouter;

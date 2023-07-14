const express = require("express");

const userRouter = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("../services/auth");
const {
  getUserByEmailMiddleWare,
  register,
} = require("../controllers/authControllers");

// Public routes
// Auth
userRouter.post("/register", hashPassword, register);
userRouter.post("/login", getUserByEmailMiddleWare, verifyPassword);
userRouter.get("/logout", logout);

const userControllers = require("../controllers/userControllers");

userRouter.get("/profile", verifyToken, userControllers.profile);

userRouter.get("/users", userControllers.browse);
userRouter.get("/users/:id", userControllers.read);
userRouter.put("/users/:id", userControllers.edit);
userRouter.post("/users", userControllers.add);
userRouter.delete("/users/:id", userControllers.destroy);

module.exports = userRouter;

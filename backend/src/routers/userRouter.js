const express = require("express");
const multer = require("multer");

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

const uploadPicture = multer({
  dest: "./public/picture/",
  limits: { fileSize: 5000000000000 }, // limit file size to 5000000000000bytes
});

const userControllers = require("../controllers/userControllers");
// Public routes
// Auth
userRouter.post("/register", hashPassword, register);
userRouter.post("/login", getUserByEmailMiddleWare, verifyPassword);
userRouter.get("/profile", verifyToken, userControllers.profile);
userRouter.put("/users/:id", verifyToken, userControllers.edit);
userRouter.get("/logout", logout);
userRouter.delete("/users/:id", verifyToken, userControllers.destroy);
userRouter.post(
  "/maPhoto",
  verifyToken,
  uploadPicture.single("maPhoto"),
  userControllers.uploadPhoto
);

userRouter.get("/users", userControllers.browse);
userRouter.get("/users/:id", userControllers.read);
userRouter.post("/users", userControllers.add);

module.exports = userRouter;

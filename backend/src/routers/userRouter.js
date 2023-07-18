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
userRouter.get("/logout", logout);
userRouter.post(
  "/maPhoto",
  verifyToken,
  uploadPicture.single("maPhoto"),
  userControllers.uploadPhoto
);

userRouter.get("/profile", verifyToken, userControllers.profile);

userRouter.get("/users", userControllers.browse);
userRouter.get("/users/:id", userControllers.read);
userRouter.put("/users/:id", userControllers.edit);
userRouter.post("/users", userControllers.add);
userRouter.delete("/users/:id", userControllers.destroy);

module.exports = userRouter;

const express = require("express");
const multer = require("multer");

const adRouter = express.Router();

const { verifyToken } = require("../services/auth");

const uploadPicture = multer({
  dest: "./public/picture/",
  limits: { fileSize: 5000000000000 }, // limit file size to 5000000000000bytes
});

const adControllers = require("../controllers/adControllers");

adRouter.post(
  "/maPhotoAnnonce",
  verifyToken,
  uploadPicture.single("maPhoto"),
  adControllers.uploadPhoto
);

adRouter.get("/ads", adControllers.browse);
adRouter.get("/ads/:id", adControllers.read);
adRouter.get("/user-ads/:id", adControllers.browseByUserId);
adRouter.put("/ads/:id", verifyToken, adControllers.edit);
adRouter.post("/ads", verifyToken, adControllers.add);
adRouter.delete("/ads/:id", adControllers.destroy);

module.exports = adRouter;

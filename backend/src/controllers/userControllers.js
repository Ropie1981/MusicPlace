const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const profile = (req, res) => {
  const id = req.payloads.sub;
  models.user
    .find(id)
    .then(([users]) => {
      if (users[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(users[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const uploadPhoto = async (req, res) => {
  const { originalname, filename } = req.file;
  const photoPath = `${uuidv4()}-${originalname}`;

  try {
    await fs.promises.rename(
      `./public/picture/${filename}`,
      `./public/picture/${photoPath}`
    );

    await models.user.updatePicture({
      id: req.payloads.sub,
      profile_picture: photoPath,
    });
    res.send({ photoPath });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([articles]) => {
      res.send(articles);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([users]) => {
      if (users[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(users[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  profile,
  browse,
  read,
  edit,
  add,
  destroy,

  uploadPhoto,
};

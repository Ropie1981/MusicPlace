const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const models = require("../models");

const browse = (req, res) => {
  models.ad
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByUserId = (req, res) => {
  models.ad
    .findAdsByUserId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.ad
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const ad = req.body;

  // TODO validations (length, format...)

  ad.id = parseInt(req.params.id, 10);

  models.ad
    .update(ad)
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

const add = async (req, res) => {
  try {
    const ad = req.body;

    // TODO validations (length, format...)

    const [result] = await models.ad.insert(ad);
    const insertedId = result.insertId;
    res.status(201).json({ id: insertedId }); // Send the inserted ID in the response
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.ad
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

const uploadPhoto = async (req, res) => {
  const { originalname, filename } = req.file;
  const photoPath = `${uuidv4()}-${originalname}`;

  try {
    await fs.promises.rename(
      `./public/picture/${filename}`,
      `./public/picture/${photoPath}`
    );

    await models.ad.updatePicture({
      id: req.body.id,
      picture: photoPath,
    });
    res.send({ photoPath });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  browseByUserId,
  uploadPhoto,
};

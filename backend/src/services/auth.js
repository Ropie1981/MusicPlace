const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      // on supprime le mot de passe en clair pour ne laisser que le mot de passe hashé.
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyPassword = (req, res) => {
  // req.user.hashedPassword doit nous être fournis par un middleware précedent
  // correspondant au mot de passe hashé, stocké dans la BDD pour l'utilisateur en train de se connecter
  // On verifie si le mot de passe en clair reçu dans req.body.password, une fois hashé, correspond
  // au mot de passe hashé stocké dans la BDD pour le user.
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      // si la comparaison est positive, l'utilisateur est validé (email + password)
      if (isVerified) {
        // on créé un token, encodé avec le mot de passe contenu dans le fichier d'environnement
        const token = jwt.sign(
          {
            sub: req.user.id,
            email: req.user.email,
            phone: req.user.phone,
            city: req.user.city,
            profile_picture: req.user.profile_picture,
            admin: req.user.admin,
            role: "USER",
          },
          JWT_SECRET,
          {
            algorithm: "HS512",
            expiresIn: JWT_TIMING, // le token expirera après la durée défini dans le .env
          }
        );
        delete req.body.password;
        delete req.user.hashedPassword;
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .send(req.user);
      } else res.sendStatus(401);
    })
    .catch((err) => {
      // to do : mettre un toast error
      console.error(err);
      res.sendStatus(400);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return res.sendStatus(403);

    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
};

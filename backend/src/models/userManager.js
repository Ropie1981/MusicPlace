const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, password, bio, city, phone, profile_picture, registration_date, admin) values (?, ?, ? , ?, ?, ?, ? , ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.password,
        user.bio,
        user.city,
        user.phone,
        user.profile_picture,
        user.registration_date,
        user.admin,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname, lastname, password, bio, city, phone, profile_picture, registration_date, admin = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.password,
        user.bio,
        user.city,
        user.phone,
        user.profile_picture,
        user.registration_date,
        user.admin,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;

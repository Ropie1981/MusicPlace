const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findByEmailWithPassword(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashedPassword, bio, city, phone, registration_date, admin) values (?, ?, ?, ? , ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.bio,
        user.city,
        user.phone,
        user.registration_date,
        user.admin,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, bio = ?, city = ?, phone = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.bio,
        user.city,
        user.phone,
        user.id,
      ]
    );
  }

  updatePicture(user) {
    return this.database.query(
      `update ${this.table} set profile_picture = ? where id = ${user.id}`,
      [user.profile_picture]
    );
  }
}

module.exports = UserManager;

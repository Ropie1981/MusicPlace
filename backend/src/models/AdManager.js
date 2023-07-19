const AbstractManager = require("./AbstractManager");

class AdManager extends AbstractManager {
  constructor() {
    super({ table: "ad" });
  }

  find(id) {
    return this.database.query(
      `select * from  ${this.table} AS ad
      JOIN user AS u on ad.user_id = u.id
     where ad.id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select ${this.table}.*, user.email, user.firstname, user.lastname, user.phone from  ${this.table} AS ad INNER JOIN user ON ad.user_id = user.id`
    );
  }

  findAdsByUserId(userId) {
    return this.database.query(
      `select * from  ${this.table} where user_id = ${userId}`,
      [userId]
    );
  }

  insert(ad) {
    return this.database.query(
      `insert into ${this.table} (
        user_id,
        instrument_id,
        gear_id,
        city,
        publish_date,
        picture,
        title,
        price,
        description) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ad.user_id,
        ad.instrument_id,
        ad.gear_id,
        ad.city,
        ad.publish_date,
        ad.picture,
        ad.title,
        ad.price,
        ad.description,
      ]
    );
  }

  update(ad) {
    return this.database.query(
      `update ${this.table} set user_id = ?, instrument_id = ?,gear_id = ?,city = ?,publish_date = ?,picture = ?,title = ?,price = ?,description = ?, where id = ?`,
      [
        ad.user_id,
        ad.instrument_id,
        ad.gear_id,
        ad.city,
        ad.publish_date,
        ad.picture,
        ad.title,
        ad.price,
        ad.description,
        ad.id,
      ]
    );
  }

  updatePicture(ad) {
    return this.database.query(
      `update ${this.table} set picture = ? where id = ${ad.id}`,
      [ad.picture]
    );
  }
}

module.exports = AdManager;

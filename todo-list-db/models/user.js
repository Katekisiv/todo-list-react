const sql = require("./db");

class User {
  constructor() {
  }

  create = (newUser) => {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        console.log("user: ", {id: res.insertId, ...newUser});
        resolve({id: res.insertId, ...newUser});
      })
    })
  }

  findOne = (email) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if (res.length) {
          console.log("found user: ", res[0]);
          resolve(res[0]);
          return;
        }

        resolve("");
      })
    })
  }

  findById = (userId) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM users WHERE id='${userId}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if (res.length) {
          console.log("found user: ", res[0]);
          resolve(res[0]);
          return;
        }

        resolve("");
      })
    })
  }
}

module.exports = new User();

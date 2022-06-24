const sql = require("./db");
const { v4: uuidv4 } = require("uuid");

class RefreshToken {
  constructor() {
  }

  create = (userId) => {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXPIRATION);
    let token = uuidv4();
    let refreshToken = {
      token,
      userId,
      expiryDate: expiredAt.getTime(),
    }

    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO refreshtoken SET ?", refreshToken, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        console.log("refreshToken: ", {id: res.insertId, ...refreshToken});
        resolve(refreshToken);
      })
    })
  }

  findOne = (token) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM refreshtoken WHERE token='${token}'`, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if (res.length) {
          console.log("found token: ", res[0]);
          resolve(res[0]);
          return;
        }
        resolve("not_found");
      })
    })
  }

  delete = (userId) => {
    return new Promise((resolve, reject) => {
      sql.query(`DELETE FROM refreshtoken WHERE userId = ${userId}`, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if(res.affectedRows === 0) {
          reject("not_found");
          return;
        }
        console.log("deleted refreshToken for user with id ", userId);
        resolve(res);
      });
    })
  }
}

module.exports = new RefreshToken();

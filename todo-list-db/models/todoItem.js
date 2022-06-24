const sql = require("./db");


class TodoItem {
  constructor() {
  }

  findAll = (userId, value, completed, itemsPerPage, pageNumber) => {
    const firstTodoIndex = pageNumber * itemsPerPage - itemsPerPage
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM todoitems WHERE userId=${userId} `;
      if(value && !completed) {
        query += `AND value LIKE '%${value}%' `;
      } else if(!value && completed) {
        query += `AND completed=${completed} `;
      } else if(value && completed) {
        query += `AND value LIKE '%${value}%' AND completed=${completed} `;
      }
      query += `LIMIT ${firstTodoIndex}, ${itemsPerPage} `
      const queryTodosLength = `SELECT COUNT(*) AS todosLength FROM todoitems WHERE userId=${userId} `
      const queryCompletedTodosLength = `SELECT COUNT(*) AS completedTodosLength FROM todoitems WHERE userId=${userId} AND completed=TRUE `

      sql.query(queryTodosLength, (errTodosLength, resTodosLength) => {
        if(errTodosLength) {
          console.log("error: ", errTodosLength);
          reject(errTodosLength);
          return;
        }
        console.log("todosLength: ", resTodosLength[0]);

        sql.query(queryCompletedTodosLength, (errCompletedTodosLength, resCompletedTodosLength) => {
          if(errCompletedTodosLength) {
            console.log("error: ", errCompletedTodosLength);
            reject(queryCompletedTodosLength);
            return;
          }
          console.log("completedTodosLength: ", resCompletedTodosLength[0]);

          sql.query(query, (errTodosItems, resTodosItems) => {
            if(errTodosItems) {
              console.log("error: ", errTodosItems);
              reject(errTodosItems);
              return;
            }

            console.log("todoItems: ", resTodosItems);
            resolve({...resTodosLength[0], ...resCompletedTodosLength[0], todoItems: resTodosItems});
          });
        })
      })
    })
  };

  findOne = (id, userId) => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM todoitems WHERE id = ${id} AND userId = ${userId}`, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if(res.length) {
          console.log("found todoItem: ", res[0]);
          resolve(res[0]);
          return;
        }

        reject("not_found");
      });
    })
  };

  create = (newTodoItem) => {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO todoitems SET ?", newTodoItem, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        console.log("created todoItem: ", { id: res.insertId, ...newTodoItem });
        resolve({ id: res.insertId, ...newTodoItem });
      });
    })
  };

  update = (id, todoItem) => {
    return new Promise((resolve, reject) => {
      let query = `UPDATE todoitems SET `
      if(!todoItem.value) {
        query += `completed = ${todoItem.completed} WHERE id = ${id}`
      } else if(!todoItem.completed) {
        query += `value = '${todoItem.value}' WHERE id = ${id}`
      } else if(todoItem.value && todoItem.completed) {
        query += `value = '${todoItem.value}', completed = ${todoItem.completed} WHERE id = ${id}`
      }
      sql.query(query, (err, res) => {
          if(err) {
            console.log("error: ", err);
            reject(err);
            return;
          }
          if(res.affectedRows === 0) {
            reject("not_found");
            return;
          }

          console.log("updated todoItem: ", { id: id, ...todoItem });
          resolve({ id: id, ...todoItem });
        }
      );
    })
  };

  deleteAll = (userId, completed) => {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM todoitems WHERE userId=${userId}`
      if(completed) {
        query += ` AND completed=${completed}`
      }
      sql.query(query, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        console.log(`deleted ${res.affectedRows} todoItems`);
        resolve(res);
      });
    })
  };

  delete = (id, userId) => {
    return new Promise((resolve, reject) => {
      sql.query(`DELETE FROM todoitems WHERE id = ${id} AND userId = ${userId}`, (err, res) => {
        if(err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if(res.affectedRows === 0) {
          reject("not_found");
          return;
        }
        console.log("deleted todoItem with id: ", id);
        resolve(res);
      });
    })
  };
}

module.exports = new TodoItem();

const TodoItem = require("../../models/todoItem");

exports.findOne = async(req, res) => {
  const user = req.user
  const {id} = req.params
  try {
    const todoItem = await TodoItem.findOne(id, user.id)
    res.status(200).send(todoItem)
  } catch(err) {
    if(err === "not_found") {
      res.status(404).send({
        message: `Not found TodoItem with id ${id}.`
      })
    } else {
      res.status(400).send({
        message:
          err.message || "Some error occurred while retrieving todoItems."
      });
    }
  }
};

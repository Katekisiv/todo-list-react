const TodoItem = require("../../models/todoItem");

exports.update = async (req, res) => {
  const user = req.user
  const {value, completed} = req.body
  if ((!value && typeof completed !== "boolean") || value === '') {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const {id} = req.params
  const todoItem = {
    userId: user.id,
    value: req.body.value,
    completed: req.body.completed
  }
  try {
    const updatedTodo = await TodoItem.update(id, todoItem)
    res.status(200).send(updatedTodo)
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

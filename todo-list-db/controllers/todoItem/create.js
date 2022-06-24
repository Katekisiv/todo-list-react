const TodoItem = require("../../models/todoItem");

exports.create = async (req, res) => {
  const user = req.user;
  const {value} = req.body
  if(!value) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const todoItem = {
    userId: user.id,
    value: req.body.value,
    completed: req.body.completed || false
  };
  try {
    const newTodo = await TodoItem.create(todoItem)
    res.status(200).send(newTodo)
  } catch(err) {
    res.status(400).send({
      message:
        err.message || "Some error occurred while retrieving todoItems."
    });
  }
};

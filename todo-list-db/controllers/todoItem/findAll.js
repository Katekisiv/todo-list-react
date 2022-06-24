const TodoItem = require("../../models/todoItem");

exports.findAll = async (req, res) => {
  const user = req.user;
  const {value, completed, itemsPerPage, pageNumber} = req.query
  try {
    const AllTodos = await TodoItem.findAll(user.id, value, completed, itemsPerPage, pageNumber)
    res.status(200).send(AllTodos)
  } catch(err) {
    res.status(400).send({
      message:
        err.message || "Some error occurred while retrieving todoItems."
    });
  }
};

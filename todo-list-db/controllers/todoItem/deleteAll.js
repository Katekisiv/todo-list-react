const TodoItem = require("../../models/todoItem");

exports.deleteAll = async (req, res) => {
  const user = req.user
  const {completed} = req.query
  try {
    await TodoItem.deleteAll(user.id, completed)
    res.status(200).send({ message: `All TodoItems were deleted successfully!` })
  } catch(err) {
    res.status(400).send({
      message:
        err.message || "Some error occurred while retrieving todoItems."
    })
  }
};

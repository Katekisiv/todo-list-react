const TodoItem = require("../../models/todoItem");

exports.deleteById = async (req, res) => {
  const user = req.user
  const {id} = req.params
  try {
    await TodoItem.delete(id, user.id)
    res.status(200).send({message: `TodoItem was deleted successfully!`})
  } catch (err) {
    if(err === "not_found") {
      res.status(404).send({
        message: `Not found TodoItem with id ${id}.`
      })
    } else {
      res.status(400).send({
        message:
          err.message || `Could not delete TodoItem with id ${id}`
      });
    }
  }
};

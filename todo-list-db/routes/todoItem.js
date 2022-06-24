const Router = require('express');
const router = new Router();
const {create} = require("../controllers/todoItem/create");
const {findAll} = require("../controllers/todoItem/findAll");
const {findOne} = require("../controllers/todoItem/findOne");
const {update} = require("../controllers/todoItem/update");
const {deleteById} = require("../controllers/todoItem/deleteById");
const {deleteAll} = require("../controllers/todoItem/deleteAll");

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", deleteById);
router.delete("/", deleteAll);

module.exports = router

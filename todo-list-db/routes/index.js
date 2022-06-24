const Router = require('express');
const router = new Router();
const todoItemRouter = require("./todoItem");
const userRouter = require("./user")
const refreshToken = require("./refresh")
const authMiddleware = require('../middleware/authMiddleware');

router.use('/auth', userRouter)
router.use('/todo', authMiddleware, todoItemRouter)
router.use('/refresh', refreshToken)

module.exports = router

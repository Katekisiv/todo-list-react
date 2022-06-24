const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware');
const {registration} = require('../controllers/user/registration')
const {login} = require('../controllers/user/login')
const {logout} = require('../controllers/user/logout')

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)

module.exports = router;

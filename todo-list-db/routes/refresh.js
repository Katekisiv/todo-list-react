const Router = require('express');
const router = new Router();
const {refreshToken} = require("../controllers/refreshToken/refreshToken");

router.post("/", refreshToken);

module.exports = router
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: "Unauthorized"});
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next()
  } catch (e) {
    res.status(401).json({message: "Unauthorized"});
  }
};

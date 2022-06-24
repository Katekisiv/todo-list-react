const bcrypt = require('bcrypt');
const User = require('../../models/user');
const {generateJwt} = require('./jwt')
const RefreshToken = require("../../models/refreshToken");

exports.registration = async(req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Email and password can not be empty"
    });
    return;
  }

  const candidate = await User.findOne(email)
  if(candidate) {
    res.status(400).send({
      message: "User already exists"
    });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = {email, password: hashPassword}
  const resultUser =  await User.create(newUser)
  const token = generateJwt(resultUser.id, email)
  let refreshToken = await RefreshToken.create(resultUser.id);
  res.status(200).send({token, refreshToken: refreshToken.token})
}

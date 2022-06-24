const bcrypt = require('bcrypt');
const User = require('../../models/user');
const RefreshToken = require('../../models/refreshToken')
const {generateJwt} = require('./jwt')

exports.login = async(req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Email and password can not be empty"
    });
    return;
  }

  const candidate = await User.findOne(email)
  if(!candidate) {
    res.status(404).send({
      message: "User not found"
    })
    return;
  }

  const comparePassword = bcrypt.compareSync(password, candidate.password);
  if(!comparePassword) {
    res.status(400).send({
      message: "Wrong password"
    })
  } else {
    const token = generateJwt(candidate.id, candidate.email)
    let refreshToken = await RefreshToken.create(candidate.id)
    res.status(200).send({token, refreshToken: refreshToken.token})
  }
}

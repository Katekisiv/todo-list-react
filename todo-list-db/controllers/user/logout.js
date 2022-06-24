const RefreshToken = require('../../models/refreshToken')

exports.logout = async(req, res) => {
  try {
    const user = req.user;
    await RefreshToken.delete(user.id)
    res.status(200).send({message: "Now you are out"})
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

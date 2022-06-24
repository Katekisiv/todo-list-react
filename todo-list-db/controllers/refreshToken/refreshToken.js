const RefreshToken = require('../../models/refreshToken');
const User = require('../../models/user');
const {generateJwt} = require('../user/jwt')

exports.refreshToken = async(req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (!requestToken) {
    res.status(403).send({
      message: "Refresh Token is required!"
    });
    return;
  }

  try {
    const refreshToken = await RefreshToken.findOne(requestToken);
    if (refreshToken === 'not_found') {
      res.status(403).send({
        message: "Refresh token is not in database!"
      });
      return;
    }

    if (refreshToken.expiryDate < new Date().getTime()) {
      await RefreshToken.delete(refreshToken.userId);
      res.status(403).send({
        message: "Refresh token was expired. Please make a new login request",
      });
      return;
    }

    const user = await User.findById(refreshToken.userId)
    if(!user) {
      res.status(404).send({
        message: "User not found"
      })
      return;
    }
    await RefreshToken.delete(refreshToken.userId);
    const newRefreshToken = await RefreshToken.create(refreshToken.userId)
    const newAccessToken = generateJwt(newRefreshToken.userId, user.email)
    return res.status(200).send({
      token: newAccessToken,
      refreshToken: newRefreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

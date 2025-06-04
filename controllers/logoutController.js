const User = require("../model/User");

const handleLogout = async (req, res) => {
  // del client, del the accesstoken
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204); //  No content
  const refreshToken = cookies.jwt;
  //is the refresh token in DB
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
  // Delete refreshToken in DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result, "logout");
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
module.exports = { handleLogout };

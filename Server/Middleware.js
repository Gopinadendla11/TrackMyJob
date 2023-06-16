const authUtils = require("./Utils/authUtils");

const jwtValidation = (req, res, next) => {
  const token = req.header("x-jwt-token");
  // console.log("token", token);
  if (token) {
    try {
      decodedToken = authUtils.verifyAccessToken(token);
      req.data = decodedToken;
      next();
    } catch (error) {
      res.status(401).send("UnAuthorized Request");
    }
  } else res.status(401).send("UnAuthorized Request");
};

module.exports = jwtValidation;

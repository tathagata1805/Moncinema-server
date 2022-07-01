const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const user_id = decodedToken.user_id;
    if (req.body.user_id && req.body.user_id !== user_id) {
      return res.status(400).json({
        message: "Your session has expired, please login !",
      });
    } else {
      next();
    }
  } catch {
    return res.status(401).json({
      message: "Your session has expired, please login !",
    });
  }
};

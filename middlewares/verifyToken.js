const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECTRET);
      req.user = payload;
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    res.status(403).send("Forbidden");
  }
};

module.exports = { verifyToken };

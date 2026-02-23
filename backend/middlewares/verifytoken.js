const jwt = require("jsonwebtoken");
const db = require(process.env.Root_Path+"/db/models");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied Token is Missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );
    req.user = decoded; 

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;

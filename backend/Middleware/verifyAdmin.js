const jwt =require('jsonwebtoken');
const { Model } = require('sequelize');

const verifyToken=async(req,res,next)=>{
    if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();

}

module.exports=verifyToken
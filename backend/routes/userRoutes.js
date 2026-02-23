const express = require("express");
const router = express.Router();
const verifyToken=require(process.env.Root_Path+"/middlewares/verifytoken");
const adminToken=require(process.env.Root_Path+"/middlewares/verifyAdmin")

const {CreateUser} = require(process.env.Root_Path+"/controllers/userController");

router.use(verifyToken)
router.use(adminToken)

router.post('/createuser', CreateUser);


module.exports = router;

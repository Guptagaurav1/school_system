

const express = require("express");
const router = express.Router();
const{createRole , getrolesList}=require(process.env.Root_Path+"/controllers/roleController");
const verifyToken =require(process.env.Root_Path+"/middlewares/verifytoken");
const verifyAdmin=require(process.env.Root_Path+"/middlewares/verifyAdmin");


router.use(verifyToken)
router.use(verifyAdmin)


router.post('/createrole', createRole);
router.post('/roleList', getrolesList);




module.exports = router;

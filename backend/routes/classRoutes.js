const express = require("express");
const router = express.Router();
const{createClass,updateClass,destroyClass,getListData}=require(process.env.Root_Path+"/controllers/classController");
const verifyToken =require(process.env.Root_Path+"/middlewares/verifytoken");
const verifyAdmin=require(process.env.Root_Path+"/middlewares/verifyAdmin");


router.use(verifyToken)
router.use(verifyAdmin)


router.post('/createstudentclass', createClass);
router.post('/updateStudents/:id', updateClass);
router.post('/destroyeClass/:id', destroyClass);
router.post('/getlistData', getListData);



module.exports = router;

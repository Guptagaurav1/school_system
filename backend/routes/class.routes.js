const express = require("express");
const router = express.Router();
const{createClass,updateClass,destroyClass,getListData}=require("../controllers/classcontroller");
const verifyToken =require("../Middleware/verifytoken");
const verifyAdmin=require("../Middleware/verifyAdmin");

router.use(verifyToken)
router.use(verifyAdmin);


router.post('/createstudentclass', createClass);
router.post('/updateStudents/:id', updateClass);
router.post('/destroyeClass/:id', destroyClass);
router.post('/getlistData', getListData);



module.exports = router;

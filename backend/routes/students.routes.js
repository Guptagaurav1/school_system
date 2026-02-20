const express = require("express");
const router = express.Router();
const verifyToken=require(process.env.Root_Path+"/Middleware/verifytoken");
const adminToken=require(process.env.Root_Path+"/Middleware/verifyAdmin")

const {
  createStudents,
  getClassesData,
  studentDetails,
  updateStudents,
  getStudentslist
  
} = require(process.env.Root_Path+"/controllers/studentcontroller");

router.use(verifyToken)
router.use(adminToken)

router.post('/create', createStudents);
router.post('/getList', getClassesData);
router.post('/studentinfo/:id', studentDetails);
router.post('/studentupdate/:id', updateStudents);
router.post('/studentList', getStudentslist);


module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken=require(process.env.Root_Path+"/middlewares/verifytoken");
const adminToken=require(process.env.Root_Path+"/middlewares/verifyAdmin")

const {
  createStudents,
  getClassesData,
  studentDetails,
  updateStudents,
  getStudentslist
  
} = require(process.env.Root_Path+"/controllers/studentController");

router.use(verifyToken)
router.use(adminToken)

router.post('/create', createStudents);
router.post('/getList', getClassesData);
router.post('/studentinfo/:id', studentDetails);
router.post('/studentupdate/:id', updateStudents);
router.post('/studentList', getStudentslist);


module.exports = router;

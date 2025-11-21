const express = require("express");
const router = express.Router();

const {
  createStudents,
  getClassesData,
  studentDetails,
  updateStudents,
  getStudentslist
  
} = require("../controllers/studentcontroller");

router.post('/create', createStudents);
router.post('/getList', getClassesData);
router.post('/studentinfo/:id', studentDetails);
router.post('/studentupdate/:id', updateStudents);
router.post('/studentList', getStudentslist);


module.exports = router;

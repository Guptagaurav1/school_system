const express = require("express");
const { studentLogin } = require(process.env.Root_Path+"/controllers/studentAuthController");

const router = express.Router();

router.post("/studentLogin", studentLogin);

module.exports = router;

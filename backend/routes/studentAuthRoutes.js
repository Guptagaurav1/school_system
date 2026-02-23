const express = require("express");
const { studentLogin } = require(process.env.Root_Path+"/controllers/studentauthController");

const router = express.Router();

router.post("/studentLogin", studentLogin);

module.exports = router;

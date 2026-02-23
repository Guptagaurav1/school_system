const express = require("express");
// const { login, refresh } = require("../controllers/authController");
const { login} = require( process.env.Root_Path + "/controllers/authController");



const router = express.Router();

router.post("/login", login);


module.exports = router;

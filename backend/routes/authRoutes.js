const express = require("express");
const { login, refresh } = require(process.env.Root_Path+"/controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);


module.exports = router;

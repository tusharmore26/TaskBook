const express = require("express");

const { login, signup } = require("../controller/userController");

const router = express.Router();

// login ROute
router.post("/login", login);

// signup ROute
router.post("/signup", signup);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const userValidator = require("../validator/user.validator");
router.post("/login", userValidator.login, controller.login);
router.post("/register", userValidator.register, controller.register);
module.exports = router;

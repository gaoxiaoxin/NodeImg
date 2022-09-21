const express = require("express");
const router = express.Router();
router.use("/file", require("./file"));
router.use("/fileQiniu", require("./fileQiniu"));
router.use("/user", require("./user"));
module.exports = router;

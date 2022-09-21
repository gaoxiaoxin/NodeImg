const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");
const auth = require("../middle/auth.middle");

// 使用 multer插件
router.post("/upload", auth, fileController.uploadFun);

router.get("/allImage", auth, fileController.getAllImage);

router.delete("/image", auth, fileController.delectImage);

module.exports = router;

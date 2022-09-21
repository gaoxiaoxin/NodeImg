const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const auth = require("../middle/auth.middle");
const { uploadImageToQiniu } = require("../util/uploadUtils");
const { accessKey, secretKey, options, domain } = require("../app/config");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const upload = multer({
  storage,
});
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { filename } = req.file;
    let scope = options.scope;
    const qiniuConf = {
      accessKey,
      secretKey,
      scope,
      domain,
    };
    const filePath = path.join(
      path.resolve(__dirname, ".."),
      `\\public\\${filename}`
    );
    const url = await uploadImageToQiniu(filePath, qiniuConf);
    res.status(200).send({
      code: "00000",
      data: url,
      message: "上传成功",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/allImage", (req, res) => {
  res.status(200).send({
    data: {},
    message: "图片上传成功",
  });
});

router.delete("/image", (req, res) => {
  res.status(200).send({
    data: {},
    message: "图片上传成功",
  });
});

module.exports = router;

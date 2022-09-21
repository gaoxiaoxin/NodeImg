const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { APP_HOST, PORT } = require("../app/config");
const fileServer = require("../server/file.server");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/local/");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const upload = multer({
  storage,
});

exports.uploadFun = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      const fileName =
        req.file.path.split("\\")[req.file.path.split("\\").length - 1];
      const result = await fileServer.uploadImg(fileName, req.userId);
      if (result) {
        res.status(200).json({
          code: "00000",
          data: {
            imgpath: `${APP_HOST}:${PORT}/${fileName}`,
          },
          message: "上传成功",
        });
      } else {
        res.status(200).json({
          code: "10001",
          message: "上传失败",
        });
      }
    } catch (error) {
      next(error);
    }
  },
];

exports.getAllImage = async (req, res, next) => {
  try {
    const result = await fileServer.getAllImage(req.userId);
    // 进行数据处理,因为本地和服务器的地址和端口均不同
    result.forEach((item) => {
      item.imgUrl = `${APP_HOST}:${PORT}/${item.imgUrl}`;
    });
    res.status(200).send({
      code: "00000",
      data: {
        imgList: result,
      },
      message: "获取成功",
    });
  } catch (error) {
    next(error);
  }
};

exports.delectImage = async (req, res, next) => {
  try {
    const { imgUrl } = await fileServer.getImgName(req.body.id);
    const result = await fileServer.delectImg(req.body.id);
    const delectFinish = await delectLocalImg(imgUrl);
    if (result && delectFinish) {
      res.status(200).send({
        code: "00000",
        message: "删除成功",
      });
    } else {
      res.status(200).send({
        code: "10001",
        message: "删除失败,请重试",
      });
    }
  } catch (error) {}
};

function delectLocalImg(imgUrl) {
  return new Promise((resolve, reject) => {
    fs.unlink(`public/local/${imgUrl}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

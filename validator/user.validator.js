const config = require("../app/config");
const { body } = require("express-validator");
const validate = require("../util/validate");
const userServer = require("../server/user.server");
// 函数封装后使用,相当于一个中间件数组
exports.login = [
  validate([
    body("name").notEmpty().withMessage("用户名不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("name").custom(async (name, { req }) => {
      const data = await userServer.checkUserIsExist(name);
      if (data.length == 0) {
        return Promise.reject("请先注册!");
      }
      req.user = data[0];
      return true;
    }),
  ]),
];

exports.register = [
  validate([
    body("name").notEmpty().withMessage("用户名不能为空"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("name").custom(async (name) => {
      const data = await userServer.checkUserIsExist(name);
      if (data.length) {
        return Promise.reject("用户名已被使用");
      }
    }),
    body("code").custom(async (code) => {
      if (code !== config.code) {
        return Promise.reject("邀请码错误,请填写正确的邀请码。");
      }
      return true;
    }),
  ]),
];

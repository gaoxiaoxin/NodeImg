const jwt = require("jsonwebtoken");

// 使用 promisify 将最后一个参数是回调函数的API转成 primose
const { promisify } = require("util");

const sign = promisify(jwt.sign);

const verify = promisify(jwt.verify);

// 不做验证，直接解析
const decode = promisify(jwt.decode);

module.exports = {
  sign,
  verify,
  decode,
};

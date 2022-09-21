const crypto = require("crypto");
const { md5 } = require("../app/config");
// 获取 crypto 支持的散列算法
// console.log(crypto.getHashes());
module.exports = (str) => {
  return crypto
    .createHash("md5")
    .update(md5 + str)
    .digest("hex");
};

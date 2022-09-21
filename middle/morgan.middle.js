// 日志处理中间件
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// 将日志进行输出，输出到一个文件夹
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `../log/${getCurrentDate()}.log`),
  {
    flags: "a",
  }
);
// 返回当前的日期
function getCurrentDate() {
  const date = new Date();
  const string =
    date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
  return string;
}

module.exports = {
  morgan,
  accessLogStream,
};

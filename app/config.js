// 将.env文件中的数据注入到环境中
require("dotenv").config();
const options = {
  scope: "gjx115",
};
const {
  accessKey,
  secretKey,
  domain,
  PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  code,
  md5,
  jwtSecret,
  APP_HOST,
} = process.env;
module.exports = {
  accessKey,
  secretKey,
  domain,
  options,
  PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  code,
  md5,
  jwtSecret,
  APP_HOST,
};

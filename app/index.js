const express = require("express");
// 日志中间件
const { morgan, accessLogStream } = require("../middle/morgan.middle");
// 错误处理中间件
const errorHandler = require("../middle/error.middle");
// 404错误中间件
const notFound = require("../middle/404.middle");
// 路由中间件
const router = require("../router");
const app = express();
// 处理请求
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// 静态资源服务器
app.use(express.static("public/local"));
// 使用日志中间件
app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
// 挂载路由
app.use(router);
// 挂载404错误处理中间件
app.use(notFound());
// 挂载统一错误处理中间件
app.use(errorHandler());

module.exports = app;

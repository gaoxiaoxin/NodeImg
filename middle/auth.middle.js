// 权限校验中间件
const { verify } = require("../util/jwt");
const { jwtSecret } = require("../app/config");

module.exports = async (req, res, next) => {
  // 获取请求头中的 token 数据
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : null;
  // 验证token是否有效
  if (!token) {
    return res.status(401).send({
      code: "10004",
      message: "权限错误",
    });
  }
  try {
    const { userId } = await verify(token, jwtSecret);
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

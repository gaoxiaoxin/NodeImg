const { jwtSecret } = require("../app/config");
const { login, register } = require("../server/user.server");
const jwt = require("../util/jwt");
exports.login = async (req, res, next) => {
  try {
    const result = await login(req.body);
    if (result.length !== 0) {
      const token = await jwt.sign(
        {
          userId: result[0].id,
        },
        jwtSecret,
        {
          expiresIn: 60 * 60 * 24, // 单位为  秒 ，还可以写 2 days, 10 h, 7d
        }
      );
      res.status(200).send({
        code: "00000",
        data: {
          token,
        },
        message: "登录成功",
      });
    } else {
      res.status(200).send({
        code: "10001",
        message: "登录失败, 密码错误",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const result = await register(req.body);
  console.log(result);
  if (result) {
    res.status(200).send({
      code: "00000",
      message: "注册成功",
    });
  } else {
    res.status(200).send({
      code: "00000",
      message: "注册失败",
    });
  }
};

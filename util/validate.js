const { validationResult } = require("express-validator"); // 数据校验中间件
module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      code: "10001",
      msg: errors.array()[0].msg,
    });
  };
};

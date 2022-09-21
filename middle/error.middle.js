module.exports = () => {
  return (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      code: "10002",
      message: "服务器错误,请联系管理员",
    });
  };
};

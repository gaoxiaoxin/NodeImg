module.exports = () => {
  return (req, res, next) => {
    res.status(404).json({
      code: "10003",
      message: "404 not found",
    });
  };
};

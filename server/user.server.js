const pool = require("../app/database");
const md5 = require("../util/md5");
exports.login = async (user) => {
  const [result] = await pool.execute("select * from user where name = ?", [
    user.name,
  ]);
  if (md5(user.password) === result[0].password) {
    return result;
  } else {
    return [];
  }
};

exports.register = async (user) => {
  const { name, password } = user;
  const [result] = await pool.execute(
    "INSERT INTO user(name, password)  VALUES (?,?)",
    [name, md5(password)]
  );
  return result;
};

exports.checkUserIsExist = async (name) => {
  const [result] = await pool.execute("SELECT * from user where name = ?", [
    name,
  ]);
  return result;
};

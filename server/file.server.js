const pool = require("../app/database");

exports.uploadImg = async (fileName, userId) => {
  const [result] = await pool.execute(
    "INSERT INTO img ( userId, imgUrl) VALUES (?,?)",
    [userId, fileName]
  );
  return result ? true : false;
};

exports.getAllImage = async (userId) => {
  const [result] = await pool.execute(
    "select id, imgUrl from img where userId = ?",
    [userId]
  );
  return result;
};

exports.delectImg = async (imgId) => {
  const [result] = await pool.execute("DELETE from img where id = ?;", [imgId]);
  console.log(result);
  return result ? true : false;
};

exports.getImgName = async (imgId) => {
  const [result] = await pool.execute(
    "select id, imgUrl from img where id = ?",
    [imgId]
  );
  return result[0];
};

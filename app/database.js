const mysql = require("mysql2");
const {
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("./config");
const pool = mysql.createPool({
  host: MYSQL_HOST, // 数据库的地址
  user: MYSQL_USER, // 用户名
  port: MYSQL_PORT,
  database: MYSQL_DATABASE, // 要连接的数据库
  password: MYSQL_PASSWORD, // 密码
  waitForConnections: true, // 等待连接
  connectionLimit: 50, // 最大连接数
  queueLimit: 0,
});
pool.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败:", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
  pool.releaseConnection(conn);
});
pool.on("acquire", function (connection) {
  console.log(`获取数据库连接 [${connection.threadId}]`);
});
pool.on("connection", function (connection) {
  console.log(`创建数据库连接 [${connection.threadId}]`);
});
pool.on("enqueue", function () {
  console.log("正在等待可用数据库连接");
});
pool.on("release", function (connection) {
  console.log(`数据库连接 [${connection.threadId}] 已释放`);
});

module.exports = pool.promise();

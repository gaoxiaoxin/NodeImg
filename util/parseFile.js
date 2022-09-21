const fs = require("fs");
const path = require("path");
function parseFile(data, separator) {
  // 利用分隔符分割data
  // split 等同于数组的 split
  const bufArr = split(data, separator).slice(1, -1);

  bufArr.forEach((item) => {
    // 分割 head 与 body
    const [head, body] = split(item, "\r\n\r\n");
    // 可能会存在两行 head，所以用换行符 '\r\n' 分割一下
    // 这里的第一个元素是截取后剩下空 buffer，所以要剔除掉
    const headArr = split(head, "\r\n").slice(1);
    // head 的第一行肯定是 Content-Disposition
    // 通过这个字段肯定能拿到文件名
    // 通过parseHeader解析head
    const headerVal = parseHeader(headArr[0].toString());
    // 如果 head 内存在 filename 字段，则代表是一个文件
    console.log(headerVal);
    if (headerVal.filename) {
      // 写入文件到磁盘
      fs.writeFile(
        path.resolve(__dirname, `../public/${headerVal.filename}`),
        body.slice(0, -2),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
}

function parseHeader(header) {
  const [name, value] = header.split(": ");
  const valueObj = {};
  value.split("; ").forEach((item) => {
    const [key, val = ""] = item.split("=");
    valueObj[key] = val && JSON.parse(val);
  });

  return valueObj;
}

function split(buffer, separator) {
  const res = [];
  let offset = 0;
  let index = buffer.indexOf(separator, 0);
  while (index != -1) {
    res.push(buffer.slice(offset, index));
    offset = index + separator.length;
    index = buffer.indexOf(separator, index + separator.length);
  }

  res.push(buffer.slice(offset));

  return res;
}

module.exports = {
  parseFile,
};

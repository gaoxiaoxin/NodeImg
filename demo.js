let str = "img-1663656643340.jpg";
const fs = require("fs");
const a = fs.unlinkSync("./public/local/" + str);
console.log(a);

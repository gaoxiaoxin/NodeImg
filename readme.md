### 下载依赖
npm install 
### 启动项目
npm run serve
### 配置自己的项目环境
在项目的根目录创建 .env 文件

accessKey = "七牛云的key,现在还没有用到";
secretKey = "七牛云的key,现在还没有用到";
domain = "七牛云的图片域名"
PORT = 项目运行的端口 例 8888
APP_HOST = 项目运行的环境 例 http://localhost
> 注：如果是部署到服务器,请同步修改PORT 和 APP_HOST
MYSQL_HOST= mysql服务的ip地址 例 127.1.1.1
MYSQL_PORT= mysql服务的端口 例 3306
MYSQL_DATABASE= 数据库名称 例 'NodeImg'
MYSQL_USER= 数据库用户名
MYSQL_PASSWORD= 数据库密码
code = 用户注册时的邀请码 例 star
md5 = 用户密码加密的MD5的盐 例
jwtSecret = 用户token加密的盐 例 'star'

### 一些自定义的状态code
状态码 : 
成功 : "00000",
参数错误 : "10001"
权限错误 : "10004"

### 其实写的不太好,欢迎大家交流探讨

### 后期计划，实现前端页面，实现后端七牛云上传
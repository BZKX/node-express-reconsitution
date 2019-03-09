var express = require('express');
// var router = express.Router();
let app = express(); //创建路由
//导入数据库连接池
var mysql = require('../model/mysqlDB.js');



//分发请求
const userController = require('../controllers/userControllers.js');

// app.post('/dologin', userController.dologin);

/* GET users listing. */
app.get('/admin', function (req, res, next) {
    res.send('这是后台登录页面');
}).post('/dologin',userController.dologin);



// module.exports = router;
module.exports = app;

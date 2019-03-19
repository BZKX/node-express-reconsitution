var express = require('express');
// var router = express.Router();
let app = express(); //创建路由
//导入数据库连接池
var mysql = require('../model/mysqlDB.js');


//分发请求
const userController = require('../controllers/userControllers.js');

// app.post('/dologin', userController.dologin);

app.get('/admin', function (req, res, next) {
    // res.send('这是后台登录页面');
    res.json({
        msg:'ok!'
    })
}).post('/dologin', userController.dologin) //账号登录
    .get('/getwebinfo', userController.getWebInfo)  //获取内容概述
    .get('/loginout',userController.loginout)       //登出
    .get('/getPosts',userController.getPosts)       //获取文章列表
    .get('/getPostDetail',userController.getPostDetail) //获取文章详细内容
    .post('/addPosts',userController.addPosts)    //新增文章
    .post('/updatePosts',userController.updatePosts)    //更新文章
    .get('/test',userController.test)


// module.exports = router;
module.exports = app;

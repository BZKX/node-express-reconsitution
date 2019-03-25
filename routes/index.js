var express = require('express');
// var router = express.Router();
var app = express();
// var markdown = require('markdown').markdown;
//导入数据库连接池

var indexController = require('../controllers/indexControllers.js');

/* 前台页面 */
app.get('/getPosts', indexController.indexGetPosts)       //获取文章列表
    .get('/search', indexController.searchPost)  //前台查询文章


module.exports = app;

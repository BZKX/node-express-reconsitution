var express = require('express');
// var router = express.Router();
var app = express();
//导入数据库连接池

var indexController = require('../controllers/indexControllers.js');

/* GET home page. */
app.get('/', function (req, res, next) {
    //index.html
    // var test = '';
    let sql = "select * from users";
    res.render('index', {title: 'Express'});
}).get('/search',indexController.search_test);


module.exports = app;

var express = require('express');
var router = express.Router();

//导入数据库连接池
var mysql = require('../model/mysqlDB.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    // var test = '';
    let sql = "select * from users";

    res.render('index', {title: 'Express'});
});

router.get('/search',function (req, res, next) {
    // var test = '';
    let sql = "select * from users";

    mysql.query(sql,function (err, results, files) {
        if (err) {
            next(err);
            return;
        }
        res.json(results);
        // res.render('index', {title: 'Express'});
    })
});
module.exports = router;

//导入数据库连接池
var mysql = require('../model/mysqlDB.js');

var express = require('express');

module.exports = {
    //主页
    search_test:(req,res)=>{
        // var test = '';
        let sql = "select * from users";

        mysql.query(sql, function (err, results, files) {
            if (err) {
                next(err);
                return;
            }
            res.json(results);
            // res.render('index', {title: 'Express'});
        })
    }
};
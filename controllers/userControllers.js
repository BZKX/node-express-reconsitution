//导入数据库连接池
var mysql = require('../model/mysqlDB.js');

var express = require('express');

module.exports = {
    //登录
    dologin:(req,res)=>{
        // 获取post请求
        let body = req.body;
        //处理
        // code 1000 - ok , code 1001 - fail
        let sql = "select * from myblog.users where users.email='"
            + body.email +
            "' and binary users.password='" //注意查询时区分大小写添加==>binary
            + body.password + "';";
        mysql.query(sql, function (err, results, files) {
            console.log(results);
            if (results.length === 0) {
                res.json({
                    "code": 1001,
                    "msg": "fail"
                })
            } else {
                res.json({
                    "code": 1000,
                    "msg": "ok"
                })
            }
        })
    }
};
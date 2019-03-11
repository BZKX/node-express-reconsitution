//导入数据库连接池
var mysql = require('../model/mysqlDB.js');

// var express = require('express');

//sql语句
let sql_postCount = "select * from myblog.posts where status != 'trashed';";    //查询所有文章不包括删除的文章
let sql_draftedCount = "select * from myblog.posts where status = 'drafted';";  //查询草稿文章
let sql_categoryCount = "select * from myblog.categories;";                     //查询所有分类
let sql_commentsCount = "select * from myblog.comments where status != 'trashed';";//查询所有评论
let sql_heldCount = "select * from myblog.comments where status = 'held';";     //查询所有待审核的文章

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
            // console.log(results);
            if (results.length === 0) {
                res.json({
                    "code": 1001,
                    "msg": "fail"
                })
            } else {
                req.session.user = req.body.email;
                res.json({
                    "code": 1000,
                    "msg": "ok"
                })
            }
        })
    },
    //获取文章内容信息
    getWebInfo:(req,res)=>{
        //get请求
        let arr = {};
        mysql.query(sql_postCount).then(function (data) {
            arr.postCount = data.res.length;
            return mysql.query(sql_draftedCount)
        }).then(function (data) {
            arr.draftedCount = data.res.length;
            return mysql.query(sql_categoryCount)
        }).then(function (data) {
            arr.categoryCount = data.res.length;
            return mysql.query(sql_commentsCount)
        }).then(function (data) {
            arr.commentsCount = data.res.length;
            return mysql.query(sql_heldCount)
        }).then(function (data) {
            arr.heldCount = data.res.length;
            res.json(arr);
        }).catch(function (err) {
            res.json(err)
        })
    }
};
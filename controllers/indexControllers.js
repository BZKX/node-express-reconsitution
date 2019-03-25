//导入数据库连接池
var mysql = require('../model/mysqlDB.js');

var express = require('express');

module.exports = {
    //主页
    search_test: (req, res) => {
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
    },

    //查询文章
    searchPost: (req, res) => {
        let sql = `select 
        p.id,
        p.title,
        p.feature,
        u.nickname,
        p.created,
        p.content,
        p.views,
        p.likes,
        c.name
            from posts p
            inner join users u
            inner join categories c 
                  on p.user_id = u.id and p.category_id = c.id
                  where p.title like '%${req.query.like}%' or p.content like '%${req.query.like}%'
                  and p.status = 'published'
                    order by p.created desc`;

        mysql.query(sql, function (err, results, files) {
            if (!results) {
                res.json({
                    err_code: 1001,
                    msg: '未找到文章'
                })
            } else {
                res.json(results);
            }
        })
    },
    indexGetPosts: (req, res) => {
        //sql语句,查询所有文章
        let sql = "select p.id,p.title,u.nickname,c.name,p.created,p.status from posts p inner join users u on p.user_id = u.id inner join categories c on p.category_id = c.id where p.status = 'published'";
        //如果不是查找所有分类,添加筛选条件
        if (decodeURI(req.query.category) !== "'所有分类'") {
            sql += "and c.name = ";
            console.log(decodeURI(req.query.category));
            sql += decodeURI(req.query.category);
        }
        if (decodeURI(req.query.status) !== "'所有状态'") {
            sql += "and c.status = ";
            sql += decodeURI(req.query.status);
        }
        console.log(sql);
        mysql.query(sql, function (err, results, files) {
            console.log(err);
            if (err){
                return err;
            }
            // res.json(results);
            console.log(req.query.pageSize);
            //文章数量
            let count = results.length;
            // console.log(count);
            //单页显示数据
            let totalPages = Math.ceil(count / req.query.pageSize);
            res.json({
                "data": results,
                "totalPages": totalPages
            })
        })
    },

};
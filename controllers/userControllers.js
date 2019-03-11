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
    dologin: (req, res) => {
        // 获取post请求
        let body = req.body;
        //处理
        // code 1000 - ok , code 1001 - fail
        let sql = "select * from myblog.users where users.email='"
            + body.email +
            "' and binary users.password='" //注意查询时区分大小写添加==>binary
            + body.password + "';";
        mysql.query(sql, function (err, results, files) {
            if (results.length === 0) {
                res.json({
                    "code": 1001,
                    "msg": "fail"
                })
            } else {
                req.session.user = results[0].nickname;
                req.session.user_id = results[0].id;
                res.json({
                    "code": 1000,
                    "msg": "ok"
                })
            }
        })
    },
    //退出登录
    loginout: (req, res) => {
        req.session.user = null;
        res.json('已退出')
    },
    //获取文章内容信息
    getWebInfo: (req, res) => {
        //判断是否登录
        if (!req.session.user) {
            res.redirect('/');
        }
        console.log(req.session.user);
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
    },

    //查询文章=>get
    /*
           pageIndex:页码
           pageSize:页容量
           category:分类
           status:状态
        */
    getPosts: (req, res) => {
        //sql语句,查询所有文章
        let sql = "select p.id,p.title,u.nickname,c.name,p.created,p.status from posts p inner join users u on p.user_id = u.id inner join categories c on p.category_id = c.id where p.status != 'trashed'";
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
            // res.json(results);
            //文章数量
            let count = results.length;
            console.log(count);
            //单页显示数据
            let totalPages = Math.ceil(count / req.query.pageSize);
            res.json({
                "data": results,
                "totalPages": totalPages
            })
        })
    },

    //新增文章=>post=>
    /*
     title      //文章标题
    content     //内容
    slug        //别名
    feature     //图片
    category    //分类
    created     //创建时间
    status      //状态
     */
    addPosts: (req, res) => {
        let obj = req.body;
        //储存图片
        let feature = '/img/' + obj.feature + '.png';
        let user_id = req.session.user_id;
        //TODO : 图片上传
        let sql = "insert into myblog.posts(slug,title,feature,created,content,status,user_id,category_id) values(" + obj.slug + "," + obj.title + "," + obj.feature + "," + obj.created + "," + obj.content + "," + obj.status + "," + user_id + ","+ obj.category +")";

        mysql.query(sql, function (err, results, files) {
            if (results.affectedRows > 0) {
                res.json({
                    code:1000,
                    msg:'ok'
                })
            }else {
                res.json({
                    code:1001,
                    msg:'fail'
                })
            }
        })
    },

    //获取文章详情=>get =>id
    getPostDetail: (req, res) => {
        let sql = "select * from posts where id = " + req.query.id + " ;"
        mysql.query(sql, function (err, results, files) {
            res.json(results[0]);
        })
    },

    //更新文章=>post=>
    /*
     title      //文章标题
    content     //内容
    slug        //别名
    feature     //图片
    category    //分类
    created     //创建时间
    status      //状态
     */
    updatePosts: (req, res) => {



        mysql.query(sql, function (err, results, files) {
            if (results.affectedRows > 0) {
                res.json({
                    code:1000,
                    msg:'ok'
                })
            }else {
                res.json({
                    code:1001,
                    msg:'fail'
                })
            }
        })
    },
};
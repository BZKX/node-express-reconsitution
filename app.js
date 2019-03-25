var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //session模块
var ejs = require('ejs');
var cors = require('cors');
var history = require('connect-history-api-fallback');

var app = express();


//处理跨域请求
app.use(cors({
  origin:['http://127.0.0.1:8080','http://127.0.0.1:3000','http://localhost:8080'],
  methods: ['GET','POST'],
  alloweHeaders:['Conten-Type','Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(history()); //兼容history模式
// app.use('/public',express.static(path.join(__dirname, './public')));  //vue 静态资源
app.use('/',express.static(path.join(__dirname, './views'))); //vue.js 入口页面(vue静态资源)
app.use('/node_modules',express.static(path.join(__dirname, './node_modules'))); //后端资源

app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*60 //过期时间设置(单位毫秒)
  }
}));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

var fileUpLoad = require('express-fileupload'); //文件上床模块
app.use(fileUpLoad());

//路由分发
app.use(require('./routes/index.js'));  //负责前台页面
app.use(require('./routes/users.js'));  //负责后台路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 访问没有的路由 ， 到这个页面
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

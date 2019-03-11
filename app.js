var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //session模块
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, './public')));
app.use('/node_modules',express.static(path.join(__dirname, './node_modules')));

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

//multer 文件上传
const multer = require('multer');
const storage = multer.diskStorage({
  //设置储存图片的文件夹
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/img')
  },
  //文件名
  filename: function (req, file, cb) {
    // console.log(req.body);
    // console.log(file);
    // console.log(cb);
    cb(null, req.body.name + '.png');//英雄名 + png
  }
});

express.upload = multer({
  storage: storage
});

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

//cookie-session中间件 => 用户回话保持
var cookieSession = require('cookie-session');
app.set('trust proxy', 1); //trust first proxy 信任首次登陆陌生用户
app.use(cookieSession({
  name: 'session',
  keys: ['admin'],//设置加密钥匙
  //cookie options
  maxAge: 12 * 60 * 60 * 1000 //1 小时有效期
}));

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

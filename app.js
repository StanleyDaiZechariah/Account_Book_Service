// 引入模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { DBHOST, DBPORT, DBNAME } = require('./config/config')

// 导入接口的路由文件
var indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account');
const authRouter = require('./routes/web/auth');

// 创建应用对象
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  index: false,
  dotfiles: 'ignore',
}));

// 配置session
app.use(session({
  name: 'sid', // 设置cookie的name，默认值是：connect.sid
  secret: 'atguigu', // 参与加密的字符串（又称签名）
  saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
  resave: true, // 是否在每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 前端无法通过JS获取cookie信息
    maxAge: 1000 * 60 * 5 // 有效期为1天
  }
}));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // 响应404页面
  res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// 暴露应用对象
module.exports = app;

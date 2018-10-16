var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loginRouter = require('./routes/MangSyRoutes/login');
var MangSyindexRouter = require('./routes/MangSyRoutes/MangSyIndex');
var kolRouter = require('./routes/MangSyRoutes/kol');
var articleRouter = require('./routes/MangSyRoutes/article');
var usersRouter = require('./routes/MangSyRoutes/users');
var webArticleRouter = require('./routes/webRoutes/webArticle');
var Config = require('./module/config');
var app = express();
Config.initConfig();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', loginRouter);
app.use('/MangSy/index',MangSyindexRouter);
app.use('/kol',kolRouter);
app.use('/article',articleRouter);
app.use('/webarticle',webArticleRouter);
//需要先加载路由文件以后再加载静态资源，否则路由文件会自动先路由到 index.html

app.use("/MangSy",express.static(path.join(__dirname, 'MangSyViews')));
app.use("/web/",express.static(path.join(__dirname, 'webViews')))

// app.use('/users', usersRouter);

module.exports = app;

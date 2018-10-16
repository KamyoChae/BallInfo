var express = require('express');
var Config = require('../../module/config');
var path = require('path');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
    // res.render('index', { title: 'Express' });
    // res.redirect(__dirname + '/../views/login.html');
    console.log('index begin');
    return res.sendFile(path.resolve(__dirname,'../../MangSyViews/index.html'));
    // res.redirect(__dirname +"/../views/login.html");
    // return res.redirect('/login');

});

module.exports = router;

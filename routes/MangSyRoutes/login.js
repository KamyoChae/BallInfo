// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
var express = require('express');
var Config = require('../../module/config');
var path = require('path');
var router = express.Router();
Config.initConfig();
/* GET home page. */
router.get('/', function(req, res) {
    // res.render('index', { title: 'Express' });
    // res.redirect(__dirname + '/../views/login.html');
    console.log('begin');
    // res.redirect(__dirname +"/../views/login.html");
    return res.redirect('/login');

});

router.get('/login',function (req,res) {
    console.log('login begin');
    res.sendFile(path.resolve(__dirname,'../../MangSyViews/login.html'));
    console.log('login end');
});

router.post('/login',function (req,res,next) {
    console.log('login post');
    // console.log(req);
    // req.body['adminName'] == Config.getConfig('adminName') && req.body['adminPwd'] == Config.getConfig('adminPwd')

    if (req.body['adminName'] && req.body['adminPwd']
        && req.body['adminName'] === Config.getConfig("SyAdminNmae")
        && req.body['adminPwd'] === Config.getConfig("SyAdminPwd"))
    {
        console.log('302 begin');
        // res.redirect(__dirname + '/../views/index.html');
        return res.redirect('/MangSy/index');
    }
});

module.exports = router;

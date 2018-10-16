var express = require('express');
var dbInner = require('../../module/DbInner');
var Promise = require('promise');
var router = express.Router();


router.get('/getKolList',function (req,res,next) {
    res.set('Content-Type','text/plain');
    getKolList().then(function (result) {
        res.send(JSON.stringify(result));
    });
});
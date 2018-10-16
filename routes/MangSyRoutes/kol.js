var express = require('express');
var dbInner = require('../../module/DbInner');
var Promise = require('promise');
var router = express.Router();


dbInner.initDb('db_ams_info');

/*-----------------------------一些获取信息以及处理函数--------------------------*/
/**
 * 取出某位Kol 具体信息
 */
function getKoLDetailInfo(KoLId) {
    var promise;
    try 
    {
        
    }catch (e) {
        
    }
}

/**
 * 获取KOL信息来展示
 * @returns {*}
 */
function getKoLInfo(){
    var promise;
    try {
        var Sql = "select *,0 as kol_art_num from t_kol_info";
        promise = new Promise(function(resolve, reject) {
            dbInner.query('db_ams_info',Sql).then(function (result) {
                var htmlInfo = "";
                if(result)
                {
                    for (var i = 0 ; i < result.length ;i++)
                    {
                        console.log(result[i]);
                        htmlInfo += "<tr class=\\\"cen\\\">\n";
                        htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].id + "</td>\n";
                        htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].kol_name + "</td>\n";
                        htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].kol_art_num + "</td>\n";
                        htmlInfo += "<td align=\"center\" valign=\"middle\">\n <a title=\"编辑\" class=\"mr-5\" href=\"\">编辑</a>\n" +
                            "<a title=\"详情\" class=\"mr-5\">详情</a>\n" +
                            "<a title=\"删除\" class=\"mr-5\" href=\"\">删除</a>\n </td>\n </tr>\n";
                    }
                    console.log(htmlInfo);
                    resolve(htmlInfo);
                }
                else
                {
                    reject(htmlInfo);
                }
            });
        });
    }
    catch (e) {
        console.log("getKolInfo error" + e);
    }
    return promise;
}

/**
 * 获取kol 列表供选择
 * @returns {*}
 */
function getKolList(){
    var promise;
    try {
        var Sql = "select id,kol_name from t_kol_info";
        promise = new Promise(function(resolve, reject) {
            dbInner.query('db_ams_info',Sql).then(function (result) {
                var kolList = [];
                if(result.length > 0)
                {
                    for (var i = 0 ; i < result.length ;i++)
                    {
                        var kolInfo = {};
                        kolInfo.kol_id = result[i].id.toString();
                        kolInfo.kol_name = result[i].kol_name.toString();
                        kolList.push(kolInfo);
                    }
                    console.log(kolList);
                    resolve(kolList);
                }
                else
                {
                    reject(kolList);
                }
            });
        });
    }
    catch (e) {
        console.log("getKolInfo error" + e);
    }
    return promise;
}
/* GET users listing. */

router.get('/',function (req,res,next) {
    console.log("direct to Kol Manger");
    res.redirect('/KolManger.html');
});

router.get('/getKolInfo', function(req, res, next) {
    res.set('Content-Type','text/plain');
    getKoLInfo(res).then(function (result) {
        // console.log("1111:"+ result);
        res.send(result);
    })
});

router.post('/creat_new_kol',function (req,res,next) {
    console.log(req.body);
    // res.redirect('/kol');
    creatKolInfo(req.body);
    res.send("test");
});

router.get('/getKolList',function (req,res,next) {
    res.set('Content-Type','text/plain');
    getKolList().then(function (result) {
        res.send(JSON.stringify(result));
    });
});



module.exports = router;

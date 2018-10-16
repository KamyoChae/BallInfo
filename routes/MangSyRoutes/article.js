var express = require('express');
var Promise = require('promise')
var router = express.Router();
var dbInner = require('../../module/DbInner');
dbInner.initDb('db_ams_info');

/*--------------------------- 文章的管理函数 ---------------------------*/

function creat_article(body){
    var promise;
    try {
        promise = new Promise(function(resolve, reject){
            var Sql = "insert into t_article_info (title,author_id,free_text,charge_text,price,opentime,endtime,updatetime) value (?,?,?,?,?,?,?,?)";
            var addSqlParams = [];
            addSqlParams.push(body.article_title);
            addSqlParams.push(body.select_kol_list);
            addSqlParams.push(body.charge_article);
            addSqlParams.push(body.free_article);
            addSqlParams.push(body.article_price);
            addSqlParams.push(body.article_opentime);
            addSqlParams.push(body.article_endtime);
            addSqlParams.push(body.article_updatetime);
            console.log("creat_article insert sql:" + Sql);
            console.log("addSqlParms:" + addSqlParams);
            dbInner.insert("db_ams_info",Sql,addSqlParams);
        });
    }catch (e) {
        console.log("creat_article error" + e);
    }
    return promise;
}

console.log(new Date().toLocaleString());
function get_articleList(){
    var promise;
    try {
        promise = new Promise(function (resolve,reject) {
            var Sql = "select aritcle.id,aritcle.title,kol.kol_name,aritcle.price,aritcle.updatetime,aritcle.opentime,aritcle.endtime from " +
                "(select * from t_article_info where status = 1)aritcle  left join t_kol_info kol on aritcle.author_id = kol.id";
           dbInner.query("db_ams_info",Sql).then(function (result) {
               var htmlInfo = "";
               try {
                   if (result){
                       // console.log(result);
                       for (var i = 0;i < result.length; i++)
                       {
                           htmlInfo += "<tr class=\\\"cen\\\">\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].id + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].title + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].kol_name + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].price.toString() + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].updatetime.toLocaleString() + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].opentime.toLocaleString() + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">" + result[i].endtime.toLocaleString() + "</td>\n";
                           htmlInfo += "<td align=\"center\" valign=\"middle\">\n <a title=\"编辑\" class=\"mr-5\" href=\"\">编辑</a>\n" +
                               "<a title=\"详情\" class=\"mr-5\">详情</a>\n" +
                               "<a title=\"删除\" class=\"mr-5\" href=\"\">删除</a>\n </td>\n </tr>\n";
                       }
                       console.log(htmlInfo);
                       resolve(htmlInfo);
                   }else{
                       reject(htmlInfo);
                   }
               }catch (e) {
                   console.log("parse error"+e);
               }
           });
        });
    }catch (e) {
        console.log("get_articleList is error:" + e);
    }
    return promise;
}

function delete_article(articleId){
    var promise;
    try {
        promise = new Promise(function (resolve,reject) {
            var Sql = "update t_article_info set status = -1 where articleid = " + articleId;
            dbInner.query("db_ams_info",Sql).then(function (value) {
                if(value){
                    resolve(true);
                }else {
                    reject(false);
                }
            });
        });
    }catch (e) {
        console.log("delete_article is error" + e);
    }
}



/*--------------------------- 文章的路由函数 ---------------------------*/
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/creat_new_article',function (req,res,next) {
   console.log("create new article begin");
   // req.
    creat_article(req.body);
    console.log("create new article end");
});

router.get('/getArticleList',function (req ,res ,next) {
   console.log("getArticleList begin");

   get_articleList().then(function (value) {
           res.send(value);
   });

   console.log("getArticleList end");
});

module.exports = router;

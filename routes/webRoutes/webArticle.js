var express = require('express');
var dbInner = require('../module/DbInner');
var router = express.Router();
var config = require('../module/config');
config.initConfig();
dbInner.initDb('db_ams_info');

/**
 *
 * @param action 转换为枚举
 * @returns {number}
 */
function getemuAciton(action)
{
    var emu_action = -1;
    if (action === "getList") {
        emu_action = 1;
    }else if(action === "getarticle"){
        emu_action = 2;
    }
    return emu_action;
}

/**
 *  取文章信息
 * @returns {Promise}
 */
function getArticleList() {
    return new Promise(function (resolve,reject) {
        var Sql = 'select article.* ,kol.kol_name as author_name ' +
            'from (select * from t_article_info where id > 0  and status = 1 order by id desc limit 20)article' +
            ' left join t_kol_info kol on kol.id = article.author_id';
        dbInner.query('db_ams_info',Sql).then(function (result) {
            var listInfo = [];
            var date = new Date();
            if(result)
            {
                for (var i = 0 ; i < result.length ;i++){
                    try{
                        var listItem = {};
                        listItem.id = result[i].id.toString();
                        listItem.title = result[i].title.toString();
                        listItem.author_id = result[i].author_id.toString();
                        listItem.author_name = result[i].author_name.toString();
                        listItem.price = result[i].price.toString();
                        //todo::这两个后面接入再写
                        // listItem.sell_num = result[i].sell_num;
                        // listItem.image_url = result[i].image_url.toString();
                        if (date.getDay()){
                            listItem.isNew = true;
                        }else {
                            listItem.isNew = false;
                        }
                        if(date.getTime() > new Date(listItem.endTime).getTime()){
                            listItem.isEndGame = true;
                        }else {
                            listItem.isEndGame = false;
                        }
                    }catch (e) {
                        console.log(e);
                    }
                    console.log(result[i]);
                    listInfo.push(listItem);
                }
                console.log(listInfo);
                resolve(listInfo);
            }
            else
            {
                reject(listInfo);
            }
        });
    });
}

function getArticle(artReq){
    var promise;
    promise = new Promise(function (resolve,reject) {
        var articleInfo = {};
        if(artReq.openId && artReq.articleId)
        {
            var Sql = "select * from t_deal_info where openid = " + artReq.openId.toString() + " and articleid = " + artReq.articleId.toString();
            dbInner.query("db_ams_info",Sql).then(function (value) {
                console.log(value);
                if(value.length > 0)
                {
                    resolve(articleInfo);
                }else {
                    reject(articleInfo);
                }
            });
        }
    });
    return promise;
}
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/**
 * 调用该接口获取文章的信息还有文章的内容做展示
 * 调用请求文章List为 /article/getarticle?action={actionValue}&begin={beginId}&kolId={kolId}
 *  {actionValue}=“getList"  {beginId} 根据你那边分页情况过来请求（如果是分页填最后一个文章的Id） {kolId} 这里是留给你的接口 在后面写中间那个大师推球的时候使用
 * 调用请求文章内容接口为 /article/getarticle?action={actionValue}&openId={openId}&token={token}&artId={articleId}
 * {actionValue}填getArticle  {openId} 这里填 用户的openId  {token} 这里填用户的登录态  {articleId} 这里填文章的Id
 */
router.get('/getarticle',function (req,res,next) {
    var action = config.getConfig(req.query[config.getConfig("articleActionParam")]);
    var emu_action = getemuAciton(action);
    switch(emu_action)
    {
        case 1:{
            getArticleList().then(function (value) {
                res.send(value);
            })
        }
    }
});

module.exports = router;

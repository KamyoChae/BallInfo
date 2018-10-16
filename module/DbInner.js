var mysql = require('mysql');
var config = require('./config');
var Promise = require('promise');

config.initConfig();


function MysqlInner() {

}

MysqlInner.ConnectObjects = {};

//初始化需要链接的DB实例
MysqlInner.initDb = function(DbName)
{
    var connction = mysql.createPool(config.getConfig(DbName));
    MysqlInner.ConnectObjects[DbName] = connction;

};

MysqlInner.query = function (DbName,Sql) {
    var promise = new Promise(function(resolve, reject) {
        MysqlInner.ConnectObjects[DbName].query(Sql,function (err,result) {
            console.log('sql = ', Sql);
            console.log('rst = ', result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
    return promise;

};


MysqlInner.insert = function(DbName,Sql,addSqlParams){
    var promise = new Promise(function (resolve,reject) {
        try {
            MysqlInner.ConnectObjects[DbName].query(Sql,addSqlParams,function(err,result){
                console.log(err);
                console.log(result);
                if(err){
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        }catch (e) {
            console.log("MysqlInner insert error:" + e);
            reject(e);
        }

    });
    return promise;
};


module.exports = MysqlInner;
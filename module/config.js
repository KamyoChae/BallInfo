var fs = require('fs');

function Config() {

}
Config.config = {};

Config.initConfig = function () {
    var file_path = '../tsconfig.json';

    Object.assign(Config.config,{
        db_ams_info : {
            host : 'localhost',
            database : 'db_ams_info',
            password : 'jepongqin',
            port : '3306',
            user : 'root'
        },
        SyAdminNmae : "yg",
        SyAdminPwd : "111",
        appSercet : "5aaf1b7a0f95d71a1fac382ade38fe40 ",
        appId : "wxa53d6d3bc36ad7db"
    });

};

Config.getConfig = function (configName) {
    return Config.config[configName];
};
module.exports = Config; // circle require
let Helper = require('./wechat/Helper');

App({
    data: {
    },

    // 监听小程序初始化
    onLaunch: function (options) {
        let self = this;

        Helper.class('user').getOUS(function(ous){
            Helper.class('user').getUserInfo(function(user_info){
                let params = user_info;
                params.openid = ous.openid;
                params.unionid = ous.unionid;
                params.appid = Helper.getData('config.appid');
                params.method = 'hasUserAdded';

                Helper.class('request').post({
                    url: Helper.getData('config.host')+'account.php',
                    data: params
                }, function(r){

                });
            });
        });
    },

    // 监听小程序显示
    onShow: function (options) {

    },

    // 监听小程序隐藏
    onHide: function (options) {

    },

    // 错误监听函数
    onError: function (options) {

    },
});

let Helper = require('./util/Helper');

App({
    data: {
        openId: '',
        unionId: '',
        sessionKey: '',
        userId: 0,
        userInfo: {},
        host: ''
    },

    // 监听小程序初始化
    onLaunch: function (options) {
        let self = this;

        Helper.class('Api').login(function(result){
            self.data.openId = result.openid;
            self.data.unionId = result.unionid;
            self.data.sessionKey = result.session_key;

            // 获取用户信息并写入数据库
            Helper.class('Api').getUserInfo(function(result){
                let params = result;
                params.appid = Helper.Config.appid;
                params.openid = self.data.openId;
                params.unionid = self.data.unionId;

                // 写入数据库
                Helper.class('Network').request({
                    method: 'POST',
                    data: params,
                    url: Helper.Config.login_url
                }, function(result){
                    // 是否绑定用户
                });

                self.data.userInfo = result;
            });
        });

        self.data.host = Helper.Config.host;
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

let Helper = require('./niwechat/Helper');

App({
    data: {
        openId: '',
        unionId: '',
        sessionKey: '',
        userId: 0,
        userInfo: {}
    },

    // 监听小程序初始化
    onLaunch: function (options) {
        let self = this;

        Helper.Api.login(function(result){
            self.data.openId = result.openid;
            self.data.unionId = result.unionid;
            self.data.sessionKey = result.session_key;
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

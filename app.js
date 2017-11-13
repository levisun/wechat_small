const openIdUrl = require('./config').openIdUrl

var wechat = require("./util/wechat.js");
wechat.debug = true;

App({
    data: {
        // 用户信息
        userInfo: {},

        // 用户openid
        openId: "",

        test: "123"
    },

    // 监听小程序初始化
    onLaunch: function (options) {

    },

    // 监听小程序显示
    onShow: function (options) {
        var self = this;

        // 获取用户信息
        wechat.getUserInfo(function (result){
            self.data.userInfo = result;
        });

        // 获取用户openid
        wechat.getOpenId(
            function (result) {
                self.data.openId = result;
            },
            openIdUrl
        );

        // 开启转发按钮
        wechat.shareMenu(true);
    },

    // 监听小程序隐藏
    onHide: function (options) {

    },

    // 错误监听函数
    onError: function (options) {
        wechat.log('Error', options);
    },
});

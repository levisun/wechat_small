var app = getApp()
var wechat = require("./../../../util/wechat.js");
Page({
    data: {
        openId: app.data.openId,
        userInfo: app.data.userInfo
    },

    testTap: function (res) {
        wechat.bug(res);
    },

    onLoad: function () {
        // wechat.share("test", 'path');
    },

    onShareAppMessage: function (result) {

        return wechat.share('标题', 'baidu', function(result){

        });
    }
})
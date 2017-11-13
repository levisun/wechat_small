var app = getApp();
const openIdUrl = require('./../../../config').openIdUrl;
var wechat = require("./../../../util/wechat.js");
wechat.debug = true;
wechat.api.openIdUrl = openIdUrl;
// wechat.cache = true;

Page({
    data: {
        openId: '',
        userInfo: '',
        sessionKey: '',
        unionId: ''
    },

    testTap: function (res) {
        wechat.bug(res);
    },

    onLoad: function () {
        var self = this;

        // 获取用户信息
        wechat.getUserInfo(function (result){
            self.setData({userInfo: result});
        });

        // 获取用户openid
        wechat.getOpenId(
            function (result) {
                self.setData({openId: result});
            });

        wechat.getSessionKey(
            function (result) {
                self.setData({sessionKey: result});
            });

        wechat.getUnionId(
            function (result) {
                self.setData({unionId: result});
            });

        // 开启转发按钮
        wechat.shareMenu(true);


    },

    onShareAppMessage: function (result) {
        return wechat.share('标题', 'baidu', '', function(result){

        });
    },

    getPhoneNumber: function(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    }
})
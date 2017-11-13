const openIdUrl = require('./../../../config').openIdUrl;


import Api from './../../../util/Api';
var api = new Api(true, true);

import wx from './../../../util/wechat';

Page({
    data: {
        sessionKey: '',
        openId: '',
        userInfo: {}
    },
    onLoad: function () {
        var self = this;




        api.getSessionKey(function(result){
            wx.bug(result);
            self.setData({sessionKey: result});
        }, openIdUrl);

        api.getOpenId(function(result){
            wx.bug(result);
            self.setData({openId: result});
        }, openIdUrl);

        // api.getEncryptedData(function(result){
        //     wx.bug(result);
        // });

        api.getUserInfo(function(result){
            wx.bug(result);
            self.setData({userInfo: result});
        });

        // wx.bug();


        // var log = new Cache(true);
        // log.set('user_info', '44444');
        // wx.bug(objCache.get('user_info'));

        // wx.bug();
    }

});

var Helper = require('./../../../niwechat/Helper');

Page({

    getUserInfo: function(result)
    {
        var self = this;

        Helper.Api.getUserInfo(function(result){
            self.setData({userInfo: result});
        });
    },

    getOpenId: function(result)
    {
        var self = this;

        Helper.Api.getOpenId(function(result){
            self.setData({openId: result});
        });
    }
});

let Helper = require('./../../../wechat/Helper');

Page({
    onLoad: function()
    {
        Helper.class('user').getUserInfo(function(result){
            console.log(result);
        });
    }
});
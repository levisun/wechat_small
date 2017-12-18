let App = getApp();
let Helper = require('./../../../../wechat/Helper');
Page({
    onLoad: function()
    {

    },
    showPopup: function(result)
    {
        let r = Helper.input(result);
        Helper.class('ui').showPopup(r.type);
    },
    clearPopup: function(result)
    {
        Helper.class('ui').clearPopup();
    }
});
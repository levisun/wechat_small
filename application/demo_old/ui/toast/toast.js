let Helper = require('./../../../../wechat/Helper');
Page({
    onLoad: function()
    {

    },
    showToast: function()
    {
        Helper.class('ui').showToast('toast');
    }
});
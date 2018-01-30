let Helper = require('./../../../../wechat/Helper');
Page({

    showDialog: function()
    {
        Helper.class('ui').showDialog('dialog 弹出框');
    },
    clearDialog: function()
    {
        Helper.class('ui').clearDialog();
    }
});
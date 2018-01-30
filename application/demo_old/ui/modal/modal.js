let App = getApp();
let Helper = require('./../../../../wechat/Helper');
Page({
    data: {
        ui: {
            modal: {
                title: 'Modal 弹出框',
                content: 'Modal 内容'
            }
        }
    },

    onLoad: function()
    {

    },
    showModal: function()
    {
        Helper.class('ui').showModal();
    },
    uiModalBtn: function(result)
    {
        Helper.class('ui').clearModal();
    }
});

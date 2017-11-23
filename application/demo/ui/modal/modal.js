let App = getApp();
let Helper = require('./../../../../util/Helper');
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
        Helper.ui('Modal').show();
    },
    uiModalBtn: function(result)
    {
        let status = Helper.input(result);
        if (status.type == 'confirm') {

        } else {
            Helper.ui('Modal').clear();
        }
    }
});

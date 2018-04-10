var {helper, ui} = require('/utils/Helper');

App({
    data: {
        init: {
            user: {}
        }
    },

    initialize: function()
    {
        var self = this;

        return helper.getUser().then(function(res){
            self.data.init.user = res;
        });
    },

    // 监听小程序初始化
    onLaunch: function (options) {
    },

    // 监听小程序显示
    onShow: function (options) {

    },

    // 监听小程序隐藏
    onHide: function (options) {

    },

    // 错误监听函数
    onError: function (options) {

    },

    helper: function () {
        return helper;
    },

    ui: function () {
        return ui;
    }
});

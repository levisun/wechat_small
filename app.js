var {helper, ui} = require('/utils/Helper');

App({
    data: {},
    helper: null,

    initialize: function ()
    {
        var self = this;

        return helper.getOpenId().then(function(result){
            for (var index in result) {
                self.data[index] = result[index];
            }
        }).then(function(){
            return helper.getUser().then(function(result){
                for (var index in result) {
                    self.data[index] = result[index];
                }
            });
        });
    },

    // 监听小程序初始化
    onLaunch: function (options)
    {
    },

    // 监听小程序显示
    onShow: function (options)
    {

    },

    // 监听小程序隐藏
    onHide: function (options)
    {

    },

    // 错误监听函数
    onError: function (options)
    {

    },

    helper: function ()
    {
        return helper;
    },

    ui: function ()
    {
        return ui;
    }
});

var {helper, ui} = require('/utils/Helper');

App({
    data: {},
    config: {},

    initialize: function ()
    {
        var self = this;
        this.config = helper.config;

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

    request: function (_params)
    {
        return helper.request(_params);
    },

    pay: function (_params)
    {
        return helper.pay(_params);
    },

    promise: function (fn)
    {
        return helper.promise(fn);
    },

    toast: function (_tips = '加载中...', _mask = true)
    {
        return helper.toast(_tips, _mask);
    },

    bug: function bug(_data, _module = '自定义调试信息')
    {
        return helper.bug(_data, _module);
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
});

let Helper = require('./NiWxSmall/Helper');

App({
    data: {},

    // 监听小程序初始化
    onLaunch: function (options) {
        // 获取红包和数
        Helper.class().ajax({
            url: Helper.getData('config.host')+'account.php',
            data: {method: 'getUserIntegral'},
            method: "POST",
        }, function(result){
            Helper.class().bug(result);
        });
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
});

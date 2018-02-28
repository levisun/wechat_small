let Helper = require('./library/Helper');

App({
    data: {
        test: {
            ache: false
        }
    },

    // 监听小程序初始化
    onLaunch: function (options) {
        // 获取红包和数
        Helper.ajax({
            url: Helper.getData('config:host')+'wxxcx/account.php',
            data: {method: 'getUserIntegral'},
            method: "POST",
            cache: 'app.onLaunch',
        }, function(result){

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

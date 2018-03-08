var Helper = require('./library/Helper');

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
            url: Helper.getData('config:host')+'account.php',
            data: {method: 'getUserIntegral'},
            method: "POST",
            cache: 'app.onLaunch',
        }, function(result){

        });

        /*Helper.pay({
            amount: 1,
            game_id: 12,
            task_id: 221,
        }, function(result){

        });*/
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

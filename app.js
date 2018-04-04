var {helper, ui} = require('/utils/Helper');

App({
    data: {
        test: {
            ache: false
        }
    },

    // 监听小程序初始化
    onLaunch: function (options) {
        // 获取红包和数

        helper.ajax({
            url: helper.getData('config:host')+'account.php',
            data: {method: 'getUserIntegral'},
            method: "POST",
            cache: 'app.onLaunch',
        }).then(function(res){

        }).then(
            helper.getUser().then(function(res){

            })
        );

        // helper.wxPromise();


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

    test: function () {
        helper.bug('app_test');
    }
});

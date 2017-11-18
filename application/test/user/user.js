let Helper = require('./../../../niwechat/Helper');
let app = getApp();

Page({
    data: {
        bindingUser: false
    },

    onLoad: function(options)
    {
        Helper.Log.bug(app.data, 'user');
    },

    login: function(result) {
        let self = this,
            params = {};

        Helper.Api.getUserInfo(function(result){
            self.setData({userInfo: result});
            params = result;
            params.appid = Helper.Config.appid;
            params.openid = app.data.openId;
            params.unionid = app.data.unionId;

            Helper.Network.request({
                method: 'POST',
                data: params,
                url: Helper.Config.login_url
            }, function(result){
                if (result.data == false) {
                    self.setData({bindingUser: true});


                }
                Helper.Log.bug(result, 'user->login');
            });
        });
    },

    // 注销
    logout: function(result)
    {
        this.setData({userInfo: false});
        // Helper.Interfaces.switchTab('/application/test/user/user');
    },

    // 发送短信
    sendSms: function(result)
    {
        Helper.Log.bug(123);
    }
});

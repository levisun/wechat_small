const openIdUrl = require('./../../../config').openIdUrl;

import Api from './../../../niwechat/lib/Api';
var api = new Api(true, true);
import Pages from './../../../niwechat/lib/Page';
var page = new Pages(true, true);

Page({
    data: {
        sessionKey: '',
        openId: '',
        userInfo: {}
    },
    onLoad: function (result) {
        var self = this;

        api.getSessionKey(function(result){
            self.setData({sessionKey: result});
        }, openIdUrl);

        api.getOpenId(function(result){
            self.setData({openId: result});
        }, openIdUrl);

        // api.getEncryptedData(function(result){
        //     console.log('调试', result);
        // });

        api.getUserInfo(function(result){
            self.setData({userInfo: result});
        });

        page.setTopBar('动态设置置顶栏文字内容');
        page.setBarTitle('设置当前页面的标题');
    },

    scroll: function (result) {
        console.log('调试', result);
    },

    onShareAppMessage: function (result) {
        var share = {
            title: '分享标题',
            dese: '分享描述',
            path: '/application/mall/testv2/testv2?id=123',
            // img: '分享图片',
        };
        return api.share(share, function(result){
            if (result == false) {
                var title = '取消';
            } else {
                var title = '分享成功';
            }
            page.alert({title: title}, function(){});
        });
    },

    showToast: function (result) {
        page.showToast({title: '提示信息', image: '/static/image/icon_API.png'}, function(result){});
    },

    alert: function (result) {
        page.alert({
            title: '提示信息',
            duration: 1000,
            icon: '/static/image/icon_API.png'
        }, function(){});
    },

    showLoading: function (result) {
        page.showLoading('加载中...', function(result) {
            setTimeout(function(){
                page.hideLoading();
            }, 2000);
        })
    },

    showModal: function (result) {
        page.showModal({title: '标题', content: '内容'}, function(result){
            console.log('调试', result);
        });
    },

    menu: function (result) {
        page.menu({itemList: ['a', 'b', 'c']}, function(result){
            console.log('调试', result);
        });
    },

    navigate: function (result) {
        page.navigate(result.target.dataset.type, result.target.dataset.url);
        console.log(result);
    },

    switchTab: function (result) {
        page.switchTab(result.target.dataset.url);
    },

    redirect: function (result) {
        page.redirect(result.target.dataset.url);
    },

    loadingMore: function (result) {
        console.log(result);
        // page.showLoading('程序正在拼命加载...', function(result){
            // console.log(result);
        // });
    }
});

var Helper = require('./../../../niwechat/Helper');

Page({
    data: {
        sessionKey: '',
        openId: '',
        userInfo: {},
        loading: 'true',
        page: '1',
        itemList: []
    },
    onLoad: function (result) {
        var self = this;

        // 获得用户session
        /*Helper.Api.getSessionKey(function(result){
            self.setData({sessionKey: result});
        });*/

        // 获得用户openid
        /*Helper.Api.getOpenId(function(result){
            self.setData({openId: result});
        });*/

        // Helper.Api.getEncryptedData(function(result){
        //     console.log('调试', result);
        // });

        // 获得用户信息
        /*Helper.Api.getUserInfo(function(result){
            self.setData({userInfo: result});
        });*/

        /*Helper.Interfaces.setTopBar('动态设置置顶栏文字内容');
        Helper.Interfaces.setBarTitle('设置当前页面的标题');*/

        // 加载请求
        Helper.Network.request({
            data: {page: 1},
            url: 'https://www.youtuiyou.cn/wxxcx/loading.php'
        }, function(result){
            var data = self.data.itemList;
            for (var i = 0; i < result.data.length; i++) {
                data.push(result.data[i])
            }
            self.setData({
                itemList: data
            });
        });
    },

    // 分享
    onShareAppMessage: function (result) {
        var share = {
            title: '分享标题',
            dese: '分享描述',
            path: '/application/mall/testv2/testv2?id=123',
            // img: '分享图片',
        };
        return Helper.Api.share(share, function(result){
            if (result == false) {
                var title = '取消';
            } else {
                var title = '分享成功';
            }
            Helper.Interfaces.alert({title: title}, function(){});
        });
    },

    // 提示
    showToast: function (result) {
        Helper.Interfaces.showToast({title: '提示信息', image: '/static/image/icon_API.png'}, function(result){});
    },

    // 自定义提示
    alert: function (result) {
        Helper.Interfaces.alert({
            title: '提示信息',
            duration: 1000,
            icon: '/static/image/icon_API.png'
        }, function(){});
    },

    // 加载提示
    showLoading: function (result) {
        Helper.Interfaces.showLoading('加载中...', function(result) {
            setTimeout(function(){
                Helper.Interfaces.hideLoading();
            }, 2000);
        })
    },

    // 弹窗
    showModal: function (result) {
        Helper.Interfaces.showModal({title: '标题', content: '内容'}, function(result){
            console.log('调试', result);
        });
    },

    // 菜单
    menu: function (result) {
        Helper.Interfaces.menu({itemList: ['a', 'b', 'c']}, function(result){
            console.log('调试', result);
        });
    },

    // 跳转非Tab页面
    navigate: function (result) {
        Helper.Interfaces.navigate(result.target.dataset.type, result.target.dataset.url);
        console.log(result);
    },

    // 跳转Tab页面
    switchTab: function (result) {
        Helper.Interfaces.switchTab(result.target.dataset.url);
    },

    // 关闭页面跳转
    redirect: function (result) {
        Helper.Interfaces.redirect(result.target.dataset.url);
    },


    // 加载更多
    loadingMore: function (result) {
        var self = this;

        Helper.Network.loadingMore({
            loading: result.target.dataset.loading,
            page: result.target.dataset.page,
            url: 'https://www.youtuiyou.cn/wxxcx/loading.php'
        }, function(result){
            console.log('调试', result.data);
            var data = self.data.itemList;
            for (var i = 0; i < result.data.length; i++) {
                data.push(result.data[i])
            }
            self.setData({
                itemList: data
            });
        });
    },

    onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
    },

    pay: function(){
        Helper.Api.pay({
            body: '商品名',
            detail: '商品详情',
            attach: '附加数据',
            goods_tag: '商品标记',
            total_fee: 1,
            product_id: '123',
        }, function(result){
            console.log('调试', result);
        });
    }
});

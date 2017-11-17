var Helper = require('./../../../niwechat/Helper');

Page({
    data: {
        loading: 'true',
        page: 1,
        itemList: []
    },
    onLoad: function(result)
    {
        var self = this;

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
    loadingMore: function(result)
    {},
    goToItem: function(result)
    {
        Helper.Interfaces.redirect('/application/test/item/item?id'+result.target.dataset.id);
    }
});
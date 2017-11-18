let Helper = require('./../../../niwechat/Helper');
let app = getApp();

Page({
    onLoad: function(options)
    {
        Helper.Log.bug(app.data);
    },

    pay: function(result)
    {
        Helper.Api.pay({
            body: '商品名',
            detail: '商品详情',
            attach: '附加数据',
            goods_tag: '商品标记',
            total_fee: 10,
            product_id: '123',
            openid: app.data.openId
        }, function(result){
            Helper.Log.bug(result);
        });
    }
});

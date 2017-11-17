var Helper = require('./../../../niwechat/Helper');

Page({

    pay: function(result)
    {
        Helper.Api.pay({
            body: '商品名',
            detail: '商品详情',
            attach: '附加数据',
            goods_tag: '商品标记',
            total_fee: 1,
            product_id: '123',
        }, function(result){
            Helper.Log.bug(result);
        });
    }
});

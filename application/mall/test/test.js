var app = getApp();
import Pages from './../../../niwechat/lib/Page';
var page = new Pages(true, true);
Page({
    onLoad: function () {

    },

    navigate: function (result) {
        page.navigate(result.target.dataset.type, result.target.dataset.url);
        console.log(result);
    },

    switchTab: function (result) {
        page.switchTab(result.target.dataset.url);
    }
})
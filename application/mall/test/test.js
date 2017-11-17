var app = getApp();

var config = {
    cache: false,
    debut: true
};
import Interfaces from './../../../niwechat/lib/Interfaces';
var interfaces = new Interfaces(config);
Page({
    onLoad: function () {

    },

    navigate: function (result) {
        interfaces.navigate(result.target.dataset.type, result.target.dataset.url);
        console.log(result);
    },

    switchTab: function (result) {
        interfaces.switchTab(result.target.dataset.url);
    }
})
let App = getApp();
let Helper = require('./../../../../util/Helper');
Page({
    onLoad: function()
    {

    },
    showToast: function()
    {
        Helper.ui('Toast').show('toast');
    }
});
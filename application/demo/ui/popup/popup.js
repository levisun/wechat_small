let App = getApp();
let Helper = require('./../../../../util/Helper');
Page({
    onLoad: function()
    {

    },
    showPopup: function(result)
    {
        let r = Helper.input(result);
        Helper.ui('Popup').show(r.type);
    },
    clearPopup: function(result)
    {
        Helper.ui('Popup').clear();
    }
});
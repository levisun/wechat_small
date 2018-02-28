let Helper = require('./../../../library/Helper');
Page({
    data: {
        test: {
            t: false
        }
    },

    onLoad: function(){
        var v = Helper.getData('test.t');
        Helper.bug(v)
    }
});
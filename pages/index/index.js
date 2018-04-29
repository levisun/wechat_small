
Page({
    data: {},

    onLoad: function ()
    {
        var self = this;

        getApp().initialize().then(function(){
            return getApp().request({
                url: getApp().config.host+'task.php',
                method: 'post',
                data: {
                    method: 'isShare',
                }
            }).then(function(res){
                self.setData({shareCount: res.data});
            });
        }).then(function(){
            return getApp().request({
                url: getApp().config.host+'task.php',
                method: 'post',
                data: {
                    method: 'ranking',
                    ace: true,
                }
            }).then(function(res){
                self.setData({score_ranking: res.data.score});
            });
        }).then(function(){
            getApp().bug(self.data);
        });
    }
});

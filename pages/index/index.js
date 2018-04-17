Page({
    onLoad: function()
    {
        getApp().initialize().then(function(){
            getApp().helper().bug(getApp().data);
        });
    },

    formSubmit: function(result)
    {
        // getApp().helper().bug(result);

        getApp().helper().request({
            url: getApp().helper().getData('config:host')+'account.php',
            data: {
                formid: result.detail.formId,
            }
        }).then(function(result){
            // getApp().helper().bug(result);
        });
    },
});

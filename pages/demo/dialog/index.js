
Page({

    _toggleBaseDialog: function()
    {
        Helper.class('ui').uiDialog({
            title: '这是一个模态弹窗',
            content: 'ffff'
        });
    },
    _handleUiDialogButtonClick: function()
    {
        Helper.class('ui').clear('uiDialog');
    }
});
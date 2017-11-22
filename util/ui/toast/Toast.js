export default class
{
    constructor()
    {}

    show(_title, _callback, _timeout = 1500)
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        let toast = {
            show: true,
            title: _title,
            timeout: _timeout
        };

        that.setData({'ui.toast': toast});

        setTimeout(function (){
            _callback();
            that.setData({
                'ui.toast.show': false
            });
        }, _timeout);
    }

    clear()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({'ui.toast.show': false});
    }
}
